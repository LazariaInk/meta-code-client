import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PublicApp.module.css'

const ChapterNavigation = ({ topicId, onLessonClick }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [chapters, setChapters] = useState([])
  const [activeChapter, setActiveChapter] = useState(null)
  const navigate = useNavigate()

  const fetchChapters = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/chapter/${topicId}/all`
      )
      const result = await response.json()
      setIsLoaded(true)
      setChapters(result)
    } catch (err) {
      setIsLoaded(true)
      setError(err)
    }
  }

  useEffect(() => {
    if (topicId) fetchChapters()
  }, [topicId])

  const handleChapterClick = chapterId => {
    setActiveChapter(prevActiveChapter =>
      prevActiveChapter === chapterId ? null : chapterId
    )
  }

  const handleLessonClick = lessonId => {
    onLessonClick(lessonId)
    navigate(`/topics/${topicId}/lessons/${lessonId}`)
  }

  if (topicId === '*') return <h2></h2>

  if (error) return <div>Error: {error.message}</div>

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <ul className={`${styles.lessons_menu} ${styles.tree}`}>
        {chapters.map(chapter => (
          <li
            key={chapter.chapterId}
            className={`${styles.chapter} ${
              activeChapter === chapter.chapterId ? styles.active : ''
            }`}
            onClick={() => handleChapterClick(chapter.chapterId)}
          >
            {chapter.chapterName}
            <ul
              style={{
                display: activeChapter === chapter.chapterId ? 'block' : 'none'
              }}
            >
              {chapter.lessons.map(lesson => (
                <li
                  key={lesson.lessonId}
                  className={styles.lesson}
                  onClick={() => handleLessonClick(lesson.lessonId)}
                >
                  <a className={styles.lessonLink} href='#'>
                    {lesson.lessonName}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChapterNavigation
