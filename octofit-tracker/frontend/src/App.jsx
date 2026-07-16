import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { getApiUrl } from './baseUrl'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function Home() {
  const [apiStatus, setApiStatus] = useState('Checking backend connection...')

  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await fetch(getApiUrl('/api/health'))
        const payload = await response.json()
        setApiStatus(payload?.status === 'ok' ? `Connected to ${payload.url || payload.baseUrl}` : 'Backend responded unexpectedly')
      } catch (error) {
        setApiStatus(`Unable to reach backend (${error.message})`)
      }
    }

    loadStatus()
  }, [])

  return (
    <main className="container py-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <p className="col-md-8 fs-4">
            A modern multi-tier fitness tracking experience for teams, activities, and performance.
          </p>
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5">Backend status</h2>
              <p className="mb-0 text-muted">{apiStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="container py-3">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4">
          <div className="container-fluid">
            <span className="navbar-brand">OctoFit Tracker</span>
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/users">Users</NavLink>
              <NavLink className="nav-link" to="/teams">Teams</NavLink>
              <NavLink className="nav-link" to="/activities">Activities</NavLink>
              <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
