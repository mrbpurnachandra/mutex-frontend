import { useMutation, useQueryClient } from '@tanstack/react-query'
import httpClient from '../config/axios'
import { getUser } from '../utils'
import ErrorElement from './ErrorElement'

export default function StudentCard({ enroll }) {
    const student = enroll.student

    return (
        <div className='mt-4 border px-4 py-4 rounded'>
            <div className='leading-tight'>
                <h3 className='font-semibold text-gray-800'>
                    {student.user.name}
                </h3>
                <span className='text-sm text-gray-700'>
                    @{student.user.username}
                </span>
            </div>

            {enroll.status === 'pending' && (
                <EnrollAcceptOrRejectForm enroll={enroll} />
            )}

            {enroll.status === 'approved' && (
                <ApprovedManagementForm enroll={enroll} />
            )}
        </div>
    )
}

function ApprovedManagementForm({ enroll }) {
    const queryClient = useQueryClient()

    // It is sure that user is cr
    const user = getUser()

    const enrollDeleteMutation = useMutation({
        mutationFn: () => {
            return httpClient.delete(`/enroll/${enroll.id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enrolls'] })
        },
    })

    const vcrMutation = useMutation({
        mutationFn: (vcrId) => {
            return httpClient.post('/class/vcr', { vcrId })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enrolls'] })
        },
    })

    function handleStudentRemoval() {
        enrollDeleteMutation.mutate()
    }

    function handleAddVCR() {
        vcrMutation.mutate(enroll.studentId)
    }

    function handleRemoveVCR() {
        vcrMutation.mutate(user.student.id)
    }

    if (enroll.student.crOf) return null

    if (enroll.student.vcrOf)
        return (
            <div className='mt-4'>
                {vcrMutation.error && (
                    <div className='my-2'>
                        <ErrorElement error={vcrMutation.error} />
                    </div>
                )}
                <button
                    className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-red-600 outline-none hover:bg-red-500 focus:ring-2 focus:ring-red-600'
                    onClick={handleRemoveVCR}
                >
                    <span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                            />
                        </svg>
                    </span>
                    <span>Remove VCR</span>
                </button>
            </div>
        )

    return (
        <div>
            {enrollDeleteMutation.error && (
                <div className='my-2'>
                    <ErrorElement error={enrollDeleteMutation.error} />
                </div>
            )}
            {vcrMutation.error && (
                <div className='my-2'>
                    <ErrorElement error={vcrMutation.error} />
                </div>
            )}
            <div className='mt-4 flex space-x-4'>
                <button
                    className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-red-600 outline-none hover:bg-red-500 focus:ring-2 focus:ring-red-600'
                    onClick={handleStudentRemoval}
                >
                    <span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                            />
                        </svg>
                    </span>
                    <span>Remove</span>
                </button>
                <button
                    className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'
                    onClick={handleAddVCR}
                >
                    <span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 6v12m6-6H6'
                            />
                        </svg>
                    </span>
                    <span>Add VCR</span>
                </button>
            </div>
        </div>
    )
}

function EnrollAcceptOrRejectForm({ enroll }) {
    const queryClient = useQueryClient()

    const enrollAcceptMutation = useMutation({
        mutationFn: () => {
            return httpClient.post(`/enroll/${enroll.id}/approve`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enrolls'] })
        },
    })

    const enrollDeleteMutation = useMutation({
        mutationFn: () => {
            return httpClient.delete(`/enroll/${enroll.id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enrolls'] })
        },
    })

    function handleStudentRemoval() {
        enrollDeleteMutation.mutate()
    }

    function handleRequestApproval() {
        enrollAcceptMutation.mutate()
    }
    return (
        <div className='mt-4'>
            {enrollAcceptMutation.error && (
                <div className='my-2'>
                    <ErrorElement error={enrollAcceptMutation.error} />
                </div>
            )}
            {enrollDeleteMutation.error && (
                <div className='my-2'>
                    <ErrorElement error={enrollDeleteMutation.error} />
                </div>
            )}
            <div className='flex space-x-4'>
                <button
                    className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-red-600 outline-none hover:bg-red-500 focus:ring-2 focus:ring-red-600'
                    onClick={handleStudentRemoval}
                >
                    <span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                            />
                        </svg>
                    </span>
                    <span>Remove</span>
                </button>
                <button
                    className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'
                    onClick={handleRequestApproval}
                >
                    <span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 6v12m6-6H6'
                            />
                        </svg>
                    </span>
                    <span>Accept</span>
                </button>
            </div>
        </div>
    )
}
