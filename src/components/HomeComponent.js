import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomeComponent.module.css';
import styles2 from '../styles/PublicApp.module.css';
import PublicFooter from './PublicFooter';
import SocialLinks from './SocialLinks';
import { Helmet } from 'react-helmet';
import topicsData from '../database/topic.json';

function HomeComponent() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const encodeNameForURL = (name) => (name ? name.replace(/ /g, '_') : '');

  useEffect(() => {
    setTopics(topicsData.topics); // Set topics from topic.json
  }, []);

  const handleTopicClick = async (topic) => {
    try {
      // Dynamically import JSON data for the selected topic
      const topicData = await import(`../database/${topic}.json`);
      const chapters = Object.keys(topicData.default);

      if (chapters.length > 0) {
        const firstChapter = chapters[0];
        const lessons = topicData.default[firstChapter];

        if (lessons && lessons.length > 0) {
          const firstLesson = lessons[0];
          navigate(
            `/topics/${encodeNameForURL(topic)}/chapters/${encodeNameForURL(firstChapter)}/lessons/${encodeNameForURL(firstLesson)}`,
            { state: { topicData: topicData.default } }
          );
        }
      }
    } catch (error) {
      console.error("Error loading topic data:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Programming Courses - Java, Python, and More | Educational Platform</title>
        <meta name="description" content="Learn programming for free, start now with Java, Python, PHP, and others." />
      </Helmet>

      <div className={styles.home_container}>
        <div className={styles.hero_section}>
          <h1 className={styles.home_title}>!!!   PLATFORM TEMPORARILY UNAVAILABLE, WE APOLOGIZE   !!!</h1>
          <p className={styles.home_intro}>
            Join the community and learn Java, Python, PHP, JavaScript, and more.
          </p>
        </div>
        <div className={styles.featured_section}>
          <h2 className={styles.home_subtitle}>Our Topics</h2>
          <div className={styles.topics_container}>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={styles2.topic_button}
                aria-label={`Course ${topic}`}
              >
                <span>{topic}</span>
              </button>
            ))}
          </div>
        </div>
        <SocialLinks />
        <PublicFooter fullWidth={true} />
      </div>
    </>
  );
}

export default HomeComponent;
