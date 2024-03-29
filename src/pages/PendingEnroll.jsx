import { useMutation, useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import Center from '../components/Center'
import LogoutButton from '../components/LogoutButton'
import httpClient from '../config/axios'
import ErrorElement from '../components/ErrorElement'
import useRefreshToken from '../hooks/useRefreshToken'
import { getUser, storeAuthToken } from '../utils'
import { useNavigate } from 'react-router-dom'

export default function PendingEnroll() {
    const user = getUser()
    const navigate = useNavigate()

    const enrollMutation = useMutation({
        mutationFn: () => {
            return httpClient.post(`/enroll/${user.student?.enroll?.id}/cancel`)
        },
    })

    const deletedEnroll = enrollMutation.data
    const errorElem = useRefreshToken(!!deletedEnroll)

    function handleSubmit(e) {
        e.preventDefault()
        enrollMutation.mutate()
    }

    const tokenQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/auth/token')
        },
        onSuccess: (token) => {
            storeAuthToken(token)
            return navigate('/', { replace: true, state: 2 })
        },
        queryKey: ['token'],
        enabled: false,
    })

    if (errorElem) return errorElem

    return (
        <Center>
            <Card>
                <p className='flex flex-col space-y-2 text-gray-700'>
                    <span>
                        Your join request to class{' '}
                        <strong>{user.student.enroll?.class?.name}</strong> is
                        pending.
                    </span>
                    <span className='text-sm text-gray-500'>
                        You can either cancel the request or wait until it is
                        approved by your CR.
                    </span>
                </p>
                {enrollMutation.error && (
                    <ErrorElement error={enrollMutation.error} />
                )}
                <div className='mt-8 flex space-x-4'>
                    <button
                        disabled={tokenQuery.isFetching}
                        onClick={tokenQuery.refetch}
                        className='border border-transparent rounded-md px-4 py-2 text-gray-800 font-semibold leading-tight text-sm bg-gray-300 outline-none hover:bg-gray-300 focus:ring-2 focus:gray-300 disabled:cursor-not-allowed'
                    >
                        Refresh
                    </button>
                    <form onSubmit={handleSubmit}>
                        <button className='border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-red-600 outline-none hover:bg-red-500 focus:ring-2 focus:ring-red-600'>
                            Cancel Request
                        </button>
                    </form>
                </div>
                <div className='mt-4'>
                    <LogoutButton className='text-gray-800 text-sm underline outline-none' />
                </div>
            </Card>
        </Center>
    )
}
