import React, { useEffect, useState } from 'react';
import styles from '../styles/HomeComponent.module.css';
import { useNavigate } from 'react-router-dom';
import PublicFooter from './PublicFooter';
import SocialLinks from './SocialLinks';
import { Helmet } from 'react-helmet';
import topicsData from '../database/topic.json'; // Import the topics JSON
import styles2 from '../styles/PublicApp.module.css';

function HomeComponent() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const encodeNameForURL = (name) => name ? name.replace(/ /g, '_') : '';
  const encodeNameForBackend = (name) => name ? encodeURIComponent(name) : '';

  useEffect(() => {
    // Set topics directly from the imported JSON
    setTopics(topicsData.topics);
  }, []);

  const handleTopicClick = async (topic) => {
    const encodedTopicForBackend = encodeNameForBackend(topic);
    try {
      const chaptersResponse = await fetch(
        //am nevoie de capitole
      );
      const chapters = await chaptersResponse.json();

      if (chapters.length > 0) {
        const firstChapter = chapters[0];
        const encodedFirstChapterForBackend = encodeNameForBackend(firstChapter);
        const lessonsResponse = await fetch(
          //aici vor incarca lectiile
        );
        const lessons = await lessonsResponse.json();
        if (lessons.length > 0) {
          const firstLesson = lessons[0];
          navigate(
            `/topics/${encodeNameForURL(topic)}/chapters/${encodeNameForURL(firstChapter)}/lessons/${encodeNameForURL(firstLesson)}`
          );
        }
      }
    } catch (error) {
      alert('Failed to fetch chapters or lessons:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cursuri gratuite de programare - Java, Python, și multe altele | Platforma Educațională</title>
        <meta name="description" content="Învață programarea gratis, începe acum să înveți Java, Python, PHP și altele." />
        <meta property="og:description" content="Alătură-te comunității noastre pentru a învăța programare gratuit în limba română. Învață Java, Python, PHP, și multe altele!" />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://example.com/image.jpg" /> {/* Replace with actual image URL */}
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "EducationalOccupationalProgram",
              "name": "Cursuri gratuite de programare",
              "description": "Portal educațional românesc cu cursuri gratuite de programare în Java, Python, PHP și multe altele.",
              "provider": {
                "@type": "Organization",
                "name": "Platforma Educațională"
              },
              "educationalCredentialAwarded": "Certificate",
              "hasCourse": [
                {
                  "@type": "Course",
                  "name": "Curs Java",
                  "courseMode": "Online",
                  "coursePrerequisites": "None"
                },
                {
                  "@type": "Course",
                  "name": "Curs Python",
                  "courseMode": "Online",
                  "coursePrerequisites": "None"
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <div className={styles.home_container}>
        <div className={styles.hero_section}>
          <h1 className={styles.home_title}>!!!   PLATFORMA TEMPORAR NU VA LUCRA, NE PARE RAU   !!!</h1>
          <p className={styles.home_intro}>
            Alătură-te comunității și învață Java, Python, PHP, JavaScript și multe altele.
          </p>
        </div>
        <div className={styles.featured_section}>
          <h2 className={styles.home_subtitle}>Subiectele noastre</h2>
          <div className={styles.topics_container}>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={styles2.topic_button}
                aria-label={`Curs ${topic}`}
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
        </div>
        <div className={styles.invite_section}>
          <h3>Începe acum</h3>
          <p className={styles.home_invite}>Ceva de adaugat aici frumos</p>
        </div>
        <SocialLinks />
        <PublicFooter fullWidth={true} />
      </div>
    </>
  );
}

export default HomeComponent;
