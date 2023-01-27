import { useMutation } from '@tanstack/react-query'
import Card from '../components/Card'
import Center from '../components/Center'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import teacherSchema from '../schemas/teacher'
import useRefreshToken from '../hooks/useRefreshToken'

export default function Teacher() {
    const teacherMutation = useMutation({
        mutationFn: (data) => {
            const { error, value: teacherData } = teacherSchema.validate(data)
            if (error) throw error

            return httpClient.post('/teacher', teacherData)
        },
    })

    const teacher = teacherMutation.data
    const errorElem = useRefreshToken(!!teacher)

    function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        teacherMutation.mutate(data)
    }

    if (errorElem) return errorElem
    return (
        <Center>
            <Card>
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
            </Card>
        </Center>
    )
}
