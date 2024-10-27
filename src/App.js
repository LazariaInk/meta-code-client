import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import AdminNavigation from './components/admin/AdminNavigation'
import TopicsTable from './components/admin/pages/topics/TopicsTable'
import ChaptersPage from './components/admin/pages/chapters/ChaptersPage'
import AdminMainPage from './components/admin/pages/adminMain/adminMainPage'
import LessonsPage from './components/admin/pages/lessons/LessonsPage'
import AboutPage from './components/admin/pages/about/AboutPage'
import ProblemPage from './components/admin/pages/problems/ProblemPage'
import LoginPage from './components/admin/pages/authenticate/LoginPage'
import SponsorsPage from './components/admin/pages/sponsors/SponsorsPage'
import PublicNavigation from './components/public/PublicNavigation'
import ContentNavigation from './components/public/ContentNavigation'
import HomeComponent from './components/public/HomeComponent'
import ProblemList from './components/public/ProblemList';
import FdCInfoPage from './components/admin/FdCInfoPage';
import RegisterPage from './components/admin/pages/registration/RegisterPage'
import './App.css'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')
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
      {isAdminPage ? (
        <AdminNavigation />
      ) : (
        <PublicNavigation handleTopicSelect={handleTopicSelect} />
      )}
      {isAdminPage ? null : false}
      <div className='containerr'>
        <Routes>
          <Route path='/admin/topics' element={<TopicsTable name='Topics' />} />
          <Route
            path='/admin/chapters/:topicName/:id'
            element={<ChaptersPage name='Chapters' topicName='Java' />}
          />
          <Route
            path='/admin/lessons/:topicName/:id/:chapterName/:chapterId'
            element={<LessonsPage name='Lessons' />}
          />
          <Route
            path='/admin/content-lesson'
            element={<TopicsTable name='Content lesson' />}
          />
          <Route
            path='/admin/problems'
            element={<ProblemPage name='problems' />}
          />
          <Route
            path='/admin/sponsors'
            element={<SponsorsPage name='sponsors' />}
          />
          <Route path='/admin/about' element={<AboutPage />} />
          <Route path='/admin/FdCInfoPage' element={<FdCInfoPage />} />
          <Route path='/admin' element={<AdminMainPage />} />
          <Route path='/admin/login' element={<LoginPage />} />
          <Route path='/admin/register' element={<RegisterPage />} />
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
