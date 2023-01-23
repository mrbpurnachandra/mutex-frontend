import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function Guest({ children }) {
    const user = getUser()

    if (!user) return <Navigate to='/login' />
    return children
}
