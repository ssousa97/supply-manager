import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <div className="grid grid-rows-[4rem_calc(100vh-4rem)]">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  )
}
