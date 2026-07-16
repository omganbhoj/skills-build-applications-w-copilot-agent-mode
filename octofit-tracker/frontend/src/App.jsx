import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getApiUrl } from './baseUrl'
import './App.css'

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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
