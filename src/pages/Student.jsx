import { useMutation, useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import Center from '../components/Center'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import useRefreshToken from '../hooks/useRefreshToken'

export default function Student() {
    const studentMutation = useMutation({
        mutationFn: () => {
            return httpClient.post('/student')
        },
    })

    const student = studentMutation.data
    const errorElem = useRefreshToken(!!student)

    function handleSubmit(e) {
        e.preventDefault()
        studentMutation.mutate()
    }

    if (errorElem) return errorElem

    return (
        <Center>
            <Card>
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
            </Card>
        </Center>
    )
}
