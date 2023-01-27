import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Center from '../components/Center'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import { storeAuthToken } from '../utils'

export default function useRefreshToken(condition) {
    const navigate = useNavigate()

    const tokenQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/auth/token')
        },
        onSuccess: (token) => {
            storeAuthToken(token)
            return navigate('/', { replace: true, state: 2 })
        },
        queryKey: ['token'],
        enabled: condition,
    })

    if (tokenQuery.isFetching)
        return (
            <Center>
                <Card>
                    <p className='text-gray-700'>Refreshing auth token...</p>
                </Card>
            </Center>
        )

    if (tokenQuery.isError)
        return (
            <Center>
                <Card>
                    <ErrorElement error={tokenQuery.error} />
                </Card>
            </Center>
        )
}
