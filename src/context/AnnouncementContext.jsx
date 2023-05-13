import { createContext } from 'react'

export const AnnouncementContext = createContext([])
export const AnnouncementDispatchContext = createContext(null)

export function announcementReducer(announcements, action) {
    switch (action.type) {
        case 'ADD_OLD_ANNOUNCEMENTS': {
            return [...action.payload, ...announcements]
        }

        case 'ADD_NEW_ANNOUNCEMENT': {
            return [...announcements, action.payload]
        }
    }
}
