import Logout from '../components/Logout'
import { getUser } from '../utils'

export default function Index() {
    const user = getUser()

    return (
        <div>
            <Logout />
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
