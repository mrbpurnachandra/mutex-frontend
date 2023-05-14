import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Center from '../components/Center'
import { useMutation } from '@tanstack/react-query'
import httpClient from '../config/axios'
import ErrorElement from '../components/ErrorElement'

export default function ForgotPassword() {
    const navigate = useNavigate()

    const { error, mutate, isLoading } = useMutation(
        (userData) => {
            return httpClient.post('/auth/forgot-password', userData)
        },
        {
            onSuccess: () => {
                return navigate('/change-password', { replace: true })
            },
        }
    )

    function handleSubmit(e) {
        e.preventDefault()
        const userData = Object.fromEntries(new FormData(e.target))
        mutate(userData)
    }

    return (
        <Center>
            <Card>
                <p className='text-gray-800'>
                    Provide your username so that we could send you email for
                    changing your password!
                </p>
                {error && <ErrorElement error={error} />}
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='text'
                            name='username'
                            placeholder='username'
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 disabled:bg-blue-400'
                    >
                        Send Email
                    </button>
                </form>
            </Card>
        </Center>
    )
}
