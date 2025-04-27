import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/common/basic-table/data-table-column-header'

export const columns: ColumnDef<any, any>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Name'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Email'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Phone'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'website',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Website'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'city',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='City'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'state',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='State'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'country',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Country'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'state',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='State'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'country',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Country'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'state',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='State'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    },
    {
        accessorKey: 'country',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Country'
            />
        ),
        enableSorting: true,
        enableColumnFilter: true
    }
]
