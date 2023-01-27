import { Navigate } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import { getUser } from '../utils'

export default function Index() {
    const user = getUser()
    // By guards we know that user has a role
    // We will have different logic depending on the state of user
    if (user.student && !user.student.enroll)
        return <Navigate to='/role/student/enroll-options' />

    if (
        user.student &&
        user.student.enroll &&
        user.student.enroll.status !== 'approved'
    )
        return <Navigate to='/role/student/pending' />

    return (
        <div>
            <LogoutButton />
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
