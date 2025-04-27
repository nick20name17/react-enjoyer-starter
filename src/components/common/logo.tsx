import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

interface LogoProps {
    width?: number
    height?: number
    showText?: boolean
    className?: string
    style?: CSSProperties
    textColor?: string
    primaryColor?: string
    secondaryColor?: string
}

export const Logo = ({
    width = 60,
    height = 60,
    showText = true,
    className = '',
    style = {},
    textColor = '#2D3748',
    primaryColor = '#61DAFB',
    secondaryColor = '#FF4154'
}: LogoProps) => {
    return (
        <div
            className={cn('inline-flex items-center gap-2', className)}
            style={style}
        >
            <svg
                width={width}
                height={height}
                viewBox='0 0 100 100'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <ellipse
                    cx='50'
                    cy='50'
                    rx='45'
                    ry='18'
                    stroke={primaryColor}
                    strokeWidth='4'
                    transform='rotate(0 50 50)'
                    opacity='0.9'
                />

                <ellipse
                    cx='50'
                    cy='50'
                    rx='45'
                    ry='18'
                    stroke={primaryColor}
                    strokeWidth='4'
                    transform='rotate(60 50 50)'
                    opacity='0.7'
                />

                <ellipse
                    cx='50'
                    cy='50'
                    rx='45'
                    ry='18'
                    stroke={primaryColor}
                    strokeWidth='4'
                    transform='rotate(120 50 50)'
                    opacity='0.5'
                />

                {/* Core circle */}
                <circle
                    cx='50'
                    cy='50'
                    r='12'
                    fill={primaryColor}
                />

                <path
                    d='M75 25L85 35M85 25L75 35'
                    stroke={secondaryColor}
                    strokeWidth='4'
                    strokeLinecap='round'
                />

                <circle
                    cx='20'
                    cy='30'
                    r='6'
                    fill={secondaryColor}
                />
                <circle
                    cx='75'
                    cy='70'
                    r='4'
                    fill={secondaryColor}
                />
            </svg>

            {showText && (
                <div className='flex flex-col'>
                    <span
                        className='leading-tight font-bold'
                        style={{ color: textColor }}
                    >
                        ReactEnjoyer
                    </span>
                    <span
                        className='text-xs font-medium'
                        style={{ color: textColor }}
                    >
                        Starter
                    </span>
                </div>
            )}
        </div>
    )
}

export const LogoIcon = (props: Omit<LogoProps, 'showText'>) => {
    return (
        <Logo
            {...props}
            showText={false}
        />
    )
}
