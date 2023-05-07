import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { retriveAuthToken } from '../utils'

export default function useSocket() {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const baseUrl = import.meta.env.API_BASE_URL || 'http://localhost:3000'
        const socket = io(baseUrl, {
            auth: {
                token: retriveAuthToken(),
            },
        })

        setSocket(socket)

        return () => socket.close()
    }, [])

    return socket
}
