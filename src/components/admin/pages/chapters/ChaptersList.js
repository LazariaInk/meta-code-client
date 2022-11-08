import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'

function ChaptersList (params) {
  const { nameOfTopic, hrefValue, nameOfChapter, topicId } = params
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [chapters, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/admin/chapter/all/' + topicId)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true)
          setItems(result)
        },
        error => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <ListGroup>
          {chapters.map(chapter =>
            chapter.chapterName === nameOfChapter ? (
              <ListGroup.Item
                key={chapter.chapterId}
                variant='dark'
                action
                href={
                  '/admin/' +
                  hrefValue +
                  '/' +
                  nameOfTopic +
                  '/' +
                  topicId + '/' + chapter.chapterName + '/' + chapter.chapterId
                }
              >
                {chapter.chapterName}
              </ListGroup.Item>
            ) : (
              <ListGroup.Item
                key={chapter.chapterId}
                active={false}
                action
                href={
                  '/admin/' +
                  hrefValue +
                  '/' +
                  nameOfTopic +
                  '/' +
                  topicId + '/' + chapter.chapterName + '/' + chapter.chapterId
                }
              >
                {chapter.chapterName}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </div>
    )
  }
}

export default ChaptersList
