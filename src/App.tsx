import Sidebar from './components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="grid grid-cols-[1fr_9fr]">
      <Sidebar />
      <div className="max-h-screen min-h-screen bg-secondary p-4">
        <Outlet />
      </div>
    </div>
  )
}
