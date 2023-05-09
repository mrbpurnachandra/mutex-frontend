import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout() {
    return (
        <div className='w-full h-screen'>
            <ToastContainer />
            <Outlet />
        </div>
    )
}