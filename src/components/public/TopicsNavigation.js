import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './PublicApp.module.css';
import './../../App.css';
import { API_BASE_URL } from '../config/endpoints';

function TopicsNavigation() {
  const [topics, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleBtnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    fetch(API_BASE_URL + 'gcs/topics', {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        toggleBtnRef.current &&
        menuRef.current &&
        !toggleBtnRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggleBtnRef, menuRef]);

  const handleTopicClick = async (topicName) => {
    try {
        const chaptersResponse = await fetch(API_BASE_URL + `gcs/topics/${encodeURIComponent(topicName)}/chapters`);
        const chapters = await chaptersResponse.json();
      
        if (chapters.length > 0) {
            const firstChapter = chapters[0];
            const lessonsResponse = await fetch(API_BASE_URL + `gcs/topics/${encodeURIComponent(topicName)}/chapters/${encodeURIComponent(firstChapter)}/lessons`);
            const lessons = await lessonsResponse.json();
            if (lessons.length > 0) {
                const firstLesson = lessons[0];
                setSelectedTopic(topicName);
                navigate(`/topics/${encodeURIComponent(topicName)}/chapters/${encodeURIComponent(firstChapter)}/lessons/${encodeURIComponent(firstLesson)}`);
            } 
        } 
    } catch (error) {
        console.error('Failed to fetch chapters or lessons:', error);
    }
};

  const currentTopicName = location.pathname.match(/\/topics\/([^/]+)/)?.[1];

  return (
    <div>
      <div className={styles.topics_nav}>
        <div
          className={styles.topics_nav_toggle}
          ref={toggleBtnRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={`${styles.topics_navbar_menu} ${isMenuOpen ? styles.show : ''}`}
          ref={menuRef}
        >
          <ul className={styles.firstUl}>
            {topics.map((topic) => (
              <li
                key={topic}
                className={currentTopicName === encodeURIComponent(topic) ? styles.topicActive : ''}
                onClick={() => handleTopicClick(topic)}
              >
                <Link className={styles.links} to="#" onClick={(e) => e.preventDefault()}>
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedTopic && (
        <div className={styles.selectedTopic}>
          URL selectat: /topics/{selectedTopic}
        </div>
      )}
    </div>
  );
}

export default TopicsNavigation;
