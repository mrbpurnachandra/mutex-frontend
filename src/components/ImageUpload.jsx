import { useRef, useState } from 'react'
import { storage } from '../config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

export default function ImageUpload({ onImageChange }) {
    const [status, setStatus] = useState('idle')
    const imgRef = useRef(null)

    async function onImageSelected(e) {
        try {
            const file = e.target.files[0]
            const memeType = file.type
            const regex = /image\/(jpg|jpeg|png|gif)$/
            if (!regex.test(memeType)) {
                alert('Select valid image')
                return
            }

            setStatus('loading')
            const storageRef = ref(storage, `image/${file.name}-${v4()}`)
            await uploadBytes(storageRef, file)

            const imageUrl = await getDownloadURL(storageRef)
            onImageChange(imageUrl)
            setStatus('success')
        } catch (e) {
            setStatus('error')
        }
    }

    return (
        <>
            {status === 'loading' ? (
                <span className='inline-block p-1 rounded-full'>
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
                            d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                        />
                    </svg>
                </span>
            ) : status === 'error' ? (
                <button
                    className='p-1 rounded-full text-red-600'
                    onClick={() => setStatus('idle')}
                >
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
                            d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                        />
                    </svg>
                </button>
            ) : status === 'success' ? (
                <button
                    className='p-1 rounded-full text-green-600'
                    onClick={() => setStatus('idle')}
                >
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
                            d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                </button>
            ) : (
                <>
                    <button
                        className='p-1 rounded-full'
                        onClick={() => {
                            if (imgRef.current) {
                                imgRef.current.click()
                            }
                        }}
                    >
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
                                d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                            />
                        </svg>
                    </button>
                    <input
                        type='file'
                        onChange={onImageSelected}
                        ref={imgRef}
                        hidden
                    />
                </>
            )}
        </>
    )
}
