import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import teacherSchema from '../schemas/teacher'
import { storeAuthToken } from '../utils'

export default function Teacher() {
    const navigate = useNavigate()

    const teacherMutation = useMutation({
        mutationFn: (data) => {
            const { error, value: teacherData } = teacherSchema.validate(data)
            if (error) throw error

            return httpClient.post('/teacher', teacherData)
        },
    })

    const teacher = teacherMutation.data
    const tokenQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/auth/token')
        },
        onSuccess: (token) => {
            storeAuthToken(token)
            navigate('/')
        },
        enabled: !!teacher,
    })

    function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        teacherMutation.mutate(data)
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
                    Please provide your description.
                </p>
                {teacherMutation.error && (
                    <ErrorElement error={teacherMutation.error} />
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='username'>
                            Description
                        </label>
                        <textarea
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            name='description'
                            placeholder='Description'
                        />
                    </div>
                    <button className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
