import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

console.info('Vite environment note: define VITE_CODESPACE_NAME in .env.local for Codespaces URLs; otherwise the app falls back to localhost.')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
