import { lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router'

import { RootLayout } from '@/components/layout/root-layout'
import { routes } from '@/config/routes'

const HomePage = lazy(() => import('@/pages/home-page'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page'))

const router = createBrowserRouter([
    {
        path: routes.home,
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
])

export const App = () => {
    return <RouterProvider router={router} />
}
