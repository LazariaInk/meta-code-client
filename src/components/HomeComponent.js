import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import PublicFooter from './PublicFooter';
import SocialLinks from './SocialLinks';
import topicsData from '../database/topic.json';
import styles from '../styles/HomeComponent.module.css';
import TopicsNavigation from './TopicsNavigation';

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
    "C-sharp": "Explorează C# pentru aplicații de software, jocuri și web. Învață fundamentele limbajului și îmbunătățește-ți abilitățile prin practică.",
    "HTML": "Începe să construiești pagini web cu HTML, totul în limba română. Acest limbaj esențial îți oferă control complet asupra structurii și stilizării site-urilor.",
    "Java": "Java este limbajul ideal pentru aplicații enterprise și dezvoltare Android. Învață de la concepte de bază la tehnici avansate, explicate pas cu pas în limba română.",
    "JavaScript": "Creează pagini web interactive cu JavaScript! Acest limbaj este vital pentru front-end development și oferă funcționalități dinamice, cu explicații clare în limba română.",
    "MySQL": "Gestionează baze de date cu MySQL, de la comenzi SQL de bază la optimizare și interogări pentru aplicații complexe, totul în limba română.",
    "PHP": "Stăpânește dezvoltarea back-end cu PHP! Învață să creezi aplicații web dinamice și să gestionezi date în mod eficient, explicat în detaliu în limba română.",
    "Python": "Python este limbajul ideal pentru proiecte de inteligență artificială, data science și dezvoltare web. Învață de la zero și implementează proiecte avansate în limba română."
  };

  const colorClasses = ["yellow", "light_green", "medium_green", "green", "dark_green"];

  return (
    <>
      <Helmet>
        <title>Cursuri Gratuite de Programare în Română - Java, Python, SQL și Altele | Platformă Educațională în Română</title>
        <meta
          name="description"
          content="Platformă educațională gratuită în limba română unde poți învăța programare de la zero la expert. Găsește cursuri de Java, Python, SQL, JavaScript, PHP, HTML și multe altele, explicate pas cu pas în română."
        />
        <meta
          name="keywords"
          content="cursuri programare gratuite în română, învățare programare în limba română, Java, Python, SQL, PHP, educație online, comunitate de învățare, HTML, CSS, JavaScript, Dart"
        />
      </Helmet>
      <TopicsNavigation />
      <Container fluid className={styles.home_container}>
        {/* Hero Section */}
        <Row className={`${styles.hero_section} ${styles.shadow}`}>
          <div className={styles.hero_content}>
            <h1 className={styles.home_title}>Învățare Gratuită și Structurată de Programare în Limba Română</h1>
            <p className={styles.home_intro}>
              Descoperă platforma educațională gratuită în limba română, unde poți învăța programare de la zero, cu lecții structurate și exerciții practice. Alătură-te și explorează cursuri de Java, Python, PHP, SQL și multe altele. Învață eficient și îmbunătățește-ți abilitățile, totul explicat clar în română!
            </p>
          </div>
        </Row>

        {/* Topics Section */}
        <Row id="topics" className={styles.featured_section}>
          <h2 className={styles.home_subtitle}>Limbajele Noastre de Programare (în Română)</h2>
          <p className={styles.section_intro}>Alege dintre limbajele și tehnologiile disponibile și începe să înveți programare pas cu pas, în limba română. Fiecare curs este structurat pentru o învățare clară și eficientă, cu lecții ușor de urmat.</p>
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
            <h3 style={{ color: '#383E42' }}>De ce să alegi platforma noastră în limba română?</h3>
            <p>Fie că ești începător sau avansat, platforma noastră îți oferă acces gratuit la resurse în limba română, necesare pentru a deveni un expert în programare. Actualizăm frecvent cursurile, adăugăm teme noi și îți oferim suport pentru a te ajuta să avansezi rapid. Totul este explicat pe înțelesul tău!</p>
          </Col>
          <Col md={6} className={styles.info_image}>
            <img className={styles.newimage} src="/images/new.png" alt="Programare" />
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
