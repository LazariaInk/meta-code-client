import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../config/endpoints';

function TopicsList (params) {
  const { nameOfTopic, hrefValue, page } = params
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [topics, setItems] = useState([])

  useEffect(() => {
    fetch(API_BASE_URL + 'admin/topic/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')} `,
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    })
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
          {topics.map(topic =>
            topic.topicName === nameOfTopic ? (
              <ListGroup.Item
                key={topic.topicId}
                variant='dark'
                action
                href={
                  '/admin/' +
                  hrefValue +
                  '/' +
                  topic.topicName +
                  '/' +
                  topic.topicId + page
                }
              >
                {topic.topicName}
              </ListGroup.Item>
            ) : (
              <ListGroup.Item
                key={topic.topicId}
                active={false}
                action
                href={
                  '/admin/' +
                  hrefValue +
                  '/' +
                  topic.topicName +
                  '/' +
                  topic.topicId + page
                }
              >
                {topic.topicName}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </div>
    )
  }
}

export default TopicsList
