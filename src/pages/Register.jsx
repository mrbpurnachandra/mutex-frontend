import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Center from '../components/Center'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import userSchema from '../schemas/user'

export default function Register() {
    const navigate = useNavigate()

    const { data, error, isLoading, mutate } = useMutation(
        (userData) => {
            const { error, value: data } = userSchema.validate(userData)
            if (error) throw error
            return httpClient.post('/user/', data)
        },
        {
            onSuccess: (data) => navigate('/login', { replace: true }),
        }
    )

    function handleRegister(e) {
        e.preventDefault()
        const userData = Object.fromEntries(new FormData(e.target))
        mutate(userData)
    }

    return (
        <Center>
            <Card>
                {error && <ErrorElement error={error} />}
                <form onSubmit={handleRegister}>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='name'>
                            Name
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='text'
                            name='name'
                            placeholder='name'
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='email'>
                            Email
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='email'
                            name='email'
                            placeholder='email'
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='text'
                            name='username'
                            placeholder='username'
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='sr-only' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600'
                            type='password'
                            name='password'
                            placeholder='password'
                        />
                    </div>
                    <button 
                    disabled={isLoading}  
                    className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 disabled:bg-blue-400'>
                        Register
                    </button>
                </form>

                <div className='mt-2'>
                    <p className='underline text-sm text-gray-600'>
                        <Link to='/login'>
                        Already have an account?
                        </Link>
                    </p>
                </div>
            </Card>
        </Center>
    )
}
