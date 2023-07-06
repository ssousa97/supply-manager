import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.tsx'
import Contracts from './components/contracts/Contracts.tsx'
import Orders from './components/orders/Orders.tsx'
import Items from './components/items/Items.tsx'
import Finance from './components/finance/Finance.tsx'
import Config from './components/config/Config.tsx'
import Contract from './components/contracts/Contract.tsx'
import Order from './components/orders/Order.tsx'
import './index.css'
import Dashboard from './components/dashboard/Dashboard.tsx'

const routes = {
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: 'contracts',
      element: <Contracts />,
    },
    {
      path: 'contract/:id',
      element: <Contract />,
    },
    {
      path: 'orders',
      element: <Orders />,
    },
    {
      path: 'order/:id',
      element: <Order />,
    },
    {
      path: 'items',
      element: <Items />,
    },
    {
      path: 'finance',
      element: <Finance />,
    },
    {
      path: 'config',
      element: <Config />,
    },
  ],
}

const router = createBrowserRouter([routes])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
