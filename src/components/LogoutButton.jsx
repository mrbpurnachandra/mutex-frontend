import { useNavigate } from 'react-router-dom'
import { deleteAuthToken } from '../utils'

export default function LogoutButton({ className }) {
    const navigate = useNavigate()

    function handleClick() {
        deleteAuthToken()
        navigate('/login', { replace: true })
    }

    return (
        <button className={className} onClick={handleClick}>
            Logout
        </button>
    )
}
