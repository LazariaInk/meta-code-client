import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/PublicApp.module.css';
import './../App.css';
import topicsData from '../database/topic.json';

function TopicsNavigation() {
  const [topics, setTopics] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleBtnRef = useRef(null);
  const menuRef = useRef(null);

  const encodeNameForURL = (name) => name ? name.replace(/ /g, '_') : '';
  const decodeNameFromURL = (name) => name ? name.replace(/_/g, ' ') : '';

  useEffect(() => {
    setTopics(topicsData.topics);
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
    return () => document.removeEventListener('click', handleClickOutside);
  }, [toggleBtnRef, menuRef]);

  const handleTopicClick = async (topicName) => {
    try {

      const topicData = await import(`../database/${topicName}.json`);
      const chapters = Object.keys(topicData.default);

      if (chapters.length > 0) {
        const firstChapter = chapters[0];
        const lessons = topicData.default[firstChapter];

        if (lessons && lessons.length > 0) {
          const firstLesson = lessons[0];
          setSelectedTopic(topicName);
          navigate(
            `/topics/${encodeNameForURL(topicName)}/chapters/${encodeNameForURL(firstChapter)}/lessons/${encodeNameForURL(firstLesson)}`,
            { state: { topicData: topicData.default } }
          );
        }
      }
    } catch (error) {
      console.error("Error loading topic data:", error);
    }
  };

  const currentTopicName = decodeNameFromURL(location.pathname.match(/\/topics\/([^/]+)/)?.[1]);

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
                className={currentTopicName === encodeNameForURL(topic) ? styles.topicActive : ''}
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
          Selected URL: /topics/{encodeNameForURL(selectedTopic)}
        </div>
      )}
    </div>
  );
}

export default TopicsNavigation;
