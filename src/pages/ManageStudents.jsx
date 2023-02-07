import { useQuery } from '@tanstack/react-query'
import ErrorElement from '../components/ErrorElement'
import StudentCard from '../components/StudentCard'
import httpClient from '../config/axios'

export default function ManageStudents() {
    const enrollsQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/enroll')
        },
        queryKey: ['enrolls'],
        refetchOnWindowFocus: false,
    })

    if (enrollsQuery.isLoading) return <div>Loading...</div>
    if (enrollsQuery.error) return <ErrorElement error={enrollsQuery.error} />
    return (
        <div>
            <div className='px-8 py-4 shadow'>
                <h4 className='text-gray-700 text-lg'>Manage Students</h4>
            </div>
            <div className='px-8'>
                {enrollsQuery.data.map((enroll) => (
                    <StudentCard key={enroll.id} enroll={enroll} />
                ))}
            </div>
        </div>
    )
}
