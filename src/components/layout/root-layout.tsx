import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router'

import ErrorPage from '@/pages/error-page'

export const RootLayout = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <main>
                <Outlet />
            </main>
        </ErrorBoundary>
    )
}
