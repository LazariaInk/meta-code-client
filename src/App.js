import {
  BrowserRouter as Router,
} from 'react-router-dom'

import './App.css'

function App() {
  return (
    <div className='App'>
      <div className='containerr'>
        <h1>Pagina este în curs de mentenanță</h1>
        <p>Revenim în curând. Mulțumim pentru înțelegere!</p>
      </div>
    </div>
  )
}

function Main() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default Main
