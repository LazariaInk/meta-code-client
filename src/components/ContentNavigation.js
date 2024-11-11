import React, { useEffect, useState, useRef } from 'react';
import './../App.css';
import TopicsNavigation from './TopicsNavigation';
import ChapterNavigation from './ChapterNavigation';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './../styles/PublicApp.module.css';
import PublicFooter from './PublicFooter';
import SponsorTable from './SponsorTable';

function ContentNavigation() {
  const { topicName, chapterName, lessonName } = useParams();
  const navigate = useNavigate();
  const [lessonContent, setLessonContent] = useState('');
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const hamburgerIconRef = useRef(null);

  useEffect(() => {
    if (topicName && chapterName) fetchLessonList();
  }, [topicName, chapterName]);

  const toggleMenu = () => {
    menuRef.current?.classList.toggle(styles.menushow);
  };

  const closeMenu = () => {
    menuRef.current?.classList.remove(styles.menushow); // Închide meniul
  };

  useEffect(() => {
    if (lessonName && chapterName) fetchLessonContent();
  }, [chapterName, lessonName]);

  const fetchLessonList = async () => {
    try {
      const response = await import(`../database/${topicName}.json`);
      const chapters = Object.keys(response.default);
      const lessons = response.default[chapterName]; 

      if (lessons) {
        setLessons(lessons);
        if (!lessonName) {
          navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${lessons[0]}`);
        }
      }
    } catch (error) {
      console.error("Error loading chapter lessons:", error);
    }
  };

  const fetchLessonContent = () => {
    loadLessonContent();
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextLesson = lessons[currentLessonIndex + 1];
      navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${nextLesson}`);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const previousLesson = lessons[currentLessonIndex - 1];
      navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${previousLesson}`);
    }
  };

  const loadLessonContent = async () => {
    try {
      const adjustedChapterName = chapterName.replace(/_/g, ' ');
      const adjustedLessonName = lessonName.replace(/_/g, ' ');

      const filePath = `/lessons/${topicName}/${adjustedChapterName}/${adjustedLessonName}/index.html`;
      console.log("Generated file path:", filePath);

      const response = await fetch(filePath);
      if (!response.ok) throw new Error("File not found");

      let htmlContent = await response.text();

      htmlContent = htmlContent.replace(
        /src="(?!http)([^"]+)"/g,
        `src="/lessons/${topicName}/${adjustedChapterName}/${adjustedLessonName}/$1"`
      );

      setLessonContent(htmlContent);
    } catch (err) {
      console.error("Error loading lesson content:", err);
      setError("Unable to load lesson content.");
    }
  };

  useEffect(() => {
    if (lessonName && lessons.length > 0) {
      const index = lessons.findIndex((lesson) => lesson === lessonName);
      setCurrentLessonIndex(index);
    }
  }, [lessons, lessonName]);

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
                  <ChapterNavigation 
                    topicName={topicName} 
                    onLessonClick={(chapterName, lessonName) => {
                      fetchLessonContent(chapterName, lessonName);
                      closeMenu(); // Închide meniul după ce se face click pe lecție
                    }} 
                    menuRef={menuRef} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle_contant}>
          <div className={styles.lesson_content} dangerouslySetInnerHTML={{ __html: lessonContent }} />
          <div className={styles.navigation_buttons}>
            <button onClick={handlePreviousLesson} className="btn btn-success" disabled={currentLessonIndex <= 0}>
              Previous Lesson
            </button>
            <button onClick={handleNextLesson} className="btn btn-success" disabled={currentLessonIndex >= lessons.length - 1}>
              Next Lesson
            </button>
          </div>
        </div>
        <div className={styles.right_ads}>
          <SponsorTable />
        </div>
      </div>
      <PublicFooter fullWidth={false} />
    </div>
  );
}

export default ContentNavigation;
