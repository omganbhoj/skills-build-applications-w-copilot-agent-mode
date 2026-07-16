import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <main className="container py-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <p className="col-md-8 fs-4">
            A modern multi-tier fitness tracking experience for teams, activities, and performance.
          </p>
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
