import { useNavigate } from 'react-router-dom'
import { deleteAuthToken } from '../utils'

export default function Logout() {
    const navigate = useNavigate()

    function handleClick() {
        deleteAuthToken()
        navigate('/login', { replace: true })
    }
    return <button className='mt-4 border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600' onClick={handleClick} >Logout</button>
}
