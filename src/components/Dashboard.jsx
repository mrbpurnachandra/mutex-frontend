import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import httpClient from '../config/axios'
import useSocket from '../hooks/useSocket'
import { getUser } from '../utils'
import LogoutButton from './LogoutButton'
import ErrorElement from '../components/ErrorElement'

function Brand() {
    return (
        <div className='border-b border-gray-300 px-8 py-4'>
            <p className='font-semibold text-lg text-gray-800'>MUTEX</p>
        </div>
    )
}

function SideBar() {
    const user = getUser()
    const isStudent = !!user.student
    const isCr = isStudent && user.student.id === user.student.enroll.class.crId
    return (
        <div className='flex flex-col justify-between w-80 h-full border-r-2 border-gray-300'>
            <div>
                <Brand />
                <div className='p-4'>
                    {isStudent && (
                        <NavLink
                            to={`/message/${user.student.enroll.classId}/home`}
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
                                        d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                                    />
                                </svg>
                            </span>
                            <p className='flex flex-col leading-tight'>
                                <span>Home</span>
                            </p>
                        </NavLink>
                    )}
                    <CommonChannel isStudent={isStudent} />
                </div>
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

function CommonChannel({ isStudent }) {
    const lecturerQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/lecture')
        },
        queryKey: ['lecturer'],
        refetchOnWindowFocus: false,
    })

    if (lecturerQuery.isLoading)
        return <div className='px-4 py-2 text-gray-800'>Loading...</div>
    if (lecturerQuery.error) return <ErrorElement error={lecturerQuery.error} />
    return (
        <>
            <NavLink
                to={`/message/announcements`}
                className={({ isActive }) =>
                    isActive
                        ? 'mt-2 flex items-center space-x-4 px-4 py-2 text-blue-100 bg-blue-600 rounded-md '
                        : 'mt-2 flex items-center space-x-4 px-4 py-2 text-gray-800  rounded-md hover:bg-blue-200'
                }
            >
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
                        d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46'
                    />
                </svg>

                <p className='flex flex-col leading-tight'>
                    <span>Announcements</span>
                </p>
            </NavLink>
            {lecturerQuery.data.map((lecture) => {
                const classId = lecture.class.id
                const teacherId = lecture.teacher.id

                return (
                    <NavLink
                        key={lecture.id}
                        to={`/message/${classId}/${teacherId}`}
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
                                    d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
                                />
                            </svg>
                        </span>
                        <p className='flex flex-col leading-tight'>
                            <span>
                                {isStudent
                                    ? lecture.teacher.user.name
                                    : lecture.class.name}
                            </span>
                            {isStudent && (
                                <span className='text-sm'>
                                    @{lecture.teacher.user.username}
                                </span>
                            )}
                        </p>
                    </NavLink>
                )
            })}
        </>
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
    const socket = useSocket()

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                socket.emit('send_old_messages')
            })

            socket.on('old_messages', (messages) => {
                console.log(messages)
            })

            socket.on('error', (err) => console.log(err))
        }
    }, [socket])

    return (
        <div className='flex w-full h-full'>
            <SideBar />
            <ContentArea />
        </div>
    )
}
