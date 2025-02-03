import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/PublicApp.module.css';
import ProblemPopup from './ProblemPopup';
import problemsData from '../database/problems.json';
import PublicFooter from '../components/PublicFooter';

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isProblemPopupOpen, setIsProblemPopupOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterComplexity, setFilterComplexity] = useState('');
  const [filterTheme, setFilterTheme] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    setProblems(problemsData);
    applyFilters();
  }, [filterName, filterComplexity, filterTheme, currentPage]);

  const applyFilters = () => {
    let filtered = problemsData;

    if (filterName) {
      filtered = filtered.filter((p) =>
        p.problemName.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterComplexity) {
      filtered = filtered.filter((p) => p.problemComplexity === filterComplexity);
    }

    if (filterTheme) {
      filtered = filtered.filter((p) => p.problemTheme === filterTheme);
    }

    setFilteredProblems(
      filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    );
    setTotalPages(Math.ceil(filtered.length / pageSize));
  };

  const openProblemPopup = (problemId) => {
    const problem = problems.find((p) => p.problemId === problemId);
    setSelectedProblem(problem);
    setIsProblemPopupOpen(true);
  };

  const closeProblemPopup = () => {
    setSelectedProblem(null);
    setIsProblemPopupOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.problemListContainer}>
      <div className={styles.header}>
        <h1>Probleme de Programare pentru Olimpiade și Interviuri IT</h1>
        <p>
          Explorează o colecție vastă de probleme de programare clasificate pe teme precum
          <strong> Căutare Binara</strong>, <strong>Geometrie</strong>,
          <strong> Sortare</strong>, <strong>Structuri de Date</strong>, și multe altele.
          Fie că te pregătești pentru olimpiade de informatică sau pentru interviuri
          la companii de top precum Google, Amazon, Facebook, și Meta, aici găsești
          exerciții care îți vor dezvolta gândirea algoritmică.
        </p>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.filterItem}>
          <label>Problem Name Filter:</label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterItem}>
          <label>Complexity Filter:</label>
          <select
            value={filterComplexity}
            onChange={(e) => setFilterComplexity(e.target.value)}
            className={styles.filterInput}
          >
            <option value="">All</option>
            <option value="FOARTE_USOR">Foarte Usor</option>
            <option value="USOR">Usor</option>
            <option value="MEDIU">Mediu</option>
            <option value="COMPLICAT">Complicat</option>
            <option value="STEVE_WOZNIAK">Steve Wozniak</option>
          </select>
        </div>
        <div className={styles.filterItem}>
          <label>Theme Filter:</label>
          <select
            value={filterTheme}
            onChange={(e) => setFilterTheme(e.target.value)}
            className={styles.filterInput}
          >
            <option value="">All</option>
            <option value="CAUTARE_BINARA">Cautare Binara</option>
            <option value="GEOMETRIE">Geometrie</option>
            <option value="MASIV_PATRAT">Masiv Patrat</option>
            <option value="PROGRAMARE_DINAMICA">Programare Dinamica</option>
            <option value="ALGORITMUL_LACOM">Algoritmul Lacom</option>
            <option value="INCEPATORI">Incepatori</option>
            <option value="COMBINATORICA">Combinatorica</option>
            <option value="MODELARE">Modelare</option>
            <option value="STRING">String</option>
            <option value="RECURSIE">Recursie</option>
            <option value="SORTARE">Sortare</option>
            <option value="STRUCTURI_DE_DATE">Structuri de Date</option>
            <option value="TEOREMA_GRAFELOR">Teorema Grafelor</option>
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
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <tr key={problem.problemId}>
                <td>
                  <Button
                    variant="link"
                    onClick={() => openProblemPopup(problem.problemId)}
                    title={`Rezolvă problema ${problem.problemName} din categoria ${problem.problemTheme}. Nivel: ${problem.problemComplexity}.`}
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
              <td colSpan="3">No problems found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className={styles.paginationContainer}>
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

      <div className={styles.explanatoryText}>
        <h2>Pregătire pentru Succes în Programare</h2>
        <p>
          Descoperă probleme din <strong>Căutare Binara</strong>,
          <strong> Structuri de Date</strong>, <strong>Recursie</strong>,
          și <strong>Programare Dinamică</strong> pentru olimpiade și interviuri FAANG.
        </p>

      </div>

      <ProblemPopup problem={selectedProblem} onClose={closeProblemPopup} />

    </div>
  );
}

export default ProblemList;
