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
  const [currentLessonIndex, setCurrentLessonIndex] = useState(-1);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (topicName && chapterName) {
      fetchLessonList();
    }
  }, [topicName, chapterName]);

  useEffect(() => {
    if (lessonName && lessons.length > 0) {
      const index = lessons.findIndex((lesson) => normalizeString(lesson) === normalizeString(lessonName));
      setCurrentLessonIndex(index);
    }
  }, [lessons, lessonName]);

  useEffect(() => {
    if (lessonName && chapterName) {
      fetchLessonContent();
    }
  }, [chapterName, lessonName]);

  const normalizeString = (str) => str.replace(/_/g, ' ').toLowerCase();

  const fetchLessonList = async () => {
    try {
      const response = await import(`../database/${topicName}.json`);
      const lessons = response.default[chapterName];
      if (lessons && lessons.length > 0) {
        setLessons(lessons);
        if (!lessonName) {
          navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${normalizeString(lessons[0])}`);
        }
      } else {
        setError("No lessons found for this chapter.");
      }
    } catch (error) {
      setError("Unable to load lessons.");
    }
  };

  const fetchLessonContent = async () => {
    setIsLoading(true);
    try {
      const adjustedChapterName = chapterName.replace(/_/g, ' ');
      const adjustedLessonName = lessonName.replace(/_/g, ' ');
      const filePath = `/lessons/${topicName}/${adjustedChapterName}/${adjustedLessonName}/index.html`;
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("File not found");
      let htmlContent = await response.text();
      htmlContent = htmlContent.replace(
        /src="(?!http)([^"]+)"/g,
        `src="/lessons/${topicName}/${adjustedChapterName}/${adjustedLessonName}/$1"`
      );
      setLessonContent(htmlContent);
      setError(null);
    } catch (err) {
      setError("Unable to load lesson content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.layoutContainer}>
      <TopicsNavigation/>
      <div className={styles.sidebar}><ChapterNavigation topicName={topicName} onLessonClick={(chapterName, lessonName) => navigate(`/topics/${topicName}/chapters/${chapterName}/lessons/${normalizeString(lessonName)}`)} /></div>
      <div className={styles.contentContainer}>
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className={styles.lessonContent} dangerouslySetInnerHTML={{ __html: lessonContent }} />
        )}
      </div>
      <div className={styles.adsSection}>
        <div className={styles.ads}>Google Ads Here</div>
        <SponsorTable />
      </div>
      <PublicFooter fullWidth={false} />
    </div>
  );
}

export default ContentNavigation;
