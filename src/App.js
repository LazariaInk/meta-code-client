import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'




import PublicNavigation from './components/PublicNavigation'
import ContentNavigation from './components/ContentNavigation'
import HomeComponent from './components/HomeComponent'
import ProblemList from './components/ProblemList';
import './App.css'

function App() {
  const location = useLocation()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [chapters, setChapters] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (selectedTopic) {
      fetch(`http://localhost:8080/chapter/${selectedTopic.topicId}/all`, {
        mode: 'cors'
      })
        .then(res => res.json())
        .then(
          result => {
            setIsLoaded(true)
            setChapters(result)
          },
          error => {
            setIsLoaded(true)
            setError(error)
          }
        )
    } else {
      setChapters([])
    }
  }, [selectedTopic])

  const handleTopicSelect = topic => {
    setSelectedTopic(topic)
  }

  return (
    <div className='App'>
      <PublicNavigation handleTopicSelect={handleTopicSelect} />
      <div className='containerr'>
        <Routes>
          <Route path='/topics/:topicName/chapters/:chapterName/lessons/:lessonName' element={<ContentNavigation />} />
          <Route path='/topics/:topicId' element={<ContentNavigation />} />
          <Route path='/' element={<HomeComponent />} />
          <Route path="/problems" element={<ProblemList />} />
        </Routes>
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
