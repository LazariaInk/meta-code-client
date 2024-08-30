import React, { useEffect, useRef, useState } from 'react';
import './../../App.css';
import TopicsNavigation from './TopicsNavigation';
import ChapterNavigation from './ChapterNavigation';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PublicApp.module.css';
import PublicFooter from './PublicFooter';
import { API_BASE_URL } from '../config/endpoints';
import SponsorTable from './SponsorTable';

function ContentNavigation() {
  const { topicName, chapterName, lessonName } = useParams();
  const navigate = useNavigate();
  const hamburgerIconRef = useRef(null);
  const menuRef = useRef(null);
  const contentRef = useRef(null);
  const [lessonContent, setLessonContent] = useState('');

  const encodeNameForURL = (name) => name ? name.replace(/ /g, '_') : '';
  const decodeNameFromURL = (name) => name ? name.replace(/_/g, ' ') : '';

  const toggleMenu = () => {
    menuRef.current?.classList.toggle(styles.menushow);
  };

  const fetchLessonContent = (chapterName, lessonName) => {
    const encodedTopicName = encodeURIComponent(decodeNameFromURL(topicName));
    const encodedChapterName = encodeURIComponent(decodeNameFromURL(chapterName));
    const encodedLessonName = encodeURIComponent(decodeNameFromURL(lessonName));

    fetch(`${API_BASE_URL}gcs/topics/${encodedTopicName}/chapters/${encodedChapterName}/lessons/${encodedLessonName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch lesson content!');
        }
        return res.text();
      })
      .then(
        (result) => {
          const basePath = `https://storage.googleapis.com/fabricadecoduri/${encodedTopicName}/${encodedChapterName}/${encodedLessonName}/`;
          const parser = new DOMParser();
          const doc = parser.parseFromString(result, 'text/html');
          const images = doc.querySelectorAll('img');
          images.forEach(img => {
            let src = img.getAttribute('src');
            if (src && !src.startsWith('http')) {
              const fullSrc = `${basePath}${src}`;
              img.setAttribute('src', fullSrc);
            }
          });
          setLessonContent(doc.documentElement.innerHTML);
        },
        (error) => console.error('Failed to fetch lesson content:', error)
      );
  };

  useEffect(() => {
    if (lessonName) {
      fetchLessonContent(chapterName, lessonName);
    } else if (topicName && chapterName) {
      const encodedTopicName = encodeURIComponent(decodeNameFromURL(topicName));
      const encodedChapterName = encodeURIComponent(decodeNameFromURL(chapterName));

      fetch(`${API_BASE_URL}gcs/topics/${encodedTopicName}/chapters/${encodedChapterName}/lessons`)
        .then((res) => res.json())
        .then(
          (lessons) => {
            if (lessons.length > 0) {
              const firstLesson = lessons[0];
              navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(firstLesson)}`);
            }
          },
          (error) => console.error('Failed to fetch lessons:', error)
        );
    }
  }, [topicName, chapterName, lessonName]);

  useEffect(() => {
    if (contentRef.current) {
      const spans = contentRef.current.querySelectorAll('span');
      spans.forEach(span => {
        if (span.querySelector('img')) {
          span.removeAttribute('style');
          span.style.display = 'block';
          span.style.maxWidth = '100%';
          span.style.height = 'auto';
          span.style.overflow = 'hidden';
        }
      });
    
      const images = contentRef.current.querySelectorAll('img');
      images.forEach(img => {
        img.removeAttribute('style');
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '0'; // Elimină centrul prin eliminarea marginilor orizontale
      });
    }
    
  }, [lessonContent]);

  const renderContent = () => {
    if (!lessonContent) return;
    const htmlContent = new DOMParser().parseFromString(lessonContent, 'text/html');
    return { __html: htmlContent.documentElement.innerHTML };
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isMenuClick = menuRef.current?.contains(event.target);
      const isHamburgerClick = hamburgerIconRef.current?.contains(event.target);

      if (!isMenuClick && !isHamburgerClick) {
        menuRef.current?.classList.remove(styles.menushow);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1000) {
        menuRef.current?.classList.remove(styles.menushow);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.appContainer}>
      <TopicsNavigation />
      <div className={styles.content_container}>
        <div className={styles.left_menu}>
          <div className={`${styles.sidenav} ${styles.chapters_content}`}>
            <div className={styles.left}>
              <div className={styles.menu_container}>
                <div
                  className={styles.hamburger_icon}
                  onClick={toggleMenu}
                  ref={hamburgerIconRef}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div ref={menuRef} className={styles.menu}>
                  <ChapterNavigation topicName={topicName} onLessonClick={fetchLessonContent} menuRef={menuRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle_contant}>
          <div
            className={styles.lesson_content}
            ref={contentRef}
            dangerouslySetInnerHTML={renderContent()}
          />
        </div>
        <div className={styles.right_ads}>
          <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            <SponsorTable />
          </div>
        </div>
      </div>
      <PublicFooter fullWidth={false} />
    </div>
  );
}

export default ContentNavigation;
