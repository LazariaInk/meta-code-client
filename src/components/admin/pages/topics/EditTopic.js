import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import EditTopicForm from './EditTopicForm'
import { FaRegEdit } from 'react-icons/fa'
import { API_BASE_URL } from '../../../config/endpoints';

export default function EditTopic (props) {
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Pass this callback to the LoginForm
  const handleSubmit = e => {
    e.preventDefault()
    const topicId = props.topicId
    const newTopicName = e.target[0].value

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')} `,
      'Access-Control-Allow-Origin': '*'
    })

    var jsonData = {
      topicName: newTopicName
    }

    fetch(API_BASE_URL + `admin/topic/edit/${topicId}`, {
      method: 'PUT',
      body: JSON.stringify(jsonData),
      headers: headers
    }).then(() => {
      window.location.reload(false)
    })

    console.log(topicId + ' ' + newTopicName)
    handleClose()
  }

  return (
    <>
      <Button variant='link' onClick={handleShow}>
        <FaRegEdit color='black' />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <EditTopicForm
            handleSubmit={handleSubmit}
            topicValue={props.topicName}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* Here the form attribute is referencing the form with the id myForm which is the LoginForm */}
          <Button variant='secondary' type='submit' form='myForm'>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
