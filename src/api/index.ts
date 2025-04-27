import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios'

import { authService } from './auth/auth-service'
import { API_BASE_URL } from '@/constants/api'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ID_KEY } from '@/constants/storage'

interface RefreshTokenResponse {
    access_token: string
    refresh_token: string
}

type RefreshSubscriberCallback = (token: string) => void

export const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const onLogout = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
}

let isRefreshing = false
let refreshSubscribers: RefreshSubscriberCallback[] = []

const subscribeTokenRefresh = (callback: RefreshSubscriberCallback): void => {
    refreshSubscribers.push(callback)
}

const onRefreshed = (token: string): void => {
    refreshSubscribers.forEach((callback) => callback(token))
    refreshSubscribers = []
}

export const setupInterceptors = (): (() => void) => {
    const requestInterceptor = api.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = localStorage.getItem(ACCESS_TOKEN_KEY)
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error: any) => Promise.reject(error)
    )

    const responseInterceptor = api.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => response,
        async (error: any) => {
            const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
                error.config

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                if (isRefreshing) {
                    return new Promise<AxiosResponse>((resolve) => {
                        subscribeTokenRefresh((token: string) => {
                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${token}`
                            } else {
                                originalRequest.headers = {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                            resolve(api(originalRequest))
                        })
                    })
                }

                isRefreshing = true

                try {
                    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

                    if (!refreshToken) {
                        onLogout()
                        isRefreshing = false
                        return Promise.reject(error)
                    }

                    const data: RefreshTokenResponse =
                        await authService.refreshToken(refreshToken)

                    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token)
                    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
                    } else {
                        originalRequest.headers = {
                            Authorization: `Bearer ${data.access_token}`
                        }
                    }

                    onRefreshed(data.access_token)
                    isRefreshing = false

                    return api(originalRequest)
                } catch (refreshError) {
                    onLogout()
                    isRefreshing = false
                    refreshSubscribers = []
                    return Promise.reject(refreshError)
                }
            }

            return Promise.reject(error)
        }
    )

    return () => {
        api.interceptors.request.eject(requestInterceptor)
        api.interceptors.response.eject(responseInterceptor)
    }
}

setupInterceptors()
