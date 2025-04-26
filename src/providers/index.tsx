import type { PropsWithChildren } from 'react'

import { ReactQueryProvider } from '@/providers/react-query-provider'

export const Providers = ({ children }: PropsWithChildren) => {
    return <ReactQueryProvider>{children}</ReactQueryProvider>
}
