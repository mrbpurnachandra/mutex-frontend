import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../utils'

export default function Message() {
    const user = getUser()
    const navigate = useNavigate()
    const { classId, receiverId } = useParams()

    const [message, setMessage] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        console.log({
            message,
            classId,
            receiverId: Number(receiverId),
        })
    }

    if (
        user.student &&
        (!user.student.enroll || user.student.enroll.status === 'pending')
    )
        return navigate('/', { replace: true })

    return (
        <div className='flex flex-col h-full '>
            <div className='px-8 py-4 shadow'>
                <h4 className='text-gray-700 text-lg'>Message</h4>
            </div>
            <div className='relative w-full p-3 overflow-y-scroll h-full'>
                <ul className='space-y-1.5'>
                    <MessageCard />
                </ul>
            </div>

            <div className='w-full p-3 border-t border-gray-300'>
                <form
                    onSubmit={handleSubmit}
                    className=' flex items-center justify-between '
                >
                    <input
                        type='text'
                        placeholder='Message'
                        className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
                        name='message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
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
    )
}

function MessageCard() {
    return (
        <li className='flex justify-start'>
            <div className='relative max-w-xl px-4 py-2 text-white rounded-lg bg-blue-700 shadow '>
                <span className='text-xs'>CR</span>
                <span className='block'>Good morning </span>
                <span className='text-xs text-gray-300'>11:20</span>
            </div>
        </li>
    )
}
