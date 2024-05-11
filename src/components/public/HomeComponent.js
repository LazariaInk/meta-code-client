import React, { useEffect, useState } from 'react'
import styles from './PublicApp.module.css'
import { Link } from 'react-router-dom'
import PublicFooter from './PublicFooter'
import SocialLinks from '../SocialLinks'

function HomeComponent() {
  const [topics, setTopics] = useState([])

  const [infoHome, setInfoHomeInfo] = useState('')

  useEffect(() => {
    // Fetch Topics
    fetch('http://localhost:8080/topic/all', { mode: 'cors' })
      .then(res => res.json())
      .then(
        result => {
          setTopics(result)
        },
        error => {
          console.log('Error fetching topics:', error)
        }
      )

    fetch('http://localhost:8080/fabrica-de-coduri-info/1', { mode: 'cors' })
      .then(res => res.json())
      .then(
        result => {
          setInfoHomeInfo(result)
        },
        error => {
          console.log('Error fetching infoHomeInfo:', error)
        }
      )

      if(infoHome.introHomeMessage) {
        // Efectul de culoare începe după ce animația de fade in s-a încheiat
        setTimeout(() => {
          const colors = ['#383E42', '#2BAF49', '#e8de63'];
          const interval = setInterval(() => {
            const letters = document.querySelectorAll(`.${styles.home_intro} span`);
            const randomLetterIndex = Math.floor(Math.random() * letters.length);
            letters[randomLetterIndex].style.color = colors[Math.floor(Math.random() * colors.length)];
            letters[randomLetterIndex].style.transition = 'color 2s ease';
          }, 700); // Schimbă culoarea unei litere aleatorii la fiecare 2 secunde
  
          return () => clearInterval(interval);
        }, 3000); // Așteaptă ca animația de fade in să se încheie
      }
    }, [infoHome.introHomeMessage]);

  return (
    <div className={styles.home_container}>
      <div className={styles.hero_section}>
        <h1 className={styles.home_title}>{infoHome.titleHome}</h1>
        <div className={`${styles.home_intro} ${styles.fadeIn}`}>
          {infoHome.introHomeMessage && infoHome.introHomeMessage.split('').map((char, index) => (
            <span key={index}>{char}</span> // Împachetăm fiecare caracter într-un span pentru control individual
          ))}
        </div>
      </div>
      <div className={styles.featured_section}>
        <h2 className={styles.home_subtitle}>Subiectele noastre</h2>
        <div className={styles.topics_container}>
          {topics.map(topic => (
            <Link
              key={topic.topicId}
              to={`/topics/${topic.topicId}`}
              className={styles.topic_button}
            >
              {topic.topicName}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.about_section}>
        <p className={styles.home_info}>

          {infoHome.motivationalMessage}
        </p>
      </div>
      <div className={styles.invite_section}>
        <p className={styles.home_invite}>

          {infoHome.infoHomeMessage}
        </p>
      </div>
      <SocialLinks />
      <PublicFooter />
    </div>
  )
}

export default HomeComponent