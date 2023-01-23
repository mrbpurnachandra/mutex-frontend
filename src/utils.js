import jwtDecode from 'jwt-decode'

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
