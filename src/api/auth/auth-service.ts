import { api } from '..'

import type { LoginPayload, TokenResponse } from './auth-types'

export const authService = {
    async login(payload: LoginPayload) {
        const { data } = await api.post<TokenResponse>('/auth/', payload)
        return data
    },

    async refreshToken(refresh_token: string) {
        const { data } = await api.post<TokenResponse>('/auth/refresh/', {
            refresh_token
        })
        return data
    }
}
