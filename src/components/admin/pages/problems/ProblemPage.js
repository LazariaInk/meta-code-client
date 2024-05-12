import React, { useState, useEffect } from 'react'
import styles from '../../AdminApp.module.css'
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

function ProblemPage () {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [problemId, setProblemId] = useState(null)
  const [problemName, setProblemName] = useState('')
  const [problemContent, setProblemContent] = useState('')
  const [problemSolution, setProblemSolution] = useState('')
  const [problemComplexity, setProblemComplexity] = useState('')
  const [problemTheme, setProblemTheme] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [setShowLoading] = useState(false)
  const [setShowAlert] = useState(false)
  const [setAlertVariant] = useState('')
  const [setAlertMessage] = useState('')

  useEffect(() => {
    fetchProblems()
  }, [])

  const fetchProblems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        API_BASE_URL + 'admin/problem/all',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProblems(response.data);
      setFilteredProblems(response.data); // Initialize filteredProblems with all problems
    } catch (error) {
      // Handle error
    }
  };

  const handleSearch = () => {
    console.log("test")
    // Filter problems based on the search term
    const filtered = problems.filter((problem) =>
      problem.problemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProblems(filtered);
  };

  const handleCloseModal = () => {
    setProblemId(null)
    setProblemName('')
    setProblemContent('')
    setProblemSolution('')
    setProblemComplexity('')
    setProblemTheme('')
    setShowModal(false)
  }

  const handleCreateProblem = async () => {
    // setShowLoading(true);
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        API_BASE_URL + 'admin/problem/create',
        {
          problemName,
          problemContent,
          problemSolution,
          problemComplexity,
          problemTheme
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setProblems([...problems, response.data])
      setShowModal(false)
      setShowAlert(true)
      setAlertVariant('success')
      setAlertMessage('Problem created successfully.')
    } catch (error) {
      setShowAlert(true)
      setAlertVariant('danger')
      setAlertMessage('Failed to create problem.')
    } finally {
      // setShowLoading(false);
    }
  }

  const handleUpdateProblem = async () => {
    // setShowLoading(true);
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        API_BASE_URL + `admin/problem/edit/${problemId}`,
        {
          problemName,
          problemContent,
          problemSolution,
          problemComplexity,
          problemTheme
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const updatedProblems = problems.map(problem =>
        problem.id === problemId ? response.data : problem
      )
      setProblems(updatedProblems)
      setShowModal(false)
      setShowAlert(true)
      setAlertVariant('success')
      setAlertMessage('Problem updated successfully.')
    } catch (error) {
      setShowAlert(true)
      setAlertVariant('danger')
      setAlertMessage('Failed to update problem.')
    } finally {
      // setShowLoading(false);
    }
  }

  const handleEditProblem = problem => {
    setProblemId(problem.problemId)
    setProblemName(problem.problemName)
    setProblemContent(problem.problemContent)
    setProblemSolution(problem.problemSolution)
    setProblemComplexity(problem.problemComplexity)
    setProblemTheme(problem.problemTheme)
    setShowModal(true)
  }

  const handleDeleteProblem = async problemId => {
    // setShowLoading(true)
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        API_BASE_URL + `admin/problem/delete/${problemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const updatedProblems = problems.filter(
        problem => problem.id !== problemId
      )
      setProblems(updatedProblems)
      setShowAlert(true)
      setAlertVariant('success')
      setAlertMessage('Problem deleted successfully.')
    } catch (error) {
      setShowAlert(true)
      setAlertVariant('danger')
      setAlertMessage('Failed to delete problem.')
    } finally {
      // setShowLoading(false)
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='mt-3'>Problems</h1>
          <Form.Group controlId='formSearch'>
            <Form.Control
              type='text'
              placeholder='Search by name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant='primary' onClick={handleSearch}>
              Search
            </Button>
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Content</th>
                <th>Solution</th>
                <th>Complexity</th>
                <th>Theme</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredProblems.map((problem) => (
                <tr key={problem.problemId}>
                  <td className={styles.tableCell}>
                    {problem.problemName.length > 15
                      ? `${problem.problemName.substring(0, 15)}...`
                      : problem.problemName}
                  </td>
                  <td className={styles.tableCell}>
                    {problem.problemContent.length > 15
                      ? `${problem.problemContent.substring(0, 15)}...`
                      : problem.problemContent}
                  </td>
                  <td className={styles.tableCell}>
                    {problem.problemSolution.length > 15
                      ? `${problem.problemSolution.substring(0, 15)}...`
                      : problem.problemSolution}
                  </td>
                  <td className={styles.tableCell}>
                    {problem.problemComplexity.length > 15
                      ? `${problem.problemComplexity.substring(0, 15)}...`
                      : problem.problemComplexity}
                  </td>
                  <td className={styles.tableCell}>
                    {problem.problemTheme.length > 15
                      ? `${problem.problemTheme.substring(0, 15)}...`
                      : problem.problemTheme}
                  </td>
                  <td>
                    <Button
                      variant='primary'
                      onClick={() => handleEditProblem(problem)}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      variant='danger'
                      onClick={() => handleDeleteProblem(problem.problemId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant='primary' onClick={() => setShowModal(true)}>
            Create Problem
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {problemId ? 'Edit Problem' : 'Create Problem'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formProblemName'>
              <Form.Label>Problem Name</Form.Label>
              <Form.Control
                type='text'
                value={problemName}
                onChange={e => setProblemName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formProblemContent'>
              <Form.Label>Problem Content</Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                value={problemContent}
                onChange={e => setProblemContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formProblemSolution'>
              <Form.Label>Problem Solution</Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                value={problemSolution}
                onChange={e => setProblemSolution(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formProblemComplexity'>
              <Form.Label>Problem Complexity</Form.Label>
              <Form.Select
                value={problemComplexity}
                onChange={e => setProblemComplexity(e.target.value)}
              >
                <option value=''>Select a complexity</option>
                <option value='FOARTE_USOR'>foarte usor</option>
                <option value='USOR'>usor</option>
                <option value='MEDIU'>mediu</option>
                <option value='COMPLICAT'>complicat</option>
                <option value='STEVE_WOZNIAK'>Stove Wozniak</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId='formProblemTheme'>
              <Form.Label>Problem Theme</Form.Label>
              <Form.Select
                value={problemComplexity}
                onChange={e => setProblemTheme(e.target.value)}
              >
                <option value=''>Select a theme</option>
                <option value='CAUTARE_BINARA'>cautarea binara</option>
                <option value='GEOMETRIE'>geometrie</option>
                <option value='MASIV_PATRAT'>masiv patrat</option>
                <option value='PROGRAMARE_DINAMICA'>
                  programarea dinamica
                </option>
                <option value='ALGORITMUL_LACOM'>algoritmul lacom</option>
                <option value='INCEPATORI'>incepatori</option>
                <option value='COMBINATORICA'>combinatorica</option>
                <option value='MODELARE'>modelare</option>
                <option value='STRING'>string</option>
                <option value='RECURSIE'>recursie</option>
                <option value='SORTARE'>sortare</option>
                <option value='STRUCTURI_DE_DATE'>structuri de date</option>
                <option value='TEOREMA_GRAFELOR'>teorema grafelor</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={problemId ? handleUpdateProblem : handleCreateProblem}
          >
            {problemId ? 'Update Problem' : 'Create Problem'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default ProblemPage
