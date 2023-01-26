import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function Enrolled({ children }) {
    const user = getUser()

    if (!user.student.enroll) return <Navigate to='/' replace={true} />

    return children
}
