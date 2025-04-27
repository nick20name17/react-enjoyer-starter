import type { User } from '../user/user-types'

export interface LoginPayload {
    email: string
    password: string
}

export interface TokenResponse {
    access_token: string
    refresh_token: string
    user: User
}
