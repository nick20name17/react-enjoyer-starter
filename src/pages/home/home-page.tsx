import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { columns } from './components/columns'
import { BasicTable } from '@/components/common/basic-table/basic-table'

const data = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        website: 'https://example.com',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
        company: 'Example Inc.',
        jobTitle: 'CEO',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '555-123-4567',
        website: 'https://example.com',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
        company: 'Example Inc.',
        jobTitle: 'CEO',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
    },
    {
        id: 3,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        website: 'https://example.com',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
        company: 'Example Inc.',
        jobTitle: 'CEO',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
    },
    {
        id: 4,
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '555-123-4567',
        website: 'https://example.com',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
        company: 'Example Inc.',
        jobTitle: 'CEO',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
    }
]

const HomePage = () => {
    const table = useReactTable({
        data,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <BasicTable
            columns={columns}
            table={table}
        />
    )
}

export default HomePage
