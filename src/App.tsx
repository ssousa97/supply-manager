import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div className="grid grid-rows-[4rem_calc(100vh-4rem)]">
      <Toaster />
      <Navbar />
      <Outlet />
    </div>
  )
}
