import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import PublicFooter from './PublicFooter';
import SocialLinks from './SocialLinks';
import topicsData from '../database/topic.json';
import styles from '../styles/HomeComponent.module.css';

function HomeComponent() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const encodeNameForURL = (name) => (name ? name.replace(/ /g, '_') : '');

  useEffect(() => {
    setTopics(topicsData.topics); // Set topics from topic.json
  }, []);

  const handleTopicClick = async (topic) => {
    try {
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

  const topicDescriptions = {
    "C-sharp": "Învață C# pentru dezvoltare software, jocuri și aplicații web. Cursul nostru include fundamentele limbajului, sintaxă avansată și proiecte practice.",
    "HTML": "Începe cu HTML, limbajul de bază al paginilor web. Învață să creezi structuri și să le stilizezi, esențial pentru dezvoltarea web.",
    "Java": "Descoperă Java, unul dintre cele mai utilizate limbaje de programare pentru aplicații enterprise și Android. Învață concepte de bază și avansate.",
    "JavaScript": "Îmbunătățește-ți abilitățile cu JavaScript pentru a crea pagini web interactive și dinamice. Perfect pentru front-end development.",
    "MySQL": "Învață MySQL pentru gestionarea bazelor de date, de la comenzi SQL de bază la optimizarea interogărilor pentru aplicații de mari dimensiuni.",
    "PHP": "PHP este esențial pentru dezvoltarea back-end. Învață să creezi aplicații web dinamice, baze de date și funcționalități avansate.",
    "Python": "Python este perfect pentru începători și proiecte avansate de AI, data science și web development. Începe cu sintaxa simplă și continuă cu proiecte practice."
  };

  const colorClasses = ["yellow", "light_green", "medium_green", "green", "dark_green"];

  return (
    <>
      <Helmet>
        <title>Cursuri Gratuite de Programare - Java, Python și Altele | Platformă Educațională</title>
        <meta
          name="description"
          content="Descoperă o platformă educațională completă și gratuită pentru învățarea programării. Învățați Java, Python, PHP și alte limbaje de top cu cursuri structurate și comunitate de suport."
        />
        <meta name="keywords" content="cursuri programare gratuite, învățare programare, Java, Python, PHP, educație online, comunitate învățare" />
      </Helmet>

      <Container fluid className={styles.home_container}>
        {/* Hero Section */}
        <Row className={`${styles.hero_section} ${styles.shadow}`}>
          <div className={styles.hero_content}>
            <h1 className={styles.home_title}>Învață Programare Gratuit și Eficient</h1>
            <p className={styles.home_intro}>
              Alătură-te platformei noastre și începe să explorezi cursuri complete de Java, Python, PHP, JavaScript și altele. Totul este gratuit și structurat pentru învățare ușoară!
            </p>
          </div>
        </Row>

        {/* Topics Section */}
        <Row id="topics" className={styles.featured_section}>
          <h2 className={styles.home_subtitle}>Subiectele Noastre</h2>
          <p className={styles.section_intro}>Descoperă diversele subiecte și limbaje de programare pe care le oferim. Fiecare curs este structurat cu lecții pas cu pas pentru învățare eficientă.</p>
          {topics.map((topic, index) => (
            <div key={topic} className={`${styles.topic_card} ${styles[colorClasses[index % colorClasses.length]]}`} onClick={() => handleTopicClick(topic)}>
              <div className={styles.topic_card_content}>
                <h3 className={styles.topic_title}>{topic}</h3>
                <p className={styles.topic_description}>{topicDescriptions[topic]}</p>
              </div>
            </div>
          ))}
        </Row>

        {/* Additional Info Section */}
        <Row className={styles.info_section}>
          <Col md={6} className={styles.info_content}>
            <h3 style={{ color: '#383E42' }}>De ce să alegi platforma noastră?</h3>
            <p>Fie că ești începător sau avansat, platforma noastră îți oferă resurse gratuite și comunitatea necesară pentru a deveni un expert în programare.</p>
          </Col>
          <Col md={6} className={styles.info_image}>
            <img className = {styles.newimage} src="/images/new.png" alt="Programare"/>
          </Col>
        </Row>

        {/* Social Links and Footer */}
        <SocialLinks />
        <PublicFooter fullWidth={true} />
      </Container>
    </>
  );
}

export default HomeComponent;
