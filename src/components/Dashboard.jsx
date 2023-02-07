import { NavLink, Outlet } from 'react-router-dom'
import { getUser } from '../utils'
import LogoutButton from './LogoutButton'

function Brand() {
    return (
        <div className='border-b border-gray-300 px-8 py-4'>
            <p className='font-semibold text-lg text-gray-800'>MUTEX</p>
        </div>
    )
}

function SideBar() {
    const user = getUser()
    const isCr =
        user.student && user.student.id === user.student.enroll.class.crId
    return (
        <div className='flex flex-col justify-between w-80 h-full border-r-2 border-gray-300'>
            <div>
                <Brand />
            </div>
            <div className='border-t border-gray-300 bg-gray-200 p-4'>
                {isCr && (
                    <>
                        <NavLink
                            to='/manage/teachers'
                            className={({ isActive }) =>
                                isActive
                                    ? 'mt-2 flex items-center space-x-4 px-4 py-2 text-blue-100 bg-blue-600 rounded-md '
                                    : 'mt-2 flex items-center space-x-4 px-4 py-2 text-gray-800  rounded-md hover:bg-blue-200'
                            }
                        >
                            <span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
                                    />
                                </svg>
                            </span>
                            <span>Manage Teachers</span>
                        </NavLink>
                        <NavLink
                            to='/manage/students'
                            className={({ isActive }) =>
                                isActive
                                    ? 'mt-2 flex items-center space-x-4 px-4 py-2 text-blue-100 bg-blue-600 rounded-md '
                                    : 'mt-2 flex items-center space-x-4 px-4 py-2 text-gray-800  rounded-md hover:bg-blue-200'
                            }
                        >
                            <span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                                    />
                                </svg>
                            </span>
                            <span>Manage Students</span>
                        </NavLink>
                    </>
                )}
                <div className='mt-2 flex items-center space-x-4 px-4 py-2 text-gray-800 rounded-md hover:bg-blue-200'>
                    <span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                            />
                        </svg>
                    </span>
                    <span>
                        <LogoutButton />
                    </span>
                </div>
            </div>
        </div>
    )
}


function ContentArea() {
    return (
        <div className='h-full w-full overflow-auto'>
            <Outlet />
        </div>
    )
}

export default function Dashboard() {
    return (
        <div className='flex w-full h-full'>
            <SideBar />
            <ContentArea />
        </div>
    )
}
