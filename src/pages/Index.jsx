import LogoutButton from '../components/LogoutButton'
import { getUser } from '../utils'

export default function Index() {
    const user = getUser()

    return (
        <div>
            <LogoutButton />
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
