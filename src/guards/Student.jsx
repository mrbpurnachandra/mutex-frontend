import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function Student({ children }) {
    const user = getUser()
    if (!user.student) return <Navigate to='/' replace={true} />

    return children
}
