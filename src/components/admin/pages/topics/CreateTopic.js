import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import CreateTopicForm from './CreateTopicForm'
import { API_BASE_URL } from '../../../config/endpoints';

export default function CreateTopic (props) {
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = e => {
    e.preventDefault()

    const newTopicName = e.target[0].value

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')} `,
      'Access-Control-Allow-Origin': '*'
    })

    var jsonData = {
      topicName: newTopicName
    }

    fetch(API_BASE_URL + `admin/topic/create`, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: headers
    }).then(() => {
      window.location.reload(false)
    })

    handleClose()
  }

  return (
    <>
      <Button variant='secondary' size='lg' onClick={handleShow}>
        Create topic
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <CreateTopicForm
            handleSubmit={handleSubmit}
            topicValue={props.topicName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' type='submit' form='createTopicForm'>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
