import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Center from '../components/Center'
import ErrorElement from '../components/ErrorElement'
import httpClient from '../config/axios'
import authSchema from '../schemas/auth'
import { storeAuthToken } from '../utils'

export default function Login() {
    const navigate = useNavigate()

    const { error, mutate } = useMutation(
        (userData) => {
            const { error, value: data } = authSchema.validate(userData)
            if (error) throw error
            return httpClient.post('/auth/login', data)
        },
        {
            onSuccess: (token) => {
                storeAuthToken(token)
                return navigate('/', { replace: true })
            },
        }
    )

    function handleLogin(e) {
        e.preventDefault()
        const userData = Object.fromEntries(new FormData(e.target))
        mutate(userData)
    }
    return (
        <Center>
            <Card>
                {error && <ErrorElement error={error} />}
                <form onSubmit={handleLogin}>
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
                    <button className='mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'>
                        Login
                    </button>
                </form>

                <div className='mt-2'>
                    <p className='text-sm text-gray-600'>
                        Don't have an account? 
                        <Link to='/register'>
                            <strong> Register</strong>
                        </Link>
                    </p>
                </div>
            </Card>
        </Center>
    )
}
