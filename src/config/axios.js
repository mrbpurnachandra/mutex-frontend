import axios from 'axios'
import { retriveAuthToken } from '../utils'

const baseURL = import.meta.env.VITE_API_BASE_URL

const httpClient = axios.create({
    baseURL,
    responseType: 'json',
})

httpClient.interceptors.request.use(
    (config) => {
        const token = retriveAuthToken()
        if (token) config.headers.Authorization = `Bearer ${token}`

        return config
    },
    (err) => {
        return Promise.reject({ message: err.message })
    }
)

httpClient.interceptors.response.use(
    (res) => res.data,
    (err) => {
        let message = err.message
        let status = 500

        if (err.response && err.response.status < 500) {
            console.log(err.response.data)
            message = err.response.data.message
            status = err.response.status
        }

        return Promise.reject({ message, status })
    }
)

export default httpClient
