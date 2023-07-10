import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div className="grid grid-rows-[4rem_calc(100vh-4rem)]">
      <Toaster>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className="flex flex-col text-sm">
                <div className="flex justify-end">
                  {t.type !== 'loading' && <button onClick={() => toast.dismiss(t.id)}>X</button>}
                </div>
                {icon}
                {message}
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
      <Navbar />
      <Outlet />
    </div>
  )
}
