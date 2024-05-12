import React from 'react'
import Button from 'react-bootstrap/Button'
import { API_BASE_URL } from '../../../config/endpoints';

import { Form } from 'react-bootstrap'

export default function CreateChapterForm ({ handleSubmit, chapterName }) {
  return (
    <Form onSubmit={handleSubmit} id='createChapterForm'>
      <Form.Group className='mb-3' controlId='chapterName'>
        <Form.Label>chapter name</Form.Label>
        <Form.Control defaultValue={chapterName} />
        <Form.Text className='text-muted'>Create new chaper</Form.Text>
      </Form.Group>
      <Button size='sm' hidden={true} type='submit'></Button>
    </Form>
  )
}
