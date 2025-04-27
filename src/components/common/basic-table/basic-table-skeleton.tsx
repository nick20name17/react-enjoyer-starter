import type { Header } from '@tanstack/react-table'

import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { DEFAULT_LIMIT } from '@/constants/api'

interface BasicTableSkeletonProps<T> {
    headers: Header<T, unknown>[]
    rowsCount?: number
}

export const BasicTableSkeleton = <T,>({
    headers,
    rowsCount = DEFAULT_LIMIT
}: BasicTableSkeletonProps<T>) => {
    return Array.from({ length: rowsCount }).map((_, index) => (
        <TableRow
            key={`skeleton_${index}`}
            className='h-8'
        >
            {headers.map((header, headerIndex) => (
                <TableCell
                    key={`skeleton_${index}_${header.id || headerIndex}`}
                    style={{
                        width: header.getSize()
                    }}
                >
                    <Skeleton className='h-8 w-full' />
                </TableCell>
            ))}
        </TableRow>
    ))
}
