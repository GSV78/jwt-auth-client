import { AxiosResponse } from 'axios';
import { AuthResponse } from './../models/response/AuthResponse';
import axios, { AxiosRequestConfig } from 'axios'

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) { config.headers.Authorization = `Bearer ${localStorage.getItem('token')}` }
    return config
})

$api.interceptors.response.use((config: AxiosResponse) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН!');

        }
    }
    throw error;
})

export default $api