import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function HasRole({ children }) {
    const user = getUser()

    if (!user.teacher && !user.student)
        return <Navigate to='/role' replace={true} />

    return children
}
