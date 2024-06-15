import React, { useEffect, useState } from 'react';
import styles from './HomeComponent.module.css';
import { useNavigate } from 'react-router-dom';
import PublicFooter from './PublicFooter';
import SocialLinks from '../SocialLinks';
import { API_BASE_URL } from '../config/endpoints';
import styles2 from './PublicApp.module.css';

function HomeComponent() {
  const [topics, setTopics] = useState([]);
  const [infoHome, setInfoHomeInfo] = useState('');
  const navigate = useNavigate();

  const encodeNameForURL = (name) => name ? name.replace(/ /g, '_') : '';
  const encodeNameForBackend = (name) => name ? encodeURIComponent(name) : '';

  useEffect(() => {
    fetch(API_BASE_URL + 'gcs/topics', { mode: 'cors' })
      .then((res) => res.text())
      .then(
        (result) => {
          const topicsArray = JSON.parse(result);
          setTopics(topicsArray);
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
      // Handle introHomeMessage if needed
    }
  }, [infoHome.introHomeMessage]);

  const handleTopicClick = async (topic) => {
    const encodedTopicForBackend = encodeNameForBackend(topic);
    try {
      const chaptersResponse = await fetch(API_BASE_URL + `gcs/topics/${encodedTopicForBackend}/chapters`);
      const chapters = await chaptersResponse.json();

      if (chapters.length > 0) {
        const firstChapter = chapters[0];
        const encodedFirstChapterForBackend = encodeNameForBackend(firstChapter);
        const lessonsResponse = await fetch(API_BASE_URL + `gcs/topics/${encodedTopicForBackend}/chapters/${encodedFirstChapterForBackend}/lessons`);
        const lessons = await lessonsResponse.json();
        if (lessons.length > 0) {
          const firstLesson = lessons[0];
          navigate(`/topics/${encodeNameForURL(topic)}/chapters/${encodeNameForURL(firstChapter)}/lessons/${encodeNameForURL(firstLesson)}`);
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
              className={styles2.topic_button}
            >
              <span>{topic}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.about_section}>
        <h3>Daca vrei sa fii sponsor</h3>
        <p className={styles.home_info}>
        Contribuie la dezvoltarea portalului nostru dedicat educării programatorilor de toate nivelurile. Donația ta ne ajută să oferim gratuit resurse educaționale în limba română, acoperind diverse limbaje de programare. Fiecare contribuție contează! Donează prin Revolut la RO21 BREL 0005 5453 8388 0100 și adaugă în comentariul tranzacției numele contului tău de Instagram. Vei fi inclus în tabela noastră de sponsori și vei avea vizibilitate pe platformă. Fii parte din schimbare!
        </p>
        <p className={styles.home_info}>
  Contribuie la dezvoltarea portalului nostru dedicat educării programatorilor de toate nivelurile. Donația ta ne ajută să oferim gratuit resurse educaționale în limba română, acoperind diverse limbaje de programare. Fiecare contribuție contează! <strong style={{ color: '#006400' }}>Donează prin Revolut la RO21 BREL 0005 5453 8388 0100 și adaugă în comentariul tranzacției numele contului tău de Instagram. Vei fi inclus în tabela noastră de sponsori și vei avea vizibilitate pe platformă.</strong> Fii parte din schimbare!
</p>


      </div>
      <div className={styles.invite_section}>
        <h3>Începe acum</h3>
        <p className={styles.home_invite}>{infoHome.infoHomeMessage}</p>
      </div>
      <SocialLinks />
      <PublicFooter fullWidth={true} />
    </div>
  );
}

export default HomeComponent;
