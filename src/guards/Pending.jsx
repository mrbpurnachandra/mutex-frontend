import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function Pending({ children }) {
    const user = getUser()

    if (user.student.enroll && user.student.enroll.status === 'approved')
        return <Navigate to='/' replace={true} />

    return children
}
