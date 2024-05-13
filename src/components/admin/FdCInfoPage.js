import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { API_BASE_URL } from '../config/endpoints';

const FdCInfoPage = () => {
  const [id, setId] = useState(1)

  const [newAboutFooter, setNewAboutFooter] = useState('')
  const [newDonateFooterContent, setNewDonateFooterContent] = useState('')
  const [newContactFooterContent, setNewContactFooterContent] = useState('')
  const [newDiscordLink, setNewDiscordLink] = useState('')
  const [newTikTokLink, setNewTikTokLink] = useState('')
  const [newInstagramLink, setNewInstagramLink] = useState('')
  const [newYoutubeLink, setNewYoutubeLink] = useState('')
  const [newOwnerInfo, setNewOwnerInfo] = useState('')
  const [newMotivationalMessage, setNewMotivationalMessage] = useState('')
  const [newInfoHomeMessage, setNewInfoHomeMessage] = useState('')
  const [newIntroHomeMessage, setNewIntroHomeMessage] = useState('')
  const [newTitleHome, setNewTitleHome] = useState('')
  const [newDonateTitle, setNewDonateTitle] = useState('')
  const [newDonateContent, setNewDonateContent] = useState('')

  const handleUpdateAboutFooter = async () => {
    await handleUpdateField('about-footer', newAboutFooter)
  }

  const handleUpdateDonateFooterContent = async () => {
    await handleUpdateField('donate-footer-content', newDonateFooterContent)
  }

  const handleUpdateContactFooterContent = async () => {
    await handleUpdateField('contact-footer-content', newContactFooterContent)
  }

  const handleUpdateDiscordLink = async () => {
    await handleUpdateField('discord-link', newDiscordLink)
  }

  const handleUpdateTikTokLink = async () => {
    await handleUpdateField('tiktok-link', newTikTokLink)
  }

  const handleUpdateInstagramLink = async () => {
    await handleUpdateField('instagram-link', newInstagramLink)
  }

  const handleUpdateYoutubeLink = async () => {
    await handleUpdateField('youtube-link', newYoutubeLink)
  }

  const handleUpdateOwnerInfo = async () => {
    await handleUpdateField('owner-info', newOwnerInfo)
  }

  const handleUpdateMotivationalMessage = async () => {
    await handleUpdateField('motivational-message', newMotivationalMessage)
  }

  const handleUpdateInfoHomeMessage = async () => {
    await handleUpdateField('info-home-message', newInfoHomeMessage)
  }

  const handleUpdateIntroHomeMessage = async () => {
    await handleUpdateField('intro-home-message', newIntroHomeMessage)
  }

  const handleUpdateTitleHome = async () => {
    await handleUpdateField('title-home', newTitleHome)
  }

  const handleUpdateDonateTitle = async () => {
    await handleUpdateField('donate-title', newDonateTitle)
  }

  const handleUpdateDonateContent = async () => {
    await handleUpdateField('donate-content', newDonateTitle)
  }

  const handleUpdateField = async (fieldName, newValue) => {
    console.log(
      API_BASE_URL + 'admin/fabrica-de-coduri-info/' +
        id +
        '/' +
        fieldName
    )
    try {
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain' // Set content type to text/plain
      }

      const response = await axios.put(
        API_BASE_URL + `admin/fabrica-de-coduri-info/${id}/${fieldName}`,
        newValue,
        { headers }
      )

      console.log('Field updated successfully:', response.data)
    } catch (error) {
      console.log(API_BASE_URL)
      console.error('Error updating field:', error.response)
    }
  }

  return (
    <div>
      <h1>Fabrica De Coduri Info</h1>
      <Form>
        <Form.Group controlId='formAboutFooter'>
          <Form.Label>About Footer</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new about footer'
            value={newAboutFooter}
            onChange={e => setNewAboutFooter(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formDonateFooterContent'>
          <Form.Label>Donate Footer Content</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new donate footer content'
            value={newDonateFooterContent}
            onChange={e => setNewDonateFooterContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formContactFooterContent'>
          <Form.Label>Contact Footer Content</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new contact footer content'
            value={newContactFooterContent}
            onChange={e => setNewContactFooterContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formDiscordLink'>
          <Form.Label>Discord Link</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new Discord link'
            value={newDiscordLink}
            onChange={e => setNewDiscordLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formTikTokLink'>
          <Form.Label>TikTok Link</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new TikTok link'
            value={newTikTokLink}
            onChange={e => setNewTikTokLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formInstagramLink'>
          <Form.Label>Instagram Link</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new Instagram link'
            value={newInstagramLink}
            onChange={e => setNewInstagramLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formYoutubeLink'>
          <Form.Label>Youtube Link</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new Youtube link'
            value={newYoutubeLink}
            onChange={e => setNewYoutubeLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formOwnerInfo'>
          <Form.Label>Owner Info</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new owner info'
            value={newOwnerInfo}
            onChange={e => setNewOwnerInfo(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formMotivationalMessage'>
          <Form.Label>Motivational Message</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new motivational message'
            value={newMotivationalMessage}
            onChange={e => setNewMotivationalMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formInfoHomeMessage'>
          <Form.Label>Info Home Message</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new info home message'
            value={newInfoHomeMessage}
            onChange={e => setNewInfoHomeMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formIntroHomeMessage'>
          <Form.Label>Intro Home Message</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new intro home message'
            value={newIntroHomeMessage}
            onChange={e => setNewIntroHomeMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formTitleHome'>
          <Form.Label>Title Home</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new title home'
            value={newTitleHome}
            onChange={e => setNewTitleHome(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formDonateTitle'>
          <Form.Label>Donate title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new donate title'
            value={newDonateTitle}
            onChange={e => setNewDonateTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formDonateContent'>
          <Form.Label>Donate content</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter new donate content'
            value={newDonateContent}
            onChange={e => setNewDonateContent(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' onClick={handleUpdateAboutFooter}>
          Update About Footer
        </Button>

        <Button variant='primary' onClick={handleUpdateDonateFooterContent}>
          Update Donate Footer Content
        </Button>

        <Button variant='primary' onClick={handleUpdateContactFooterContent}>
          Update Contact Footer Content
        </Button>

        <Button variant='primary' onClick={handleUpdateDiscordLink}>
          Update Discord Link
        </Button>

        <Button variant='primary' onClick={handleUpdateTikTokLink}>
          Update TikTok Link
        </Button>

        <Button variant='primary' onClick={handleUpdateInstagramLink}>
          Update Instagram Link
        </Button>

        <Button variant='primary' onClick={handleUpdateYoutubeLink}>
          Update Youtube Link
        </Button>

        <Button variant='primary' onClick={handleUpdateOwnerInfo}>
          Update Owner Info
        </Button>

        <Button variant='primary' onClick={handleUpdateMotivationalMessage}>
          Update Motivational Message
        </Button>

        <Button variant='primary' onClick={handleUpdateInfoHomeMessage}>
          Update Info Home Message
        </Button>

        <Button variant='primary' onClick={handleUpdateIntroHomeMessage}>
          Update Intro Home Message
        </Button>

        <Button variant='primary' onClick={handleUpdateTitleHome}>
          Update Title Home
        </Button>

        <Button variant='primary' onClick={handleUpdateDonateTitle}>
          Update Donate Title
        </Button>

        <Button variant='primary' onClick={handleUpdateDonateContent}>
          Update Donate Content
        </Button>
      </Form>
    </div>
  )
}

export default FdCInfoPage
