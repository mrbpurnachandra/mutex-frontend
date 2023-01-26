import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import httpClient from '../config/axios'
import enrollSchema from '../schemas/enroll'
import { storeAuthToken } from '../utils'

export default function JoinExistingClass() {
    const navigate = useNavigate()
    
    const enrollMutate = useMutation({
        mutationFn: (data) => {
            const {error, value: enrollData} = enrollSchema.validate(data)
            if(error) throw error

            return httpClient.post('/enroll', enrollData)
        }
    })

    const enroll = enrollMutate.data
    const tokenQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/auth/token')
        },
        onSuccess: (token) => {
            storeAuthToken(token)
            navigate('/')
        },
        enabled: !!enroll,
    })


    const classQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/class')
        },
        queryKey: ['class'],
    })

    function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        enrollMutate.mutate(data)
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
            <div className='-mt-24'>
                <p className='text-gray-700 flex flex-col'>
                    <span>Please select the class that you want to join. </span>
                    <span className='text-xs text-gray-600'>
                        Make sure to confirm your class by your CR's username
                    </span>
                </p>
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='username'>
                            Classes
                        </label>
                        <select
                            name='classId'
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                        >
                            {classQuery.isLoading && (
                                <option>Loading...</option>
                            )}
                            {classQuery.data && classQuery.data.map(_class => {
                                return <option value={_class.id} key={_class.id}>{_class.name}@{_class.cr.user.username}</option>
                            })}
                        </select>
                    </div>
                    <button className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'>
                        Send Join Request
                    </button>
                </form>
            </div>
        </div>
    )
}
