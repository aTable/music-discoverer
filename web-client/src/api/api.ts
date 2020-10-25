import axios, { AxiosResponse, AxiosError } from 'axios'
import config from '../config'

const backend = axios.create({
    baseURL: config.serverUri,
})
backend.interceptors.response.use(
    (res: AxiosResponse) => {
        return res.data
    },
    (err: AxiosError) => {
        console.error(err)
        if (err.response) {
            if (err.response.status === 401) {
                window.location.hash = config.loginRoute
                return Promise.reject(err)
            } else if (err.response.status === 403) {
                window.location.hash = '#/unauthorized'
                return Promise.reject(err)
            }
        }
        return Promise.reject(err)
    }
)
export function setBearer(token: string) {
    backend.defaults.headers['Authorization'] = 'Bearer ' + token
}

export function gather(link: string) {
    const payload = {
        location: link
    }
    return backend.post('/api/gather', payload)
}