import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import EditChapterForm from './EditChapterForm'
import { FaRegEdit } from 'react-icons/fa'
import { API_BASE_URL } from '../../../config/endpoints';

export default function EditChapter (props) {
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Pass this callback to the LoginForm
  const handleSubmit = e => {
    e.preventDefault()
    const chapterId = props.chapterId
    const newChapterName = e.target[0].value

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')} `,
      'Access-Control-Allow-Origin': '*'
    })

    var jsonData = {
      chapterName: newChapterName
    }

    fetch(API_BASE_URL + `admin/chapter/edit/${chapterId}`, {
      method: 'PUT',
      body: JSON.stringify(jsonData),
      headers: headers,
      mode:'cors'
    }).then(() => {
      window.location.reload(false)
    })
    handleClose()
  }

  return (
    <>
      <Button variant='link' onClick={handleShow}>
        <FaRegEdit color='black' />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <EditChapterForm
            handleSubmit={handleSubmit}
            chapterValue={props.chapterName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' type='submit' form='chapterForm'>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
