import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    MessageContext,
    MessageDispatchContext,
} from '../context/MessageContext'
import SocketContext from '../context/SocketContext'
import { getUser } from '../utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import httpClient from '../config/axios'
import ImageUpload from '../components/ImageUpload'
import { toast } from 'react-toastify'
import {
    ChevronDoubleUpIcon,
    HandRaisedIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid'

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
    const [autoScroll, setAutoScroll] = useState(false)

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

    const oldMessageQuery = useQuery({
        queryFn: () => {
            return httpClient.get(
                `/message/${classId}/${receiverId}/${lastMessageId}`
            )
        },
        queryKey: ['lecturer', lastMessageId],
        staleTime: Infinity,
        onSuccess: (oldMessages) => {
            if (oldMessages.length) {
                messageDispatch({
                    type: 'ADD_OLD_MESSAGES',
                    payload: oldMessages,
                })
            }
        },

        enabled: !!lastMessageId,
    })

    const messageDeleteMutation = useMutation({
        mutationFn: (messageId) => {
            return httpClient.delete(`/message/${messageId}`)
        },
        onError: (e) => {
            toast.error(e.message)
        },
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

    function handleFetchOldMessages() {
        let newLastMessageId = filteredMessages
            .sort((a, b) => a.id - b.id)
            .at(0)?.id

        newLastMessageId = newLastMessageId ?? messages[messages.length - 1]?.id

        if (newLastMessageId !== lastMessageId) {
            setLastMessageId(newLastMessageId)
        }
    }

    useEffect(() => {
        if (boxRef.current && autoScroll) {
            boxRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

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
            <div className='px-8 py-4 shadow'>
                <h4 className='text-gray-700 text-lg'>Message</h4>
            </div>

            <div className='relative w-full p-3 overflow-y-scroll h-full'>
                <div className='mb-4 flex items-center justify-center'>
                    {oldMessageQuery.isFetching ? (
                        <span className='p-1 rounded-full shadow'>
                            <HandRaisedIcon className='h-6 w-6' />
                        </span>
                    ) : (
                        <button onClick={handleFetchOldMessages}>
                            <ChevronDoubleUpIcon className='h-6 w-6' />
                        </button>
                    )}
                </div>
                <ul className='space-y-1.5'>
                    {filteredMessages.map((message) => (
                        <MessageCard
                            key={message.id}
                            message={message}
                            onMessageDelete={messageDeleteMutation.mutate}
                        />
                    ))}
                </ul>
                <div ref={boxRef}></div>
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
                            onChange={(e) => {
                                setMessage(e.target.value)
                            }}
                            onFocus={() => {
                                if (!autoScroll) setAutoScroll(true)
                            }}
                            onBlur={() => {
                                if (autoScroll) setAutoScroll(false)
                            }}
                        />
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

function MessageCard({ message, onMessageDelete }) {
    const user = getUser()

    let style = 'relative max-w-xl rounded-xl shadow mt-2'

    style += user.id === message.senderId ? ' bg-blue-100' : ' bg-gray-100'

    const canDelete = getUser().id === message.senderId
    return (
        <li
            className={
                user.id === message.senderId
                    ? 'flex justify-end'
                    : 'flex justify-start'
            }
        >
            <div className={style}>
                <div className='px-4 py-2 flex items-center justify-between'>
                    <span className='text-xs'>{message.sender.name}</span>
                    {canDelete && (
                        <button onClick={() => onMessageDelete(message.id)}>
                            <XMarkIcon className='h-4 w-4' />
                        </button>
                    )}
                </div>
                <div className='px-4'>
                    <span className='block'>{message.content} </span>
                </div>
                {message.image && (
                    <img
                        className='w-64 rounded-lg object-cover object-center shadow-md'
                        src={message.image}
                    />
                )}
                <div className='px-4 py-2'>
                    <span className='text-xs'>{message.createdAt}</span>
                </div>
            </div>
        </li>
    )
}
