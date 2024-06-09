import React, { useEffect, useState } from 'react';
import styles from './PublicApp.module.css';
import { Link, useNavigate } from 'react-router-dom';
import PublicFooter from './PublicFooter';
import SocialLinks from '../SocialLinks';
import { API_BASE_URL } from '../config/endpoints';

function HomeComponent() {
  const [topics, setTopics] = useState([]);
  const [infoHome, setInfoHomeInfo] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch Topics
    fetch(API_BASE_URL + 'gcs/topics', { mode: 'cors' })
    .then((res) => res.text()) // Obține textul răspunsului
    .then(
      (result) => {
        // Parsează textul răspunsului într-un array de șiruri de caractere
        const topicsArray = JSON.parse(result);
        setTopics(topicsArray); // Setează array-ul în starea topics
      },
      (error) => {
        console.log('Error fetching topics:', error);
      }
    );

    fetch(API_BASE_URL + 'fabrica-de-coduri-info/1', { mode: 'cors' })
      .then((res) => res.json())
      .then(
        (result) => {
          setInfoHomeInfo(result);
        },
        (error) => {
          console.log('Error fetching infoHomeInfo:', error);
        }
      );

    if (infoHome.introHomeMessage) {
      // setTimeout(() => {
      //   const colors = ['#383E42', '#2BAF49', '#e8de63'];
      //   const interval = setInterval(() => {
      //     const letters = document.querySelectorAll(`.${styles.home_intro} span`);
      //     const randomLetterIndex = Math.floor(Math.random() * letters.length);
      //     letters[randomLetterIndex].style.color = colors[Math.floor(Math.random() * colors.length)];
      //     letters[randomLetterIndex].style.transition = 'color 2s ease';
      //   }, 700);

      //   return () => clearInterval(interval);
      // }, 3000);
    }
  }, [infoHome.introHomeMessage]);

  const handleTopicClick = async (topic) => {
    try {
        const chaptersResponse = await fetch(API_BASE_URL + `gcs/topics/${encodeURIComponent(topic)}/chapters`);
        const chapters = await chaptersResponse.json();
      
        if (chapters.length > 0) {
            const firstChapter = chapters[0];
            const lessonsResponse = await fetch(API_BASE_URL + `gcs/topics/${encodeURIComponent(topic)}/chapters/${encodeURIComponent(firstChapter)}/lessons`);
            const lessons = await lessonsResponse.json();
            if (lessons.length > 0) {
                const firstLesson = lessons[0];
                navigate(`/topics/${encodeURIComponent(topic)}/chapters/${encodeURIComponent(firstChapter)}/lessons/${encodeURIComponent(firstLesson)}`);
            } 
        } 
    } catch (error) {
        console.error('Failed to fetch chapters or lessons:', error);
    }
};

  return (
    <div className={styles.home_container}>
      <div className={styles.hero_section}>
        <h1 className={styles.home_title}>{infoHome.titleHome}</h1>
        <div className={`${styles.home_intro} ${styles.fadeIn}`}>
          {infoHome.introHomeMessage &&
            infoHome.introHomeMessage.split('').map((char, index) => (
              <span key={index}>{char}</span>
            ))}
        </div>
      </div>
      <div className={styles.featured_section}>
        <h2 className={styles.home_subtitle}>Subiectele noastre</h2>
        <div className={styles.topics_container}>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={styles.topic_button}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.about_section}>
        <p className={styles.home_info}>{infoHome.motivationalMessage}</p>
      </div>
      <div className={styles.invite_section}>
        <p className={styles.home_invite}>{infoHome.infoHomeMessage}</p>
      </div>
      <SocialLinks />
      <PublicFooter />
    </div>
  );
}

export default HomeComponent;
