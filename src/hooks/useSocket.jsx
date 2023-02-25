import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { retriveAuthToken } from '../utils'

export default function useSocket() {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket = io('http://localhost:3000', {
            auth: {
                token: retriveAuthToken(),
            },
        })

        setSocket(socket)

        return () => socket.close()
    }, [])

    return socket
}
