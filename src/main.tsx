import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PortalProvider } from './context/PortalContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortalProvider>
      <App />
    </PortalProvider>
  </StrictMode>,
)
