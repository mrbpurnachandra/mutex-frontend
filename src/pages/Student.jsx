import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import { storeAuthToken } from '../utils'

export default function Student() {
    const navigate = useNavigate()
    const studentMutation = useMutation({
        mutationFn: () => {
            return httpClient.post('/student')
        },
    })

    const student = studentMutation.data
    const tokenQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/auth/token')
        },
        onSuccess: (token) => {
            storeAuthToken(token)
            navigate('/')
        },
        enabled: !!student,
    })

    function handleSubmit(e) {
        e.preventDefault()
        studentMutation.mutate()
    }

    if (tokenQuery.isFetching)
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <div className='-mt-24 w-80 px-4 py-4 max-w-sm'>
                    <p className='text-gray-700'>Refreshing auth token...</p>
                </div>
            </div>
        )

    if (tokenQuery.isError) return <ErrorElement error={tokenQuery.error} />

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='-mt-24 w-80 px-4 py-4 max-w-sm'>
                <p className='text-gray-700'>
                    Do you really want to register as student?
                </p>
                {studentMutation.error && (
                    <ErrorElement error={studentMutation.error} />
                )}
                <form onSubmit={handleSubmit}>
                    <button className='mt-4 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'>
                        Continue
                    </button>
                </form>
            </div>
        </div>
    )
}
