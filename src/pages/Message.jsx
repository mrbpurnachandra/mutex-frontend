import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    MessageContext,
    MessageDispatchContext,
} from '../context/MessageContext'
import SocketContext from '../context/SocketContext'
import { getUser } from '../utils'
import { useQuery } from '@tanstack/react-query'
import httpClient from '../config/axios'
import ImageUpload from '../components/ImageUpload'

export default function Message() {
    const user = getUser()
    const navigate = useNavigate()
    const { classId, receiverId } = useParams()

    const socket = useContext(SocketContext)
    const messages = useContext(MessageContext)
    const messageDispatch = useContext(MessageDispatchContext)

    const [message, setMessage] = useState('')
    const [messageImg, setMessageImg] = useState(null)
    const [lastMessageId, setLastMessageId] = useState(undefined)
    const boxRef = useRef(null)

    function filterMessages(messages) {
        const receiver = Number(receiverId)
        if (isNaN(receiver)) {
            return messages.filter((message) => message.receiverId === null)
        }

        if (user.student) {
            return messages.filter(
                (message) =>
                    message.receiverId === receiver ||
                    message.senderId === receiver
            )
        }

        return messages.filter((message) => message.classId === Number(classId))
    }

    const filteredMessages = filterMessages(messages)

    useQuery({
        queryFn: () => {
            return httpClient.get(
                `/message/${classId}/${receiverId}/${lastMessageId}`
            )
        },
        queryKey: ['lecturer', lastMessageId],
        refetchOnWindowFocus: false,
        onSuccess: (oldMessages) => {
            messageDispatch({
                type: 'ADD_OLD_MESSAGES',
                payload: oldMessages,
            })
        },

        enabled: !!lastMessageId,
    })

    function handleSubmit(e) {
        e.preventDefault()

        const payload = {
            content: message,
        }

        if (messageImg) {
            payload.image = messageImg
        }

        if (receiverId === 'home') {
            socket.emit('new_normal_message', payload)
        } else {
            socket.emit('new_special_message', {
                ...payload,
                classId,
                receiverId,
            })
        }

        setMessage('')
        setMessageImg(null)
    }

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight
        }
    })

    if (
        user.student &&
        (!user.student.enroll || user.student.enroll.status === 'pending')
    )
        return navigate('/', { replace: true })

    if (!socket) return <div>Loading...</div>

    return (
        <div className='flex flex-col h-full '>
            <div className='px-8 py-4 shadow'>
                <h4 className='text-gray-700 text-lg'>Message</h4>
            </div>

            <div
                className='relative w-full p-3 overflow-y-scroll h-full'
                ref={boxRef}
            >
                <div className='py-1 flex item-center justify-center'>
                    <button
                        type='button'
                        className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                        onClick={() => {
                            const lastMessageId = filteredMessages
                                .sort((a, b) => a.id - b.id)
                                .at(0)?.id
                            setLastMessageId(
                                lastMessageId ??
                                    messages[messages.length - 1].id
                            )
                        }}
                    >
                        More
                    </button>
                </div>
                <ul className='space-y-1.5'>
                    {filteredMessages.map((message) => (
                        <MessageCard key={message.id} message={message} />
                    ))}
                </ul>
            </div>

            <div className='w-full p-3 border-t border-gray-300'>
                {messageImg && (
                    <div>
                        <img
                            className='w-24 max-h-24 rounded-lg object-cover object-center shadow-lg'
                            src={messageImg}
                        />
                    </div>
                )}
                <div className=' flex items-center justify-between '>
                    <div className='w-24'>
                        <ImageUpload onImageChange={setMessageImg} />
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className='flex-1 flex items-center justify-between '
                    >
                        <input
                            type='text'
                            placeholder='Message'
                            className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
                            name='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
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

function MessageCard({ message }) {
    const user = getUser()

    let style = 'relative max-w-xl px-4 py-2 rounded-lg shadow'

    style +=
        user.id === message.senderId
            ? 'text-gray-800 bg-gray-200'
            : 'text-gray-50 bg-blue-700'

    return (
        <li
            className={
                user.id === message.senderId
                    ? 'flex justify-end'
                    : 'flex justify-start'
            }
        >
            <div className={style}>
                <span className='text-xs'>{message.sender.name}</span>
                <span className='block'>{message.content} </span>
                {message.image && (
                    <img
                        className='w-64 rounded-lg object-cover object-center shadow-md'
                        src={message.image}
                    />
                )}
                <span className='text-xs'>{message.createdAt}</span>
            </div>
        </li>
    )
}
