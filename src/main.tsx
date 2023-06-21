import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Dashboard from './components/pages/Dashboard'
import Config from './components/pages/Config'
import Finance from './components/pages/Finance'
import Contracts from './components/pages/contracts/Contracts'
import Materials from './components/pages/materials/Materials'
import Orders from './components/pages/orders/Orders'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/config',
        element: <Config />,
      },
      {
        path: '/finance',
        element: <Finance />,
      },
      {
        path: '/contracts',
        element: <Contracts />,
      },
      {
        path: '/materials',
        element: <Materials />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
