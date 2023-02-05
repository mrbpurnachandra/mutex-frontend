import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='w-full h-screen flex flex-col'>
            <div className='flex-1 w-full h-full'>
                <Outlet />
            </div>
        </div>
    )
}
