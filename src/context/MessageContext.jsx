import { createContext } from 'react'

export const MessageContext = createContext([])
export const MessageDispatchContext = createContext(null)

export function messageReducer(messages, action) {
    switch (action.type) {
        case 'ADD_OLD_MESSAGES': {
            return [...action.payload, ...messages]
        }

        case 'ADD_NEW_MESSAGE': {
            return [...messages, action.payload]
        }

        case 'DELETE_MESSAGE': {
            return messages.filter((m) => m.id != action.payload)
        }

        case 'STUDENT_REMOVED': {
            return messages.filter((m) => m.senderId != action.payload)
        }
    }
}
