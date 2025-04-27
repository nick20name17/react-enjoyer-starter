import type { PropsWithChildren } from 'react'

import { AuthProvider } from '@/providers/auth-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
    )
}
