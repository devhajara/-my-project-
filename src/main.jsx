import "@fontsource/inter"; // Loads default Inter font styles
import '@solana/wallet-adapter-react-ui/styles.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Buffer } from "buffer";
window.Buffer = Buffer;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
