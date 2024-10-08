import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // import useParams pentru a prelua parametrii din URL
import styles from './PublicApp.module.css';
import { API_BASE_URL } from '../config/endpoints';

const ChapterNavigation = ({ topicName, onLessonClick, menuRef }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState({});
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); // lecția activă

  const navigate = useNavigate();
  const { chapterName: chapterFromURL, lessonName: lessonFromURL } = useParams(); // Preluăm capitolul și lecția din URL

  const encodeNameForURL = (name) => (name ? name.replace(/ /g, '_') : '');
  const encodeNameForBackend = (name) => (name ? encodeURIComponent(name) : '');
  const decodeNameFromURL = (name) => (name ? name.replace(/_/g, ' ') : '');

  const fetchChapters = async () => {
    const encodedTopicNameForBackend = encodeNameForBackend(topicName);
    try {
      const response = await fetch(
        API_BASE_URL + `gcs/topics/${encodedTopicNameForBackend}/chapters`,
        { mode: 'cors' }
      );
      const result = await response.json();
      setIsLoaded(true);
      setChapters(result);
    } catch (err) {
      setIsLoaded(true);
      setError(err);
    }
  };

  const fetchLessons = async (chapterName) => {
    const encodedChapterNameForBackend = encodeNameForBackend(chapterName);
    try {
      const response = await fetch(
        API_BASE_URL +
          `gcs/topics/${encodeNameForBackend(topicName)}/chapters/${encodedChapterNameForBackend}/lessons`,
        { mode: 'cors' }
      );
      const result = await response.json();
      setLessons((prevLessons) => ({
        ...prevLessons,
        [chapterName]: result,
      }));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (topicName) fetchChapters();
  }, [topicName]);

  // La montarea componentei, setează capitolul și lecția activă din URL (dacă sunt prezente)
  useEffect(() => {
    if (chapterFromURL && lessonFromURL) {
      const decodedChapter = decodeNameFromURL(chapterFromURL);
      const decodedLesson = decodeNameFromURL(lessonFromURL);
      
      setActiveChapter(decodedChapter);
      setActiveLesson(decodedLesson);
      
      // Fetch lessons pentru capitolul respectiv dacă nu sunt încă încărcate
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
    setActiveLesson(lessonName); // Setează lecția activă
    setActiveChapter(chapterName); // Setează și capitolul activ
    if (menuRef.current) {
      menuRef.current.classList.remove(styles.menushow);
    }
    navigate(
      `/topics/${encodeNameForURL(topicName)}/chapters/${encodeNameForURL(
        chapterName
      )}/lessons/${encodeNameForURL(lessonName)}`
    );
  };

  if (topicName === '*') return <h2></h2>;

  if (error) return <div>Error: {error.message}</div>;

  if (!isLoaded) return <div>Se incarca...</div>;

  return (
    <div>
      <ul className={`${styles.lessons_menu} ${styles.tree}`}>
        {chapters.map((chapter) => (
          <li
            key={chapter}
            className={`${styles.chapter} ${
              activeChapter === chapter || 
              (lessons[chapter] && lessons[chapter].includes(activeLesson)) // Evidențiază capitolul activ sau dacă lecția este activă
                ? styles.activeChapter // Aplică clasa capitolului activ
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
                  : 'none', // Afișează capitolul activ sau dacă lecția este activă
              }}
            >
              {lessons[chapter] &&
                lessons[chapter].map((lesson) => (
                  <li
                    key={lesson}
                    className={`${styles.lesson} ${
                      activeLesson === lesson ? styles.activeLesson : ''
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
