import { LogOut } from 'lucide-react'

import { Button } from '../ui/button'

import { Logo } from '@/components/common/logo'
import { useAuth } from '@/providers/auth-provider'

export const Header = () => {
    const { logout } = useAuth()

    return (
        <header className='container flex h-20 items-center justify-between border-b'>
            <Logo
                height={40}
                width={40}
            />
            <Button
                variant='ghost'
                onClick={logout}
                className='hover:text-red-500'
            >
                <LogOut className='size-4' />
                <span>Log out</span>
            </Button>
        </header>
    )
}
