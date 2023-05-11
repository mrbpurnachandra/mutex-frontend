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
import { XMarkIcon } from '@heroicons/react/20/solid'

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

        enabled: !!lastMessageId && boxRef.current.scrollTop === 0,
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
        boxRef.current.scrollTop = boxRef.current.scrollHeight
    }

    function onMessagesScroll() {
        if (boxRef.current.scrollTop === 0) {
            const lastMessageId = filteredMessages
                .sort((a, b) => a.id - b.id)
                .at(0)?.id
            setLastMessageId(lastMessageId ?? messages[messages.length - 1].id)
        }
    }

    useEffect(() => {
        if (boxRef.current) {
            const shouldBeScrolled =
                Math.abs(
                    boxRef.current.scrollHeight -
                        boxRef.current.clientHeight -
                        boxRef.current.scrollTop
                ) < 500
            if (shouldBeScrolled) {
                boxRef.current.scrollTop = boxRef.current.scrollHeight
            }
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
                onScroll={onMessagesScroll}
            >
                <ul className='space-y-1.5'>
                    {filteredMessages.map((message) => (
                        <MessageCard
                            key={message.id}
                            message={message}
                            onMessageDelete={messageDeleteMutation.mutate}
                        />
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

    let style = 'relative max-w-xl px-4 py-2 rounded-lg shadow'

    style +=
        user.id === message.senderId
            ? 'text-gray-800 bg-gray-200'
            : 'text-gray-50 bg-blue-700'

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
                <div className='py-2 flex items-center justify-between'>
                    <span className='text-xs'>{message.sender.name}</span>
                    {canDelete && (
                        <button onClick={() => onMessageDelete(message.id)}>
                           <XMarkIcon className='h-4 w-4'/>
                        </button>
                    )}
                </div>
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
