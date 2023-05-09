import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SocketContext from '../context/SocketContext'
import { getUser } from '../utils'
import AnnouncementContext from '../context/AnnouncementContext'
import { useQuery } from '@tanstack/react-query'
import httpClient from '../config/axios'
import ErrorElement from '../components/ErrorElement'
import ImageUpload from '../components/ImageUpload'

export default function Announcement() {
    const user = getUser()
    const navigate = useNavigate()

    const lecturerQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/lecture')
        },
        queryKey: ['lecturer'],
        refetchOnWindowFocus: false,
    })

    const socket = useContext(SocketContext)
    const announcements = useContext(AnnouncementContext)

    const classes = lecturerQuery.data?.map((lecture) => ({
        id: lecture.classId,
        name: lecture.class.name,
    }))

    const [announcement, setAnnouncement] = useState('')
    const [announcementImg, setAnnouncementImg] = useState(null)
    const [classId, setClassId] = useState()

    const boxRef = useRef(null)

    const filteredAnnouncements = announcements.filter(
        (a) => user.student || a.classId === Number(classId)
    )
    function handleSubmit(e) {
        e.preventDefault()

        if (user.teacher && !classId) {
            alert('Please select class')
            return
        }
        const payload = {
            content: announcement,
        }

        if (announcementImg) {
            payload.image = announcementImg
        }

        socket.emit('new_announcement', {
            ...payload,
            classId:
                (classId && Number(classId)) ?? user.student.enroll.classId,
        })

        setAnnouncement('')
        setAnnouncementImg(null)
    }

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight
        }
    })

    if (lecturerQuery.isLoading)
        return <div className='px-4 py-2 text-gray-800'>Loading...</div>
    if (lecturerQuery.error) return <ErrorElement error={lecturerQuery.error} />

    if (
        user.student &&
        (!user.student.enroll || user.student.enroll.status === 'pending')
    )
        return navigate('/', { replace: true })

    if (!socket) return <div>Loading...</div>

    return (
        <div className='flex flex-col h-full '>
            <div className='px-8 py-4 shadow'>
                <h4 className='text-gray-700 text-lg'>Announcements</h4>
            </div>
            {user.teacher && (
                <div>
                    <select
                        name='classId'
                        onChange={(e) => setClassId(e.target.value)}
                        value={classId}
                    >
                        <option>Select Class</option>
                        {classes.map((c) => {
                            return (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            )}
            <div
                className='relative w-full p-3 overflow-y-scroll h-full'
                ref={boxRef}
            >
                <ul className='space-y-1.5'>
                    {filteredAnnouncements.map((announcement) => (
                        <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                        />
                    ))}
                </ul>
            </div>

            <div className='w-full p-3 border-t border-gray-300'>
                {announcementImg && (
                    <div>
                        <img
                            className='w-24 max-h-24 rounded-lg object-cover object-center shadow-lg'
                            src={announcementImg}
                        />
                    </div>
                )}
                <div className=' flex items-center justify-between '>
                    <div className='w-24'>
                        <ImageUpload onImageChange={setAnnouncementImg} />
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className='flex-1 flex items-center justify-between '
                    >
                        <input
                            type='text'
                            placeholder='Announcement'
                            className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
                            name='announcement'
                            value={announcement}
                            onChange={(e) => setAnnouncement(e.target.value)}
                        />
                        <button type='submit'>
                            <svg
                                className='w-5 h-5 text-gray-500 origin-center transform rotate-90'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

function AnnouncementCard({ announcement }) {
    return (
        <li className='flex justify-start'>
            <div className='relative max-w-xl px-4 py-2 rounded-lg shadow text-gray-800 bg-gray-200'>
                <span className='text-xs'>{announcement.user.name}</span>
                <span className='block'>{announcement.content} </span>
                {announcement.image && (
                    <img
                        className='w-64 rounded-lg object-cover object-center shadow-md'
                        src={announcement.image}
                    />
                )}
                <span className='text-xs'>{announcement.createdAt}</span>
            </div>
        </li>
    )
}
