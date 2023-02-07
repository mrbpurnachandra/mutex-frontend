import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function Cr({ children }) {
    const user = getUser()
    if (user.student.enroll.class.crId !== user.student.id) return <Navigate to='/' replace={true} />

    return children
}
