import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import StudentDashboard from './pages/StudentDashboard'
import CitizenDashboard from './pages/CitizenDashboard'
import GovernmentDashboard from './pages/GovernmentDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/estudiante" element={<StudentDashboard />} />
        <Route path="/ciudadano" element={<CitizenDashboard />} />
        <Route path="/gubernamental" element={<GovernmentDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
