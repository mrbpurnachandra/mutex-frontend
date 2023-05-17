import Card from '../components/Card'
import Center from '../components/Center'
import { useMutation, useQuery } from '@tanstack/react-query'
import httpClient from '../config/axios'
import ErrorElement from '../components/ErrorElement'
import { toast } from 'react-toastify'
import useRefreshToken from '../hooks/useRefreshToken'
import LogoutButton from '../components/LogoutButton'

export default function VerifyAccount() {

    const { error, mutate, isLoading, data } = useMutation(
        (userData) => {
            return httpClient.post('/auth/verify', userData)
        }
    )

    function handleSubmit(e) {
        e.preventDefault()
        const userData = Object.fromEntries(new FormData(e.target))
        mutate(userData)
    }

    const resendTokenMutation = useMutation({
        mutationFn: () => {
            return httpClient.post('/auth/resend-token')
        },
        mutationKey: ['token'],
        enabled: false,
        onError: () => {
            toast.error('Something went wrong')
        },

        onSuccess: () => {
            toast.success('Token Sent')
        },
    })
    console.log(data)

    const errorElem = useRefreshToken(!!data)
    if (errorElem) return errorElem
    return (
        <Center>
            <Card>
                <p className='text-gray-800'>
                    Please enter the verification token sent to your email.
                </p>
                {error && <ErrorElement error={error} />}
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='token'>
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
                        disabled={isLoading || resendTokenMutation.isLoading}
                        className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 disabled:bg-blue-400'
                    >
                        Verify
                    </button>
                </form>
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={resendTokenMutation.mutate}
                        className='text-sm text-gray-600 underline'
                    >
                        Resend Token
                    </button>
                    <LogoutButton className='text-sm text-gray-600 underline' />
                </div>
            </Card>
        </Center>
    )
}
