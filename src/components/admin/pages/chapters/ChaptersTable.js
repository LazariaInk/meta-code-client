import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaRegTrashAlt } from 'react-icons/fa'
import EditChapter from './EditChapter'
import { API_BASE_URL } from '../../../config/endpoints';

function ChaptersTable () {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [chapters, setItems] = useState([])

  const { id } = useParams()

  async function handleDelete (id) {
    await fetch(API_BASE_URL + `admin/chapter/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')} `,
      'Access-Control-Allow-Origin': '*'
      },mode:'cors'
    }).then(() => {
      const newChapters = [...chapters]

      const index = chapters.findIndex(chapter => chapter.chapterId === id)

      newChapters.splice(index, 1)

      setItems(newChapters)
    })
  }

  useEffect(() => {
    fetch(API_BASE_URL + `admin/chapter/all/${id}`,{
      headers: {
        'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')} `,
      'Access-Control-Allow-Origin': '*'
      },mode:'cors'
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
  if (id === '*') {
    return <h2></h2>
  } else if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th rowSpan={2}>ID</th>
              <th rowSpan={2}>name</th>
              <th colSpan={2}> Actions</th>
            </tr>
          </thead>

          <tbody>
            {chapters.map(chapter => (
              <tr key={chapter.chapterId}>
                <td>{chapter.chapterId}</td>
                <td>{chapter.chapterName}</td>
                <td>
                  <Button
                    variant='link'
                    onClick={e => handleDelete(chapter.chapterId, e)}
                  >
                    <FaRegTrashAlt color='black' />
                  </Button>
                </td>
                <td>
                  <EditChapter
                    chapterId={chapter.chapterId}
                    chapterName={chapter.chapterName}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default ChaptersTable
