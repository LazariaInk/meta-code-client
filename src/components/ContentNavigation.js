// ContentNavigation.js
import React, { useEffect, useState } from 'react';
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
  const [activeChapter, setActiveChapter] = useState(chapterName);
  const [activeLesson, setActiveLesson] = useState(lessonName);

  const encodeNameForURL = (name) => (name ? name.replace(/ /g, '_') : '');
  const decodeNameFromURL = (name) => (name ? name.replace(/_/g, ' ') : '');

  useEffect(() => {
    if (topicName && chapterName) fetchLessonList();
  }, [topicName, chapterName]);

  useEffect(() => {
    if (lessonName && chapterName) fetchLessonContent(chapterName, lessonName);
  }, [chapterName, lessonName]);

  const fetchLessonList = async () => {
    try {
      const response = await import(`../database/${topicName}.json`);
      const chapters = Object.keys(response.default);
      const lessons = response.default[decodeNameFromURL(chapterName)];

      if (lessons) {
        setLessons(lessons);
        if (!lessonName) {
          navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(lessons[0])}`);
        }
      }
    } catch (error) {
      console.error("Error loading chapter lessons:", error);
    }
  };

  const fetchLessonContent = (chapterName, lessonName) => {
    setActiveChapter(chapterName);
    setActiveLesson(lessonName);
    setLessonContent(`<h1>${lessonName}</h1><p>Lesson content goes here.</p>`);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextLesson = lessons[currentLessonIndex + 1];
      navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(nextLesson)}`);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const previousLesson = lessons[currentLessonIndex - 1];
      navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${encodeNameForURL(previousLesson)}`);
    }
  };

  useEffect(() => {
    if (lessonName && lessons.length > 0) {
      const index = lessons.findIndex((lesson) => encodeNameForURL(lesson) === lessonName);
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
                <div className={styles.hamburger_icon}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className={styles.menu}>
                  <ChapterNavigation
                    topicName={topicName}
                    onLessonClick={fetchLessonContent}
                    activeChapter={activeChapter}
                    activeLesson={activeLesson}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle_contant}>
          <div className={styles.lesson_content} dangerouslySetInnerHTML={{ __html: lessonContent }} />
          <div className={styles.navigation_buttons}>
            <button onClick={handlePreviousLesson} className="btn btn-success">Previous Lesson</button>
            <button onClick={handleNextLesson} className="btn btn-success">Next Lesson</button>
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
