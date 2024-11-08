import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Pagination from 'react-bootstrap/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/PublicApp.module.css'
import { API_BASE_URL } from './config/endpoints';

function ProblemList() {
  const [problems, setProblems] = useState([])
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [isProblemPopupOpen, setIsProblemPopupOpen] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [filterComplexity, setFilterComplexity] = useState('')
  const [filterTheme, setFilterTheme] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchProblems()
  }, [currentPage, filterName, filterComplexity, filterTheme])

  const fetchProblems = () => {

    const currentPageInt = parseInt(currentPage, 10)

    if (isNaN(currentPageInt)) {
      alert('currentPage is not a valid integer')
      return
    }

    let apiUrl = API_BASE_URL + `problems/list?page=${currentPageInt}`

    if (filterName) {
      apiUrl += `&problemNameFilter=${filterName}`
    }

    if (filterComplexity) {
      apiUrl += `&problemComplexityFilter=${filterComplexity}`
    }

    if (filterTheme) {
      apiUrl += `&problemThemeFilter=${filterTheme}`
    }


    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setProblems(data)
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        alert('Error fetching problems:', error)
      })
  }

  const openProblemPopup = problemId => {
    fetch(API_BASE_URL + `problems/${problemId}/content`)
      .then(response => response.json())
      .then(data => {
        setSelectedProblem(data)
        setIsProblemPopupOpen(true)
      })
      .catch(error => {
        alert('Error fetching problem details:', error)
      })
  }

  const closeProblemPopup = () => {
    setIsProblemPopupOpen(false)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  return (
    <div className={styles.problemListContainer}>
      <div className={styles.filterContainer}>
        <div className={styles.filterItem}>
          <label>Problem Name Filter:</label>
          <input
            type='text'
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterItem}>
          <label>Complexity Filter:</label>
          <select
            value={filterComplexity}
            onChange={e => setFilterComplexity(e.target.value)}
            className={styles.filterInput}
          >
            <option value=''>All</option>
            <option value='FOARTE_USOR'>Foarte Usor</option>
            <option value='USOR'>Usor</option>
            <option value='MEDIU'>Mediu</option>
            <option value='COMPLICAT'>Complicat</option>
            <option value='STEVE_WOZNIAK'>Steve Wozniak</option>
          </select>
        </div>
        <div className={styles.filterItem}>
          <label>Theme Filter:</label>
          <select
            value={filterTheme}
            onChange={e => setFilterTheme(e.target.value)}
            className={styles.filterInput}
          >
            <option value=''>All</option>
            <option value='CAUTARE_BINARA'>Cautare Binara</option>
            <option value='GEOMETRIE'>Geometrie</option>
            <option value='MASIV_PATRAT'>Masiv Patrat</option>
            <option value='PROGRAMARE_DINAMICA'>Programare Dinamica</option>
            <option value='ALGORITMUL_LACOM'>Algoritmul Lacom</option>
            <option value='INCEPATORI'>Incepatori</option>
            <option value='COMBINATORICA'>Combinatorica</option>
            <option value='MODELARE'>Modelare</option>
            <option value='STRING'>String</option>
            <option value='RECURSIE'>Recursie</option>
            <option value='SORTARE'>Sortare</option>
            <option value='STRUCTURI_DE_DATE'>Structuri de Date</option>
            <option value='TEOREMA_GRAFELOR'>Teorema Grafelor</option>
          </select>
        </div>
      </div>

      <Table striped bordered hover responsive className={styles.problemTable}>
        <thead>
          <tr>
            <th>Problem Name</th>
            <th>Complexity</th>
            <th>Theme</th>
          </tr>
        </thead>
        <tbody>
          {problems === null ? (
            <tr>
              <td colSpan='3'>Loading...</td>
            </tr>
          ) : problems && problems.length > 0 ? (
            problems.map(problem => (
              <tr key={problem.problemId}>
                <td>
                  <Button
                    variant='link'
                    onClick={() => openProblemPopup(problem.problemId)}
                  >
                    {problem.problemName}
                  </Button>
                </td>
                <td>{problem.problemComplexity}</td>
                <td>{problem.problemTheme}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3'>No problems found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className={styles.paginationContainer}>
        {' '}
        <Pagination className={styles.pagination}>
          <Pagination.First onClick={() => handlePageChange(0)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          />
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index === currentPage}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} />
        </Pagination>
      </div>

      <ProblemPopup
        problem={selectedProblem}
        onClose={closeProblemPopup}
        isOpen={isProblemPopupOpen}
      />
    </div>
  )
}

function ProblemPopup({ problem, onClose, isOpen }) {
  const [activeKey, setActiveKey] = useState('problemContent')

  return (
    <Modal show={isOpen} onHide={onClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Problem Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeKey}
          onSelect={k => setActiveKey(k)}
          id='problem-tabs'
        >
          <Tab eventKey='problemContent' title='Problem Content'>
            <div>
              <div>{problem?.problemContent}</div>
            </div>
          </Tab>
          <Tab eventKey='problemSolution' title='Problem Solution'>
            <div>
              <div
                dangerouslySetInnerHTML={{ __html: problem?.problemSolution }}
              />
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProblemList
