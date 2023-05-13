import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SocketContext from '../context/SocketContext'
import { getUser } from '../utils'
import { AnnouncementContext, AnnouncementDispatchContext } from '../context/AnnouncementContext'
import { useQuery } from '@tanstack/react-query'
import httpClient from '../config/axios'
import ErrorElement from '../components/ErrorElement'
import ImageUpload from '../components/ImageUpload'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import {
    AcademicCapIcon,
    CheckIcon,
    ChevronDoubleUpIcon,
    ChevronUpDownIcon,
    HandRaisedIcon,
    MegaphoneIcon,
} from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'

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
    const announcementDispatch = useContext(AnnouncementDispatchContext)

    const classes = lecturerQuery.data?.map((lecture) => ({
        id: lecture.classId,
        name: lecture.class.name,
    }))

    const [announcement, setAnnouncement] = useState('')
    const [announcementImg, setAnnouncementImg] = useState(null)
    const [_class, setClass] = useState(null)
    const [lastAnnouncementId, setLastAnnouncementId] = useState(undefined)
    const [autoScroll, setAutoScroll] = useState(false)

    const boxRef = useRef(null)

    const oldAnnouncementQuery = useQuery({
        queryFn: () => {
            return httpClient.get(`/announcement/old/${lastAnnouncementId}`)
        },
        queryKey: ['old_announcements', lastAnnouncementId],
        staleTime: Infinity,
        onSuccess: (oldAnnouncements) => {
            if (oldAnnouncements.length) {
                announcementDispatch({
                    type: 'ADD_OLD_ANNOUNCEMENTS',
                    payload: oldAnnouncements,
                })
            }
        },

        enabled: !!lastAnnouncementId,
    })

    function handleSubmit(e) {
        e.preventDefault()

        if (user.teacher && !_class) {
            toast.error('select class')
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
                (_class && Number(_class.id)) ?? user.student.enroll.classId,
        })

        setAnnouncement('')
        setAnnouncementImg(null)
    }

    function handleFetchOldAnnouncements() {
        let newLastAnnouncementId = announcements
            .sort((a, b) => a.id - b.id)
            .at(0)?.id

        if (newLastAnnouncementId !== lastAnnouncementId) {
            setLastAnnouncementId(newLastAnnouncementId)
        }
    }

    useEffect(() => {
        if (boxRef.current && autoScroll) {
            boxRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [announcements])

    if (lecturerQuery.isLoading)
        return (
            <div className='px-4 py-2 text-gray-800'>
                <HandRaisedIcon className='h-6 w-6' />
            </div>
        )
    if (lecturerQuery.error) return <ErrorElement error={lecturerQuery.error} />

    if (
        user.student &&
        (!user.student.enroll || user.student.enroll.status === 'pending')
    )
        return navigate('/', { replace: true })

    if (!socket)
        return (
            <div>
                <HandRaisedIcon className='h-6 w-6' />
            </div>
        )

    return (
        <div className='flex flex-col h-full '>
            <div className='flex space-x-4 items-center px-8 py-4 shadow'>
                <h4 className='text-gray-700 text-lg'>Announcements</h4>
                {_class && (
                    <p className='flex items-center space-x-2 font-xs text-gray-600'>
                        <span>{_class.name}</span>
                        <span>
                            <MegaphoneIcon className='h-6 w-6' />
                        </span>
                    </p>
                )}
            </div>

            <div className='relative w-full p-3 overflow-y-scroll h-full'>
                <div className='mb-4 flex items-center justify-center'>
                    {oldAnnouncementQuery.isFetching ? (
                        <span className='p-1 rounded-full shadow'>
                            <HandRaisedIcon className='h-6 w-6' />
                        </span>
                    ) : (
                        <button onClick={handleFetchOldAnnouncements}>
                            <ChevronDoubleUpIcon className='h-6 w-6' />
                        </button>
                    )}
                </div>

                <ul className='space-y-1.5'>
                    {announcements.map((announcement) => (
                        <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                        />
                    ))}
                </ul>
                <div ref={boxRef}></div>
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
                            onFocus={() => {
                                if (!autoScroll) setAutoScroll(true)
                            }}
                            onBlur={() => {
                                if (autoScroll) setAutoScroll(false)
                            }}
                        />
                        {user.teacher && Boolean(classes?.length) && (
                            <ClassSelection
                                classes={classes}
                                onClassSelect={setClass}
                            />
                        )}
                        <button
                            type='submit'
                            className='border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'
                        >
                            Send
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
            <div className='relative max-w-xl mt-2 rounded-xl shadow bg-gray-100'>
                <div className='px-4 py-2 flex items-center justify-between'>
                    <span className='text-xs'>{announcement.user.name}</span>
                </div>
                <div className='px-4'>
                    <span className='block'>{announcement.content} </span>
                </div>
                {announcement.image && (
                    <img
                        className='w-64 rounded-lg object-cover object-center shadow-md'
                        src={announcement.image}
                    />
                )}
                <div className='px-4 py-2'>
                    <span className='text-xs'>{announcement.createdAt}</span>
                </div>
            </div>
        </li>
    )
}

function ClassSelection({ classes, onClassSelect }) {
    let [selected, setSelected] = useState(classes[0])
    let [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                type='button'
                onClick={() => setIsOpen(true)}
                className='mx-8 p-1 rounded-full'
            >
                <AcademicCapIcon className='h-6 w-6' />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={() => setIsOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-gray-900'
                                    >
                                        Select class
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-500'>
                                            You should select class before
                                            making new announcement.
                                        </p>
                                    </div>

                                    <div className='my-4'>
                                        <Listbox
                                            value={selected}
                                            onChange={setSelected}
                                        >
                                            <div className='relative mt-1'>
                                                <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                                                    <span className='block truncate'>
                                                        {selected.name}
                                                    </span>
                                                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                                        <ChevronUpDownIcon
                                                            className='h-5 w-5 text-gray-400'
                                                            aria-hidden='true'
                                                        />
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave='transition ease-in duration-100'
                                                    leaveFrom='opacity-100'
                                                    leaveTo='opacity-0'
                                                >
                                                    <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                                        {classes.map((c) => (
                                                            <Listbox.Option
                                                                key={c.id}
                                                                className={({
                                                                    active,
                                                                }) =>
                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active
                                                                            ? 'bg-amber-100 text-amber-900'
                                                                            : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={c}
                                                            >
                                                                {({
                                                                    selected,
                                                                }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block truncate ${
                                                                                selected
                                                                                    ? 'font-medium'
                                                                                    : 'font-normal'
                                                                            }`}
                                                                        >
                                                                            {
                                                                                c.name
                                                                            }
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                                                                <CheckIcon
                                                                                    className='h-5 w-5'
                                                                                    aria-hidden='true'
                                                                                />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>

                                    <div className='mt-4'>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={() => {
                                                onClassSelect(selected)
                                                setIsOpen(false)
                                            }}
                                        >
                                            Select
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
