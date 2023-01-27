import { Link } from 'react-router-dom'
import Center from '../components/Center'
import Card from '../components/Card'

export default function EnrollOptions() {
    return (
        <Center>
            <Card>
                <p className='text-gray-700'>
                    Do you want to join existing class or create a new class?
                </p>
                <div className='mt-4 flex space-x-4'>
                    <Link
                        className='mt-4 border border-transparent rounded-md px-4 py-2 text-gray-800 font-semibold leading-tight text-sm bg-gray-200 outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-600'
                        to='/role/student/create-new-class'
                    >
                        Create a new class
                    </Link>
                    <Link
                        className='mt-4 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600'
                        to='/role/student/join-existing-class'
                    >
                        Join existing class
                    </Link>
                </div>
            </Card>
        </Center>
    )
}
