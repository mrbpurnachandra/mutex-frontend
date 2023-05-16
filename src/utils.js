import jwtDecode from 'jwt-decode'
import moment from 'moment'

export function storeAuthToken(token) {
    localStorage.setItem('MUTEX_TOKEN', token)
}

export function retriveAuthToken() {
    return localStorage.getItem('MUTEX_TOKEN')
}

export function deleteAuthToken() {
    localStorage.removeItem('MUTEX_TOKEN')
}

export function decodeToken(token) {
    try {
        return jwtDecode(token)
    } catch (err) {
        return null
    }
}

export function getUser() {
    return decodeToken(retriveAuthToken())
}

export function formatDate(date) {
    let m = moment(date)
    if (moment().diff(m, 'days') < 1) {
        return m.fromNow()
    }

    return m.format('MMMM Do YYYY, h:mm a')
}
