import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/ChapterNavigation.module.css';
import { Menu, X } from 'lucide-react';

const ChapterNavigation = ({ onLessonClick, activeChapter, activeLesson }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState({});
  const [localActiveChapter, setLocalActiveChapter] = useState(activeChapter || null);
  const [localActiveLesson, setLocalActiveLesson] = useState(activeLesson || null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { topicName, chapterName: chapterFromURL, lessonName: lessonFromURL } = useParams();
  const navigate = useNavigate();

  const encodeNameForURL = (name) => (name ? name.replace(/ /g, '_') : '');
  const decodeNameFromURL = (name) => (name ? name.replace(/_/g, ' ') : '');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import(`../database/${topicName}.json`);
        const topicData = response.default;
        setChapters(Object.keys(topicData));
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading topic data:", error);
        setError(new Error("Failed to load topic data"));
        setIsLoaded(true);
      }
    };
    loadData();
  }, [topicName]);

  const fetchLessons = async (chapterName) => {
    try {
      const response = await import(`../database/${topicName}.json`);
      const topicData = response.default;
      const chapterLessons = topicData[chapterName];
      
      if (chapterLessons) {
        setLessons((prevLessons) => ({
          ...prevLessons,
          [chapterName]: chapterLessons,
        }));
      }
    } catch (error) {
      console.error("Error loading lessons:", error);
      setError(new Error("Failed to load lessons"));
    }
  };

  useEffect(() => {
    if (chapterFromURL && lessonFromURL) {
      const decodedChapter = decodeNameFromURL(chapterFromURL);
      const decodedLesson = decodeNameFromURL(lessonFromURL);
      setLocalActiveChapter(decodedChapter);
      setLocalActiveLesson(decodedLesson);
      if (!lessons[decodedChapter]) fetchLessons(decodedChapter);
    }
  }, [chapterFromURL, lessonFromURL]);

  const handleChapterClick = (chapterName) => {
    if (!lessons[chapterName]) fetchLessons(chapterName);
    setLocalActiveChapter(chapterName);
  };

  const handleLessonClick = (chapterName, lessonName) => {
    onLessonClick(chapterName, lessonName);
    setLocalActiveLesson(lessonName);
    setLocalActiveChapter(chapterName);
    navigate(
      `/topics/${encodeNameForURL(topicName)}/chapters/${encodeNameForURL(chapterName)}/lessons/${encodeNameForURL(lessonName)}`,
      { replace: true }
    );
    setIsMenuOpen(false);
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div className={styles.mobileHeader}>
        <div className={styles.mobileMenuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
      <ul className={`${styles.lessons_menu} ${styles.tree} ${isMenuOpen ? styles.open : ''}`}>
        {chapters.map((chapter) => (
          <li
            key={chapter}
            className={`${styles.chapter} ${localActiveChapter === chapter ? styles.activeChapter : ''}`}
            onClick={() => handleChapterClick(chapter)}
          >
            {chapter}
            <ul style={{ display: localActiveChapter === chapter ? 'block' : 'none' }}>
              {lessons[chapter] &&
                lessons[chapter].map((lesson) => (
                  <li
                    key={lesson}
                    className={`${styles.lesson} ${localActiveLesson === lesson ? styles.activeLesson : ''}`}
                    onClick={() => handleLessonClick(chapter, lesson)}
                  >
                    <a className={styles.lessonLink} href="#">{lesson}</a>
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