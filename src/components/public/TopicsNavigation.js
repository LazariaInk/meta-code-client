import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './PublicApp.module.css';
import './../../App.css';
import { API_BASE_URL } from '../config/endpoints';

function TopicsNavigation() {
  const [topics, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Obținere locație curentă

  const toggleBtnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    fetch(API_BASE_URL +'topic/all', {
      mode: 'cors'
    })
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setItems(result);
        },
        error => {
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

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a topic is selected
  };

  const currentTopicId = location.pathname.match(/\/topics\/(\d+)/)?.[1]; // Extract the current topic ID safely with optional chaining

  return (
    <div>
      <div className={styles.topics_nav}>
        <div
          className={`${styles.topics_nav_toggle}`}
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
          <ul>
            {topics.map(topic => (
              <li key={topic.topicId} className={`${currentTopicId === topic.topicId.toString() ? styles.topicActive : ''}`}>
                <Link
                  className={styles.links}
                  to={`/topics/${topic.topicId}`}
                  onClick={handleLinkClick}
                >
                  {topic.topicName}
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