import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { retriveAuthToken } from '../utils'

export default function useSocket() {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const socket = io(baseUrl, {
            auth: {
                token: retriveAuthToken(),
            },
            transports: ['websocket', 'polling'],
        })

        setSocket(socket)

        return () => socket.close()
    }, [])

    return socket
}
