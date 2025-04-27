import {
    type UseMutationResult,
    useMutation,
    useQuery,
    useQueryClient
} from '@tanstack/react-query'
import { type PropsWithChildren, createContext, useContext, useState } from 'react'

import { authService } from '@/api/auth/auth-service'
import type { LoginPayload, TokenResponse } from '@/api/auth/auth-types'
import { userService } from '@/api/user/user'
import type { User } from '@/api/user/user-types'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ID_KEY } from '@/constants/storage'

// Auth context type definition
interface AuthContextType {
    user: User | null
    isAuth: boolean
    login: ({
        onSuccess
    }: {
        onSuccess?: () => void
    }) => UseMutationResult<TokenResponse, Error, LoginPayload, unknown>
    logout: () => void
    isUserLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuth, setIsAuth] = useState(() => {
        return !!localStorage.getItem(ACCESS_TOKEN_KEY)
    })

    const userId = localStorage.getItem(USER_ID_KEY) ?? ''

    const queryClient = useQueryClient()

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        localStorage.removeItem(USER_ID_KEY)

        setIsAuth(false)

        queryClient.resetQueries({ queryKey: ['user'] })
    }

    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.getUser(+userId),
        enabled: isAuth && !!userId,
        refetchOnWindowFocus: true,
        refetchInterval: 5 * 60 * 1000
    })

    const handleLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
        const loginMutation = useMutation({
            mutationFn: authService.login,
            onSuccess: (data) => {
                localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token)
                localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
                localStorage.setItem(USER_ID_KEY, data.user?.id?.toString())

                onSuccess?.()

                setIsAuth(true)

                queryClient.invalidateQueries({ queryKey: ['user'] })
            }
        })

        return loginMutation
    }

    const value: AuthContextType = {
        user: user || null,
        isAuth,
        login: handleLogin,
        logout: handleLogout,
        isUserLoading: isLoading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
