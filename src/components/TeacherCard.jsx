import { useMutation, useQueryClient } from '@tanstack/react-query'
import httpClient from '../config/axios'
import lectureSchema from '../schemas/lecture'
import ErrorElement from './ErrorElement'
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid'

export default function TeacherCard({ teacher, showForm, lectureId }) {
    return (
        <div className='mt-4 border px-4 py-4 rounded'>
            <div className='leading-tight'>
                <h3 className='font-semibold text-gray-800'>
                    {teacher.user.name}
                </h3>
                <span className='text-sm text-gray-700'>
                    @{teacher.user.username}
                </span>
            </div>
            <div className='mt-4'>
                <p className='text-sm text-gray-600'>{teacher.description}</p>
            </div>

            {showForm && <NewTeacherForm teacher={teacher} />}
            {lectureId && <DeleteTeacherForm lectureId={lectureId} />}
        </div>
    )
}

function NewTeacherForm({ teacher }) {
    const queryClient = useQueryClient()

    const lectureMutation = useMutation({
        mutationFn: (data) => {
            const { error, value: lectureData } = lectureSchema.validate(data)
            if (error) throw error

            return httpClient.post('/lecture', lectureData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lecturer'] })
        },
    })

    function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))

        lectureMutation.mutate(data)
    }

    return (
        <div className='mt-4'>
            <div className='my-2'>
                {lectureMutation.error && (
                    <ErrorElement error={lectureMutation.error} />
                )}
            </div>
            <form className='flex space-x-2' onSubmit={handleSubmit}>
                <input type='hidden' name='teacherId' value={teacher.id} />
                <div>
                    <label className='sr-only' htmlFor='subject'>
                        Subject
                    </label>
                    <input
                        className='border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                        type='text'
                        name='subject'
                        placeholder='Subject'
                    />
                </div>
                <button className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'>
                    <span>
                        <PlusIcon className='h-6 w-6' />
                    </span>
                    <span>Add</span>
                </button>
            </form>
        </div>
    )
}

function DeleteTeacherForm({ lectureId }) {
    const queryClient = useQueryClient()

    const lectureMutation = useMutation({
        mutationFn: () => {
            return httpClient.delete(`/lecture/${lectureId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lecturer'] })
        },
    })

    function handleSubmit(e) {
        e.preventDefault()
        lectureMutation.mutate()
    }
    return (
        <div className='mt-4'>
            {lectureMutation.error && (
                <div className='my-2'>
                    <ErrorElement error={lectureMutation.error} />
                </div>
            )}
            <form className='flex space-x-2' onSubmit={handleSubmit}>
                <button className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-red-600 outline-none hover:bg-red-500 focus:ring-2 focus:ring-red-600'>
                    <span>
                    <TrashIcon className='h-6 w-6'/>
                    </span>
                    <span>Remove</span>
                </button>
            </form>
        </div>
    )
}
