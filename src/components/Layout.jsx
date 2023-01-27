import { Outlet } from 'react-router-dom'
import TopLine from './TopLine'

export default function Layout() {
    return (
        <div className='w-full h-screen flex flex-col'>
            <TopLine />
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    )
}
