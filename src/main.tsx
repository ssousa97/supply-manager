import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.tsx'
import Contracts from './components/contracts/Contracts.tsx'
import Orders from './components/orders/Orders.tsx'
import Receipts from './components/receipts/Receipts.tsx'
import Materials from './components/materials/Materials.tsx'
import Finance from './components/finance/Finance.tsx'
import Config from './components/config/Config.tsx'
import Contract from './components/contracts/Contract.tsx'
import Order from './components/orders/Order.tsx'
import Receipt from './components/receipts/Receipt.tsx'
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
      path: 'receipts',
      element: <Receipts />,
    },
    {
      path: 'receipt/:id',
      element: <Receipt />,
    },
    {
      path: 'materials',
      element: <Materials />,
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
