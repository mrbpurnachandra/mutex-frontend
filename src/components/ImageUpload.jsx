import { useRef, useState } from 'react'
import { storage } from '../config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    HandRaisedIcon,
    PhotoIcon,
} from '@heroicons/react/20/solid'

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
                    <HandRaisedIcon className='h-6 w-6' />
                </span>
            ) : status === 'error' ? (
                <button
                    className='p-1 rounded-full text-red-600'
                    onClick={() => setStatus('idle')}
                >
                    <ExclamationCircleIcon className='h-6 w-6' />
                </button>
            ) : status === 'success' ? (
                <button
                    className='p-1 rounded-full text-green-600'
                    onClick={() => setStatus('idle')}
                >
                    <CheckCircleIcon className='h-6 w-6' />
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
                        <PhotoIcon className='h-6 w-6' />
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
