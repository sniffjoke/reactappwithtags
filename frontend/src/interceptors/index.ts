import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

// $api.interceptors.request.use(config => {
//     return config
// })

$api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('accessToken')
        config.headers.Authorization = `Bearer ${token}`
    } catch (e) {
        config.headers.Authorization = 'Bearer null'

    }
    return config
})

// $api.interceptors.response.use(async (config: any) => {
//         return config
//     }, async (error: any) => {
//         const originalRequest = error.config
//         if (error.response.status === 403 && error.config && !error.config._isRetry) {
//             originalRequest._isRetry = true
//             try {
//                 const response = await axios.get('http://localhost:5000/api/users/refresh', {withCredentials: true})
//                 await localStorage.setItem('userToken', response.data.tokens.accessToken)
//                 return $api.request(originalRequest)
//             } catch (error) {
//                 console.log('Error')
//             }
//         }
//         if (error.response.status === 401 && error.config && !error.config._isRetry) {
//             originalRequest._isRetry = true
//             try {
//                 console.log('Время сессии истекло. Авторизуйтесь еще раз')
//                 // setTimeout(() => {
//                 //     window.location.reload()
//                 // }, 1000)
//             } catch (error) {
//                 console.log('error')
//             }
//         }
//         // setTimeout(() => {
//         //     window.location.reload()
//         // }, 1000)
//         console.log('Выход')
//     }
// )

$api.interceptors.response.use((config) => {
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, {withCredentials: true})
            localStorage.setItem('accessToken', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error
})



export default $api
