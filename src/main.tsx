import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.tsx'
import ContractsTable from './components/contracts/ContractsTable.tsx'
import OrdersTable from './components/orders/OrdersTable.tsx'
import ItemsTable from './components/items/ItemsTable.tsx'
import Finance from './components/finance/Finance.tsx'
import Config from './components/config/Config.tsx'
import ContractEditPage from './components/contracts/ContractEditPage.tsx'
import OrderEditPage from './components/orders/OrderEditPage.tsx'
import './index.css'
import Dashboard from './components/dashboard/Dashboard.tsx'
import ItemEditDialog from './components/items/ItemEditDialog.tsx'

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
      element: <ContractsTable />,
    },
    {
      path: 'contract/:id',
      element: <ContractEditPage />,
    },
    {
      path: 'orders',
      element: <OrdersTable />,
    },
    {
      path: 'order/:id',
      element: <OrderEditPage />,
    },
    {
      path: 'items',
      element: <ItemsTable />,
    },
    {
      path: 'item/:id',
      element: <ItemEditDialog />,
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
