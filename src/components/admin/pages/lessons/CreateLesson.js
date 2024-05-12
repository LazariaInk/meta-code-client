import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import EditLessonForm from './EditLessonForm'
import { API_BASE_URL } from '../../../config/endpoints';

export default function CreateLesson (props) {
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Pass this callback to the LoginForm
  const handleSubmit = e => {
    e.preventDefault()
    const chapterId = props.chapterId
    const newLessonName = e.target[0].value

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')} `,
      'Access-Control-Allow-Origin': '*'
    })

    var jsonData = {
      lessonName: newLessonName
    }

    const requestOptions = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(jsonData),
      mode: 'cors'
    }

    fetch(
      API_BASE_URL + `admin/lesson/create/${chapterId}`,
      requestOptions
    ).then(() => {
      window.location.reload(false)
    })
    handleClose()
  }

  return (
    <>
      <Button variant='secondary' onClick={handleShow}>
        Create lesson
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <EditLessonForm handleSubmit={handleSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' type='submit' form='lessonForm'>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
