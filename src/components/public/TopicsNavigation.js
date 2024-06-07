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

  const handleTopicClick = async (topicId) => {
    try {
      const response = await fetch(API_BASE_URL + `chapter/${topicId}/all`);
      const result = await response.json();
      if (result.length > 0 && result[0].lessons.length > 0) {
        const firstLessonId = result[0].lessons[0].lessonId;
        navigate(`/topics/${topicId}/lessons/${firstLessonId}`);
      }
    } catch (error) {
      console.error('Failed to fetch chapters:', error);
    }
  };

  const currentTopicId = location.pathname.match(/\/topics\/(\d+)/)?.[1];

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
            {topics.map((topic, index) => (
              <li
                key={topic.topicId}
                className={currentTopicId === topic.topicId.toString() ? styles.topicActive : ''}
                onClick={() => handleTopicClick(topic.topicId)}
              >
                <Link className={styles.links} to="#" onClick={(e) => e.preventDefault()}>
                  {topic.topicName}
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            {topics.map((topic) => (
              <li
                key={topic}
                className={currentTopicId === topic ? styles.topicActive : ''}
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
    </div>
  );
}

export default TopicsNavigation;
