import { ToastContainer } from 'react-toastify'
import Sidebar from './components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'

export default function App() {
  return (
    <div className="grid grid-cols-[1fr_9fr]">
      <Sidebar />
      <div className="max-h-screen min-h-screen bg-secondary p-4">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  )
}
