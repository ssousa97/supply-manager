import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App'
import Dashboard from './components/pages/Dashboard'
import Config from './components/pages/Config'
import Finance from './components/pages/Finance'
import Contracts from './components/pages/Contracts'
import Items from './components/pages/Items'
import Orders from './components/pages/Orders'

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
        path: '/items',
        element: <Items />,
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
