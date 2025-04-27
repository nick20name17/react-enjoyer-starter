import { Navigate } from 'react-router'

import { LoginForm } from './components/login-form'
import { LogoIcon } from '@/components/common/logo'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { useAuth } from '@/providers/auth-provider'

const LoginPage = () => {
    const { isAuth } = useAuth()

    if (isAuth) {
        return (
            <Navigate
                to={DEFAULT_LOGIN_REDIRECT}
                replace
            />
        )
    }

    return (
        <>
            <title>Login</title>
            <section className='flex h-screen flex-col items-center justify-center gap-4'>
                <LogoIcon />
                <Card className='mx-auto w-70 gap-4 p-4 shadow-none md:w-120 md:p-10'>
                    <CardHeader className='text-center'>
                        <CardTitle>
                            <h1 className='text-2xl'>Welcome back</h1>
                        </CardTitle>
                        <CardDescription>Please enter your details.</CardDescription>
                    </CardHeader>
                    <LoginForm />
                </Card>
            </section>
        </>
    )
}

export default LoginPage
