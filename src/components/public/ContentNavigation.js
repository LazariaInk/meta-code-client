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
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null);

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
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        },
        (error) => alert('Failed to fetch lesson content:', error)
      );
  };
  useEffect(() => {
    if (topicName && chapterName) {
      const encodedTopicName = encodeURIComponent(decodeNameFromURL(topicName));
      const encodedChapterName = encodeURIComponent(decodeNameFromURL(chapterName));

      fetch(`${API_BASE_URL}gcs/topics/${encodedTopicName}/chapters/${encodedChapterName}/lessons`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch lessons');
          }
          return res.json();
        })
        .then(
          (lessons) => {
            setLessons(lessons);
            if (lessons.length > 0 && !lessonName) {
              const firstLesson = lessons[0];
              navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(firstLesson)}`);
            }
          },
          (error) => alert('Failed to fetch lessons:', error)
        );
    }
  }, [topicName, chapterName, lessonName]);

  useEffect(() => {
    if (lessonName && chapterName) {
      fetchLessonContent(chapterName, lessonName);
    }
  }, [chapterName, lessonName]);

  useEffect(() => {
    if (lessonName && lessons.length > 0) {
      const index = lessons.findIndex((lesson) => encodeNameForURL(lesson) === lessonName);
      setCurrentLessonIndex(index);
    }
  }, [lessons, lessonName]);

  const handleNextLesson = async () => {
    if (currentLessonIndex !== null && currentLessonIndex < lessons.length - 1) {
      const nextLesson = lessons[currentLessonIndex + 1];
      navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(nextLesson)}`);
    } else if (currentLessonIndex === lessons.length - 1) {
      const encodedTopicName = encodeURIComponent(decodeNameFromURL(topicName));

      const response = await fetch(`${API_BASE_URL}gcs/topics/${encodedTopicName}/chapters`);
      const chapters = await response.json();

      const currentChapterIndex = chapters.findIndex(chapter => encodeNameForURL(chapter) === chapterName);

      if (currentChapterIndex !== -1 && currentChapterIndex < chapters.length - 1) {
        const nextChapter = chapters[currentChapterIndex + 1];
        const encodedNextChapterName = encodeURIComponent(nextChapter);

        const lessonsResponse = await fetch(`${API_BASE_URL}gcs/topics/${encodedTopicName}/chapters/${encodedNextChapterName}/lessons`);
        const nextChapterLessons = await lessonsResponse.json();

        if (nextChapterLessons.length > 0) {
          const firstLesson = nextChapterLessons[0];
          navigate(`/topics/${topicName}/chapters/${encodeNameForURL(nextChapter)}/lessons/${encodeNameForURL(firstLesson)}`);
        }
      }
    }
  };




  const handlePreviousLesson = async () => {
    if (currentLessonIndex !== null && currentLessonIndex > 0) {
      const previousLesson = lessons[currentLessonIndex - 1];
      navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(previousLesson)}`);
    } else if (currentLessonIndex === 0) {
      const encodedTopicName = encodeURIComponent(decodeNameFromURL(topicName));

      const response = await fetch(`${API_BASE_URL}gcs/topics/${encodedTopicName}/chapters`);
      const chapters = await response.json();

      const currentChapterIndex = chapters.findIndex(chapter => encodeNameForURL(chapter) === chapterName);

      if (currentChapterIndex !== -1 && currentChapterIndex > 0) {

        const previousChapter = chapters[currentChapterIndex - 1];
        const encodedPreviousChapterName = encodeURIComponent(previousChapter);

        const lessonsResponse = await fetch(`${API_BASE_URL}gcs/topics/${encodedTopicName}/chapters/${encodedPreviousChapterName}/lessons`);
        const previousChapterLessons = await lessonsResponse.json();

        if (previousChapterLessons.length > 0) {
          const lastLesson = previousChapterLessons[previousChapterLessons.length - 1];
          navigate(`/topics/${topicName}/chapters/${encodeNameForURL(previousChapter)}/lessons/${encodeNameForURL(lastLesson)}`);
        }
      }
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
        img.style.margin = '0';
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

          <script>
            (adsbygoogle = window.adsbygoogle || []).push({ });
          </script>
          <div
            className={styles.lesson_content}
            ref={contentRef}
            dangerouslySetInnerHTML={renderContent()}
          />
          <div className={styles.navigation_buttons}>
            <button
              onClick={handlePreviousLesson}
              className="btn btn-success"
            >
              Lecția precedentă
            </button>

            <button
              onClick={handleNextLesson}
              className="btn btn-success"
            >
              Lecția următoarea
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
