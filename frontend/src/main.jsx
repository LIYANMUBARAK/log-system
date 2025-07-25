import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)
// main.jsx or index.jsx
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(savedTheme);
