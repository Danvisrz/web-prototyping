import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { EventProvider } from "./context/EventContext";
import { CartProvider } from './context/CartContext.jsx'
import './index.css' // <-- Pastikan baris ini TIDAK hilang!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EventProvider>
    <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </EventProvider>
  </React.StrictMode>,
)