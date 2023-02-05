import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ErrorElement from '../components/ErrorElement'
import TeacherCard from '../components/TeacherCard'
import httpClient from '../config/axios'

export default function ManageTeachers() {
    const lecturerQuery = useQuery({
        queryFn: () => {
            return httpClient.get('/lecture')
        },
        queryKey: ['lecturer'],
        refetchOnWindowFocus: false,
    })

    if (lecturerQuery.isLoading) return <div>Loading...</div>
    if (lecturerQuery.error) return <ErrorElement error={lecturerQuery.error} />

    let lecturers = []
    if (lecturerQuery.data) {
        lecturers = lecturerQuery.data.map((lecturer) => lecturer.teacherId)
    }

    return (
        <div>
            <div className='px-8 py-4 shadow'>
                <h4 className='text-gray-700 text-lg'>Manage Teachers</h4>
            </div>
            <div>
                <TeacherSearchBox lecturers={lecturers} />
            </div>
            <div className='mt-8 px-8 py-8 border-t-2'>
                <h2 className='font-semibold text-lg text-gray-800'>
                    Teachers in your class
                </h2>
                <div className='mt-4'>
                    {lecturerQuery.data &&
                        lecturerQuery.data.map((lecturer) => (
                            <TeacherCard
                                key={lecturer.id}
                                teacher={lecturer.teacher}
                                showForm={false}
                                lectureId={lecturer.id}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

function TeacherSearchBox({ lecturers }) {
    const [searchString, setSearchString] = useState('')

    const teachersQuery = useQuery({
        queryFn: () => {
            return httpClient.get(`/teacher?search=${searchString}`)
        },
        queryKey: ['searchTeacher', searchString],
        refetchOnWindowFocus: false,
        enabled: !!searchString,
    })

    function handleSubmit(e) {
        e.preventDefault()
        const { teacherName } = Object.fromEntries(new FormData(e.target))
        setSearchString(teacherName)
    }
    return (
        <div>
            <div className='px-8 py-4 bg-gray-200'>
                <form className='flex space-x-4' onSubmit={handleSubmit}>
                    <div className='flex-1'>
                        <label className='sr-only' htmlFor='search'>
                            Teacher Name
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='text'
                            name='teacherName'
                            placeholder='Search teachers by name'
                        />
                    </div>
                    <button className='border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'>
                        Search
                    </button>
                </form>
            </div>
            <div className='px-8'>
                {teachersQuery.isFetching && <p>Loading...</p>}
                {teachersQuery.error && (
                    <ErrorElement error={teachersQuery.error} />
                )}
                {teachersQuery.data &&
                    teachersQuery.data.map((teacher) => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            showForm={lecturers.indexOf(teacher.id) < 0}
                        />
                    ))}
            </div>
        </div>
    )
}
