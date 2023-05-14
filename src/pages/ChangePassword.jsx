import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Center from '../components/Center'
import { useMutation } from '@tanstack/react-query'
import httpClient from '../config/axios'
import ErrorElement from '../components/ErrorElement'

export default function ChangePassword() {
    const navigate = useNavigate()

    const { error, mutate, isLoading } = useMutation(
        (userData) => {
            return httpClient.post('/auth/change-password', userData)
        },
        {
            onSuccess: () => {
                return navigate('/login', { replace: true })
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
                <p className='text-gray-800'>Please choose strong password!</p>
                <p className='text-gray-600 text-sm'>
                    If the process succeeds you will be redirected to login
                    page.
                    <span>Please check you email for token.</span>
                </p>
                {error && <ErrorElement error={error} />}
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='username'>
                            New Password
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='password'
                            name='password'
                            placeholder='new password'
                        />
                    </div>

                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='username'>
                            Token
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='text'
                            name='token'
                            placeholder='token'
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 disabled:bg-blue-400'
                    >
                        Change Password
                    </button>
                </form>
            </Card>
        </Center>
    )
}
