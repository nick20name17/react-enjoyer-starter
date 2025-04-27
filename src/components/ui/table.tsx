import * as React from 'react'

import { cn } from '@/lib/utils'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
    return (
        <div
            data-slot='table-container'
            className='w-full'
        >
            <table
                data-slot='table'
                className={cn(
                    'w-full caption-bottom border-separate border-spacing-0 text-sm',
                    className
                )}
                {...props}
            />
        </div>
    )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
    return (
        <thead
            data-slot='table-header'
            className={cn('[&_tr]:border-b', className)}
            {...props}
        />
    )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
    return (
        <tbody
            data-slot='table-body'
            className={cn('[&_tr:last-child]:border-0', className)}
            {...props}
        />
    )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
    return (
        <tfoot
            data-slot='table-footer'
            className={cn('bg-grey-100 border-t [&>tr]:last:border-b-0', className)}
            {...props}
        />
    )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
    return (
        <tr
            data-slot='table-row'
            className={cn(
                'hover:bg-grey-100 data-[state=selected]:bg-grey-100 border-b transition-colors',
                className
            )}
            {...props}
        />
    )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot='table-head'
            className={cn(
                'text-grey-500 bg-grey-200 h-8.5 px-2.5 text-left align-middle font-normal whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className
            )}
            {...props}
        />
    )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot='table-cell'
            className={cn(
                'p-2.5 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className
            )}
            {...props}
        />
    )
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
    return (
        <caption
            data-slot='table-caption'
            className={cn('text-grey-500 mt-4 text-sm', className)}
            {...props}
        />
    )
}

export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
}
