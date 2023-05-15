import { useQuery } from '@tanstack/react-query'
import { useEffect, useReducer, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import httpClient from '../config/axios'
import useSocket from '../hooks/useSocket'
import { getUser } from '../utils'
import LogoutButton from './LogoutButton'
import ErrorElement from '../components/ErrorElement'
import SocketContext from '../context/SocketContext'
import {
    MessageContext,
    MessageDispatchContext,
    messageReducer,
} from '../context/MessageContext'
import {
    AnnouncementContext,
    AnnouncementDispatchContext,
    announcementReducer,
} from '../context/AnnouncementContext'
import { toast } from 'react-toastify'
import {
    AcademicCapIcon,
    ArrowPathRoundedSquareIcon,
    ArrowRightOnRectangleIcon,
    ChatBubbleBottomCenterTextIcon,
    HandRaisedIcon,
    HomeIcon,
    MegaphoneIcon,
    UserGroupIcon,
} from '@heroicons/react/20/solid'

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
                                <HomeIcon className='h-6 w-6' />
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
                                <AcademicCapIcon className='h-6 w-6' />
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
                                <UserGroupIcon className='h-6 w-6' />
                            </span>
                            <span>Manage Students</span>
                        </NavLink>
                    </>
                )}
                <div className='mt-2 flex items-center space-x-4 px-4 py-2 text-gray-800 rounded-md hover:bg-blue-200'>
                    <span>
                        <ArrowRightOnRectangleIcon className='h-6 w-6' />
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
        refetchInterval: 15 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    if (lecturerQuery.isLoading)
        return (
            <div className='px-4 py-2 text-gray-800'>
                <HandRaisedIcon className='h-6 w-6' />
            </div>
        )
    if (lecturerQuery.error) return <ErrorElement error={lecturerQuery.error} />

    return (
        <>
            <div className='mt-2'>
                <button
                    className='flex items-center space-x-4 px-4 py-2'
                    onClick={lecturerQuery.refetch}
                >
                    {lecturerQuery.isFetching ? (
                        <HandRaisedIcon className='h-6 w-6' />
                    ) : (
                        <>
                            <ArrowPathRoundedSquareIcon className='h-6 w-6' />
                            <span>Refresh</span>
                        </>
                    )}
                </button>
            </div>
            <NavLink
                to={`/announcements`}
                className={({ isActive }) =>
                    isActive
                        ? 'mt-2 flex items-center space-x-4 px-4 py-2 text-blue-100 bg-blue-600 rounded-md '
                        : 'mt-2 flex items-center space-x-4 px-4 py-2 text-gray-800  rounded-md hover:bg-blue-200'
                }
            >
                <MegaphoneIcon className='h-6 w-6' />

                <p className='flex flex-col leading-tight'>
                    <span>Announcements</span>
                </p>
            </NavLink>
            {lecturerQuery.data.map((lecture) => {
                const classId = lecture.class.id
                const teacherId = lecture.teacher.user.id
                const receiverId = isStudent
                    ? teacherId
                    : lecture.class.cr.userId
                return (
                    <NavLink
                        key={lecture.id}
                        to={`/message/${classId}/${receiverId}`}
                        className={({ isActive }) =>
                            isActive
                                ? 'mt-2 flex items-center space-x-4 px-4 py-2 text-blue-100 bg-blue-600 rounded-md '
                                : 'mt-2 flex items-center space-x-4 px-4 py-2 text-gray-800  rounded-md hover:bg-blue-200'
                        }
                    >
                        <span>
                            <ChatBubbleBottomCenterTextIcon className='h-6 w-6' />
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

let lastMessageId
let lastAnnouncementId
export default function Dashboard() {
    const socket = useSocket()
    const [announcements, announcementDispatch] = useReducer(
        announcementReducer,
        []
    )
    const [messages, messageDispatch] = useReducer(messageReducer, [])

    lastMessageId = messages.sort((a, b) => a.id - b.id).at(0)?.id
    lastAnnouncementId = announcements.sort((a, b) => a.id - b.id).at(0)?.id

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                socket.emit('send_old_messages', lastMessageId)
                socket.emit('send_old_announcements', lastAnnouncementId)
            })

            socket.on('old_messages', (old_messages) => {
                messageDispatch({
                    type: 'ADD_OLD_MESSAGES',
                    payload: old_messages,
                })
            })

            socket.on('old_announcements', (old_announcements) => {
                announcementDispatch({
                    type: 'ADD_OLD_ANNOUNCEMENTS',
                    payload: old_announcements,
                })
            })

            socket.on('new_message', (message) => {
                messageDispatch({
                    type: 'ADD_NEW_MESSAGE',
                    payload: message,
                })
            })

            socket.on('message_deleted', (id) => {
                messageDispatch({
                    type: 'DELETE_MESSAGE',
                    payload: id,
                })
            })

            socket.on('new_announcement', (announcement) => {
                announcementDispatch({
                    type: 'ADD_NEW_ANNOUNCEMENT',
                    payload: announcement,
                })
            })

            socket.on('student_removed', (id) => {
                messageDispatch({
                    type: 'STUDENT_REMOVED',
                    payload: id,
                })

                announcementDispatch({
                    type: 'STUDENT_REMOVED',
                    payload: id,
                })
            })

            socket.on('error', (err) => {
                if (err.message) {
                    toast.error(err.message)
                }
            })
        }
    }, [socket])

    return (
        <SocketContext.Provider value={socket}>
            <MessageContext.Provider value={messages}>
                <MessageDispatchContext.Provider value={messageDispatch}>
                    <AnnouncementContext.Provider value={announcements}>
                        <AnnouncementDispatchContext.Provider
                            value={announcementDispatch}
                        >
                            <div className='flex w-full h-full'>
                                <SideBar />
                                <ContentArea />
                            </div>
                        </AnnouncementDispatchContext.Provider>
                    </AnnouncementContext.Provider>
                </MessageDispatchContext.Provider>
            </MessageContext.Provider>
        </SocketContext.Provider>
    )
}
