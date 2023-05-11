import { useMutation, useQueryClient } from '@tanstack/react-query'
import httpClient from '../config/axios'
import { getUser } from '../utils'
import ErrorElement from './ErrorElement'
import { PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'

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
                        <TrashIcon className='h-6 w-6' />
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
                        <TrashIcon className='h-6 w-6' />
                    </span>
                    <span>Remove</span>
                </button>
                <button
                    className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'
                    onClick={handleAddVCR}
                >
                    <span>
                        <PlusIcon className='h-6 w-6' />
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
                        <TrashIcon className='h-6 w-6' />
                    </span>
                    <span>Remove</span>
                </button>
                <button
                    className='flex items-center space-x-2 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'
                    onClick={handleRequestApproval}
                >
                    <span>
                    <PlusIcon className='h-6 w-6'/>
                       
                    </span>
                    <span>Accept</span>
                </button>
            </div>
        </div>
    )
}
