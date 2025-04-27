import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import type { LoginPayload } from '@/api/auth/auth-types'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { emailShape, passwordShape } from '@/config/schemas'
import { useAuth } from '@/providers/auth-provider'

const loginSchema = z.object({
    email: emailShape,
    password: passwordShape
})

export const LoginForm = () => {
    const { login } = useAuth()

    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(loginSchema)
    })

    const loginMutation = login({
        onSuccess: () => {
            navigate(DEFAULT_LOGIN_REDIRECT)
            form.reset()
        }
    })

    const onSubmit = async (formData: LoginPayload) => {
        loginMutation.mutate(formData)
    }
    return (
        <Form {...form}>
            <form
                className='w-full space-y-4'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    disabled={loginMutation.isPending}
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    inputMode='email'
                                    placeholder='example@mail.com'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={loginMutation.isPending}
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='••••••••'
                                    type='password'
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className='w-full'
                    disabled={loginMutation.isPending}
                    type='submit'
                >
                    {loginMutation.isPending ? (
                        <Loader2 className='animate-spin' />
                    ) : (
                        'Log in'
                    )}
                </Button>
            </form>
        </Form>
    )
}
