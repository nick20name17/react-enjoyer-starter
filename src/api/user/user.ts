import { api } from '..'

import type { User } from './user-types'

export const userService = {
    getUser: async (id: number) => {
        const { data } = await api.get<User>(`/users/${id}/`)
        return data
    }
}
