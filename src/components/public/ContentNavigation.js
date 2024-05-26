import React, { useEffect, useRef, useState } from 'react';
import './../../App.css';
import TopicsNavigation from './TopicsNavigation';
import ChapterNavigation from './ChapterNavigation';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PublicApp.module.css';
import PublicFooter from './PublicFooter';
import { API_BASE_URL } from '../config/endpoints';
import SponsorTable from './SponsorTable';

function ContentNavigation() {
  const { topicId, lessonId } = useParams();
  const hamburgerIconRef = useRef(null);
  const menuRef = useRef(null);
  const contentRef = useRef(null);
  const [lessonContent, setLessonContent] = useState('');
  const [images, setImages] = useState({});

  const toggleMenu = () => {
    menuRef.current?.classList.toggle(styles.menushow);
  };

  const fetchLessonContent = (lessonId) => {
    fetch(API_BASE_URL + `lesson/${lessonId}/content`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLessonContent(result.lessonContent);
          const imagesMap = result.images.reduce((acc, image) => {
            const cleanBase64Data = image.base64Data.replace(/^data:image\/png;base64,/, '');
            acc[image.fileName] = `data:image/png;base64,${cleanBase64Data}`;
            return acc;
          }, {});
          setImages(imagesMap);
        },
        (error) => console.error('Failed to fetch lesson content:', error)
      );
  };

  useEffect(() => {
    if (lessonId) fetchLessonContent(lessonId);
  }, [lessonId]);

  useEffect(() => {
    if (contentRef.current) {
      const spans = contentRef.current.querySelectorAll('span');
      spans.forEach(span => {
        if (span.querySelector('img')) {
          // Elimină stilurile inline de pe span-uri
          span.removeAttribute('style');
          // Aplică stilurile responsive pentru span-uri
          span.style.display = 'block';
          span.style.maxWidth = '100%';
          span.style.height = 'auto';
          span.style.margin = '0 auto';
          span.style.overflow = 'hidden';
        }
      });

      const images = contentRef.current.querySelectorAll('img');
      images.forEach(img => {
        // Elimină toate stilurile inline
        img.removeAttribute('style');
        // Aplică stilurile responsive
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '0 auto';
      });
    }
  }, [lessonContent]);

  const renderContent = () => {
    if (!lessonContent) return;

    const htmlContent = new DOMParser().parseFromString(lessonContent, 'text/html');

    htmlContent.querySelectorAll('img').forEach((img) => {
      const imageName = img.getAttribute('src').split('/').pop();
      if (images[imageName]) {
        img.src = images[imageName];
      }
    });

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
                  <ChapterNavigation topicId={topicId} onLessonClick={fetchLessonContent} menuRef={menuRef} />
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
      <PublicFooter />
    </div>
  );
}

export default ContentNavigation;
