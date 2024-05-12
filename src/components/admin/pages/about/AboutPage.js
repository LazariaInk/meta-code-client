import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { API_BASE_URL } from '../../../config/endpoints';

const AboutPage = () => {
  const [content, setContent] = useState('')

  const handleChange = event => {
    setContent(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(localStorage.getItem('token'))
    const response = await fetch(API_BASE_URL + 'admin/about/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')} `,
      'Access-Control-Allow-Origin': '*'
      },mode:'cors',
      body: JSON.stringify({ content })
    })
    if (response.ok) {
      console.log('About content updated successfully')
    } else {
      console.error('Failed to update About content')
    }
  }

  return (
    <div>
      <br></br>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Control as='textarea' value={content} onChange={handleChange} />
        <br></br>
        <Button variant='secondary' type='submit'>
          Post content
        </Button>
      </Form>
    </div>
  )
}

export default AboutPage
