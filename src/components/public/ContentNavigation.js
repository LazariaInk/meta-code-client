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
  const [lessons, setLessons] = useState([]); // Lista lecțiilor
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null); // Indexul lecției curente

  const encodeNameForURL = (name) => (name ? name.replace(/ /g, '_') : '');
  const decodeNameFromURL = (name) => (name ? name.replace(/_/g, ' ') : '');

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
          images.forEach((img) => {
            let src = img.getAttribute('src');
            if (src && !src.startsWith('http')) {
              const fullSrc = `${basePath}${src}`;
              img.setAttribute('src', fullSrc);
            }
          });
          setLessonContent(doc.documentElement.innerHTML);
  
          // Adaugă aici scroll up la începutul paginii
          window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Scoll-ul va fi lin
          });
        },
        (error) => console.error('Failed to fetch lesson content:', error)
      );
  };

  useEffect(() => {
    if (topicName && chapterName) {
      const encodedTopicName = encodeURIComponent(decodeNameFromURL(topicName));
      const encodedChapterName = encodeURIComponent(decodeNameFromURL(chapterName));
  
      console.log(`Fetching lessons for topic: ${topicName}, chapter: ${chapterName}`); // Debugging line
  
      fetch(`${API_BASE_URL}gcs/topics/${encodedTopicName}/chapters/${encodedChapterName}/lessons`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch lessons');
          }
          return res.json();
        })
        .then(
          (lessons) => {
            console.log("Lessons fetched: ", lessons); // Debugging line
            setLessons(lessons); // Setăm lecțiile din capitol
            if (lessons.length > 0) {
              const firstLesson = lessons[0];
              navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(firstLesson)}`);
            }
          },
          (error) => console.error('Failed to fetch lessons:', error)
        );
    }
  }, [topicName, chapterName]);
  
  // Apelăm fetchLessonContent ori de câte ori lessonName sau chapterName se schimbă
  useEffect(() => {
    if (lessonName && chapterName) {
      fetchLessonContent(chapterName, lessonName);  
    }
  }, [chapterName, lessonName]);  // Adăugăm lessonName și chapterName ca dependențe

  useEffect(() => {
    if (lessonName && lessons.length > 0) {
      const index = lessons.findIndex((lesson) => encodeNameForURL(lesson) === lessonName);
      setCurrentLessonIndex(index);
    }
  }, [lessons, lessonName]);

  const handleNextLesson = () => {
    if (currentLessonIndex !== null && currentLessonIndex < lessons.length - 1) {
      const nextLesson = lessons[currentLessonIndex + 1];
      navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(nextLesson)}`);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex !== null && currentLessonIndex > 0) {
      const previousLesson = lessons[currentLessonIndex - 1];
      navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(previousLesson)}`);
    }
  };

  const renderContent = () => {
    if (!lessonContent) return;
    const htmlContent = new DOMParser().parseFromString(lessonContent, 'text/html');
    return { __html: htmlContent.documentElement.innerHTML };
  };

  useEffect(() => {
    if (contentRef.current) {
      const spans = contentRef.current.querySelectorAll('span');
      spans.forEach((span) => {
        if (span.querySelector('img')) {
          span.removeAttribute('style');
          span.style.display = 'block';
          span.style.maxWidth = '100%';
          span.style.height = 'auto';
          span.style.overflow = 'hidden';
        }
      });

      const images = contentRef.current.querySelectorAll('img');
      images.forEach((img) => {
        img.removeAttribute('style');
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '0'; // Elimină centrul prin eliminarea marginilor orizontale
      });
    }
  }, [lessonContent]);

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
          {/* Butoanele Previous și Next */}
          <div className={styles.navigation_buttons}>
            <button
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex === 0 || currentLessonIndex === null}
              className="btn btn-primary"
            >
              Previous
            </button>
            <button
              onClick={handleNextLesson}
              disabled={currentLessonIndex === lessons.length - 1 || currentLessonIndex === null}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
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
