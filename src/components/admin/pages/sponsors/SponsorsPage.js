import React, { useState, useEffect } from 'react'
import {
  Table,
  Form,
  Button,
  Modal,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import axios from 'axios'
import { API_BASE_URL } from '../../../config/endpoints';

function SponsorsPage () {
  const [sponsors, setSponsors] = useState([])
  const [sponsorId, setSponsorId] = useState(null)
  const [sponsorName, setSponsorName] = useState('')
  const [sponsorLink, setSponsorLink] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [setShowAlert] = useState(false)
  const [setAlertVariant] = useState('')
  const [setAlertMessage] = useState('')

  useEffect(() => {
    fetchSponsors()
  }, [])

  const fetchSponsors = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        API_BASE_URL + 'admin/sponsor/all',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSponsors(response.data)
    } catch (error) {
      setShowAlert(true)
      setAlertVariant('danger')
      setAlertMessage('Failed to retrieve sponsors.')
    }
  }

  const handleCloseModal = () => {
    setSponsorId(null)
    setSponsorName('')
    setSponsorLink('')
    setShowModal(false)
  }

  const handleCreateSponsor = async () => {
    // setShowLoading(true);
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        API_BASE_URL + 'admin/sponsor/create',
        {
          sponsorName,
          sponsorLink
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSponsors([...sponsors, response.data])
      setShowModal(false)
      setShowAlert(true)
      setAlertVariant('success')
      setAlertMessage('sponsors created successfully.')
    } catch (error) {
      setShowAlert(true)
      setAlertVariant('danger')
      setAlertMessage('Failed to create sponsor.')
    } finally {
      // setShowLoading(false);
    }
  }

  const handleUpdateSponsor = async () => {
    // setShowLoading(true);
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        API_BASE_URL +  `admin/sponsor/edit/${sponsorId}`,
        {
            sponsorName,
          sponsorLink
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const updateSponsors = sponsors.map(sponsor =>
        sponsor.id === sponsorId ? response.data : sponsor
      )
      setSponsors(updateSponsors)
      setShowModal(false)
      setShowAlert(true)
      setAlertVariant('success')
      setAlertMessage('sponsor updated successfully.')
    } catch (error) {
      setShowAlert(true)
      setAlertVariant('danger')
      setAlertMessage('Failed to update sponsor.')
    } finally {
      // setShowLoading(false);
    }
  }

  const handleEditSponsor = sponsor => {
    setSponsorId(sponsor.sponsorId)
    setSponsorName(sponsor.sponsorName)
    setSponsorLink(sponsor.sponsorLink)
    setShowModal(true)
  }

  const handleDeleteSponsor = async sponsorId => {
    // setShowLoading(true)
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        API_BASE_URL +  `admin/sponsor/delete/${sponsorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const updatedSponsors = sponsors.filter(
        sponsor => sponsor.id !== sponsorId
      )
      setSponsors(updatedSponsors)
      setShowAlert(true)
      setAlertVariant('success')
      setAlertMessage('sponsor deleted successfully.')
    } catch (error) {
      setShowAlert(true)
      setAlertVariant('danger')
      setAlertMessage('Failed to delete sponsor.')
    } finally {
      // setShowLoading(false)
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='mt-3'>Sponsors</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>name</th>
                <th>instagramLink</th>
              </tr>
            </thead>
            <tbody>
              {sponsors.map(sponsor => (
                <tr key={sponsor.sponsorId}>
                  <td>{sponsor.sponsorName}</td>
                  <td>{sponsor.sponsorLink}</td>
                  <td>
                    <Button
                      variant='primary'
                      onClick={() => handleEditSponsor(sponsor)}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      variant='danger'
                      onClick={() => handleDeleteSponsor(sponsor.sponsorId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant='primary' onClick={() => setShowModal(true)}>
            Create Sponsor
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {sponsorId ? 'Edit Sponsor' : 'Create Sponsor'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId='formSponsorName'>
              <Form.Label>instagram name</Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                value={sponsorName}
                onChange={e => setSponsorName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formSponsorLink'>
              <Form.Label>instagram link</Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                value={sponsorLink}
                onChange={e => setSponsorLink(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={sponsorId ? handleUpdateSponsor : handleCreateSponsor}
          >
            {sponsorId ? 'Update sponsor' : 'Create sponsor'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default SponsorsPage
