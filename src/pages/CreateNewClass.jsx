import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import { storeAuthToken } from '../utils'
import classSchema from '../schemas/class'

export default function CreateNewClass() {
    const navigate = useNavigate()

    const classMutation = useMutation({
        mutationFn: (data) => {
            const { error, value: classData } = classSchema.validate(data)
            if (error) throw error

            return httpClient.post('/class', classData)
        },
    })

    const _class = classMutation.data
    const tokenQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/auth/token')
        },
        onSuccess: (token) => {
            storeAuthToken(token)
            navigate('/')
        },
        enabled: !!_class,
    })

    function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        classMutation.mutate(data)
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
                <p className='text-gray-700 flex flex-col'>
                    <span>Please provide necessary details of your class.</span>
                    <span className='text-xs'>
                        By creating a new class you'll be CR and VCR of that
                        class. For now you'll be incharge of class for lifetime.
                        Please be responsible for your class.
                    </span>
                </p>
                {classMutation.error && (
                    <ErrorElement error={classMutation.error} />
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='name'>
                            Name
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='text'
                            name='name'
                            placeholder='Name'
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            name='description'
                            placeholder='Description'
                        />
                    </div>
                    <button className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'>
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}
