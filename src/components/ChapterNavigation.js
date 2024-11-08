import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styles from '../styles/ChapterNavigation.module.css';

const ChapterNavigation = ({ topicName, onLessonClick, menuRef }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState({});
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const navigate = useNavigate();
  const { chapterName: chapterFromURL, lessonName: lessonFromURL } = useParams();
  const location = useLocation();

  const encodeNameForURL = (name) => (name ? name.replace(/ /g, '_') : '');
  const decodeNameFromURL = (name) => (name ? name.replace(/_/g, ' ') : '');

  useEffect(() => {
    if (location.state?.topicData) {
      const topicData = location.state.topicData;
      setChapters(Object.keys(topicData));
      setIsLoaded(true);
    } else {
      setError(new Error("Topic data not provided"));
      setIsLoaded(true);
    }
  }, [location.state]);

  const fetchLessons = (chapterName) => {
    const topicData = location.state?.topicData;
    if (topicData && topicData[chapterName]) {
      setLessons((prevLessons) => ({
        ...prevLessons,
        [chapterName]: topicData[chapterName],
      }));
    }
  };

  useEffect(() => {
    if (chapterFromURL && lessonFromURL) {
      const decodedChapter = decodeNameFromURL(chapterFromURL);
      const decodedLesson = decodeNameFromURL(lessonFromURL);

      setActiveChapter(decodedChapter);
      setActiveLesson(decodedLesson);

      if (!lessons[decodedChapter]) {
        fetchLessons(decodedChapter);
      }
    }
  }, [chapterFromURL, lessonFromURL]);

  const handleChapterClick = (chapterName) => {
    if (!lessons[chapterName]) {
      fetchLessons(chapterName);
    }
    setActiveChapter((prevActiveChapter) =>
      prevActiveChapter === chapterName ? null : chapterName
    );
  };

  const handleLessonClick = (chapterName, lessonName) => {
    onLessonClick(chapterName, lessonName);
    setActiveLesson(lessonName);
    setActiveChapter(chapterName);
    if (menuRef.current) {
      menuRef.current.classList.remove(styles.menushow);
    }
    navigate(
      `/topics/${encodeNameForURL(topicName)}/chapters/${encodeNameForURL(
        chapterName
      )}/lessons/${encodeNameForURL(lessonName)}`
    );
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <ul className={`${styles.lessons_menu} ${styles.tree}`}>
        {chapters.map((chapter) => (
          <li
            key={chapter}
            className={`${styles.chapter} ${activeChapter === chapter ||
              (lessons[chapter] && lessons[chapter].includes(activeLesson))
              ? styles.activeChapter
              : ''
            }`}
            onClick={() => handleChapterClick(chapter)}
          >
            {chapter}
            <ul
              style={{
                display: activeChapter === chapter ||
                  (lessons[chapter] && lessons[chapter].includes(activeLesson))
                  ? 'block'
                  : 'none',
              }}
            >
              {lessons[chapter] &&
                lessons[chapter].map((lesson) => (
                  <li
                    key={lesson}
                    className={`${styles.lesson} ${activeLesson === lesson ? styles.activeLesson : ''
                    }`}
                    onClick={() => handleLessonClick(chapter, lesson)}
                  >
                    <a className={styles.lessonLink} href="#">
                      {lesson}
                    </a>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterNavigation;
