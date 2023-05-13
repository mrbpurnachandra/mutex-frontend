import { useMutation, useQuery } from '@tanstack/react-query'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import classSchema from '../schemas/class'
import Center from '../components/Center'
import Card from '../components/Card'
import useRefreshToken from '../hooks/useRefreshToken'

export default function CreateNewClass() {

    const classMutation = useMutation({
        mutationFn: (data) => {
            const { error, value: classData } = classSchema.validate(data)
            if (error) throw error

            return httpClient.post('/class', classData)
        },
    })

    const _class = classMutation.data
    const errorElem = useRefreshToken(!!_class)

    function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        classMutation.mutate(data)
    }

    if (errorElem) return errorElem

    return (
        <Center>
            <Card>
                <p className='text-gray-600 flex flex-col'>
                    <span>Please provide necessary details of your class.</span>
                    <span className='mt-4 text-sm text-gray-500'>
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
                    <button 
                    disabled={classMutation.isLoading}
                    className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 disabled:bg-blue-400'>
                        Create
                    </button>
                </form>
            </Card>
        </Center>
    )
}
