import axios from 'axios'

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('accessToken')
        config.headers.Authorization = `Bearer ${token}`
    } catch (e) {
        config.headers.Authorization = 'Bearer null'

    }
    return config
})

$api.interceptors.response.use((config) => {
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, {withCredentials: true})
            if (response.data.token !== undefined) {
                localStorage.setItem('accessToken', response.data.token)
                return $api.request(originalRequest)
            }
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw new Error('Не авторизован')
})



export default $api
