import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import AuthProvider from './Provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './Router/router.jsx'

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
