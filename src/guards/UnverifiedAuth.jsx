import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function UnverifiedAuth({ children }) {
    const user = getUser()

    if (!user) return <Navigate to='/login' />
    if (user && user.verifiedOn) return <Navigate to='/' />

    return children
}
