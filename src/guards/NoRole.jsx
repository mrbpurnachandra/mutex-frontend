import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function NoRole({ children }) {
    const user = getUser()

    if (user.teacher || user.student) return <Navigate to='/' replace={true} />

    return children
}
