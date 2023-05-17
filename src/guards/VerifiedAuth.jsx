import { Navigate } from 'react-router-dom'
import { getUser } from '../utils'

export default function VerifiedAuth({ children }) {
    const user = getUser()

    if (!user) return <Navigate to='/login' />
    if(user && !user.verifiedOn) return <Navigate to='/verify'/>

    return children
}
