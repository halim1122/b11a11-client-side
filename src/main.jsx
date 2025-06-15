import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <HelmetProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer/>
    </HelmetProvider>
   </AuthProvider>
  </StrictMode>,
)
