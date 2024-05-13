import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { API_BASE_URL } from '../../../config/endpoints';

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()

    const data = {
      username: username,
      password: password
    }

    axios
      .post(API_BASE_URL + 'api/v1/auth/authenticate', data)
      .then(response => {
        alert(response.data.token)
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token)
      })
      .catch(error => {
        console.log(error)
        alert(error)
      })
  }

  return (
    <Container className='mt-5'>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default LoginPage