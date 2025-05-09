
import { Routes, Route } from 'react-router'

// Global components
import Navbar from './components/Navbar/Navbar'

// Page component
import ActivityIndex from './components/ActivityIndex/ActivityIndex'
import ActivityShow from './components/ActivityShow/ActivityShow'
import ActivityCreate from './components/ActivityCreate/ActivityCreate'
import ActivityUpdate from './components/ActivityUpdate/ActivityUpdate'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import SplashPage from './components/SplashPage/SplashPage'
import Dashboard from './components/Dashboard/Dashboard'

// Context
import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'

function App() {
  // * Context
  const { user } = useContext(UserContext)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/activities" element={<ActivityIndex />} />
        <Route path="/activities/:activityId" element={<ActivityShow />} />
        <Route path="/activities/new" element={<ActivityCreate />} />
        <Route path="/activities/:activityId/edit" element={<ActivityUpdate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        { user
          ? <Route path="/" element={<Dashboard />} />
          : <Route path="/" element={<SplashPage />} />
        }
        
      </Routes>
    </>
  )
}

export default App
