import { lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router'

import { RootLayout } from '@/components/layout/root-layout'
import { routes } from '@/config/routes'

const HomePage = lazy(() => import('@/pages/home/home-page'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page'))
const LoginPage = lazy(() => import('@/pages/login/login-page'))

const router = createBrowserRouter([
    {
        path: routes.home,
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            }
        ]
    },
    {
        path: routes.login,
        element: <LoginPage />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
])

export const App = () => {
    return <RouterProvider router={router} />
}
