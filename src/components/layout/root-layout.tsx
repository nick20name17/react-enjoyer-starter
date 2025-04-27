import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router'

import { Header } from './header'
import ErrorPage from '@/pages/error-page'

export const RootLayout = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Header />
            <main className='container py-4'>
                <Outlet />
            </main>
        </ErrorBoundary>
    )
}
