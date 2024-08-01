import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import './index.css'
import ShowPage from './components/showPage/ShowPage'


const router=createBrowserRouter([
  {
    path:'/',
    element:<ShowPage/>,
    errorElement:'error system'
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
