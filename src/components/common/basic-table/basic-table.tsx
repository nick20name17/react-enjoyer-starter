import {
    type ColumnDef,
    type Row,
    type Table as TableType,
    flexRender
} from '@tanstack/react-table'
import { Fragment, type ReactElement, useMemo } from 'react'

import { BasicTableSkeleton } from './basic-table-skeleton'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface BasicTableProps<TData, TValue> {
    table: TableType<TData>
    columns: ColumnDef<TValue>[]
    isStickyHeader?: boolean
    renderSubComponent?: (row: Row<TData>) => ReactElement
    isLoading?: boolean
    isFetchingNextPage?: boolean
    className?: string
    loadMoreRef?: (node: HTMLDivElement | null) => void
    expandedRowActiveStyle?: boolean
}

const LOAD_MORE_OFFSET = 10

const TableHeaders = <TData,>({
    table,
    isStickyHeader
}: {
    table: TableType<TData>
    isStickyHeader: boolean
}) => (
    <TableHeader className={cn(isStickyHeader ? 'sticky top-0 z-10' : '')}>
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
                className='border-none'
                key={headerGroup.id}
            >
                {headerGroup.headers.map((header) => (
                    <TableHead
                        key={header.id}
                        style={{
                            maxWidth: header.getSize() ? `${header.getSize()}px` : 'auto',
                            minWidth: header.getSize() ? `${header.getSize()}px` : 'auto',
                            width: header.getSize() ? `${header.getSize()}px` : 'auto'
                        }}
                        className={cn(
                            'border-b bg-gray-100 first:rounded-tl-md last:rounded-tr-md',
                            header.column.getIsPinned() === 'right'
                                ? 'sticky right-0 z-10 shadow-[inset_1px_0_0] shadow-gray-300'
                                : '',
                            header.column.getIsPinned() === 'left'
                                ? 'sticky left-0 z-10 shadow-[inset_-1px_0_0] shadow-gray-300'
                                : ''
                        )}
                    >
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                              )}
                    </TableHead>
                ))}
            </TableRow>
        ))}
    </TableHeader>
)

const TableRows = <TData, TValue>({
    table,
    renderSubComponent,
    loadMoreRef,
    columns
}: {
    table: TableType<TData>
    renderSubComponent?: (row: Row<TData>) => ReactElement
    loadMoreRef?: (node: HTMLDivElement | null) => void
    columns: ColumnDef<TValue>[]
}) => {
    const rows = table.getRowModel().rows

    if (!rows.length) {
        return (
            <TableRow>
                <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                >
                    No results.
                </TableCell>
            </TableRow>
        )
    }

    return (
        <>
            {rows.map((row, index) => (
                <Fragment key={row.id}>
                    <TableRow
                        className='last:[&>td]:border-b-0'
                        data-state={row.getIsSelected() && 'selected'}
                        ref={
                            loadMoreRef && index === rows.length - LOAD_MORE_OFFSET
                                ? loadMoreRef
                                : null
                        }
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell
                                key={cell.id}
                                style={{
                                    maxWidth: cell.column.getSize(),
                                    minWidth: cell.column.getSize(),
                                    width: cell.column.getSize()
                                }}
                                className={cn(
                                    'border-b',
                                    cell.row.getIsExpanded() &&
                                        cell.column.getIsPinned() === 'right'
                                        ? 'bg-white-100 sticky right-0 z-[1] shadow-[inset_1px_0_0] shadow-gray-300'
                                        : '',
                                    cell.column.getIsPinned() === 'left'
                                        ? 'bg-white-100 sticky left-0 z-[1] shadow-[inset_-1px_0_0] shadow-gray-300'
                                        : ''
                                )}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                    {row.getIsExpanded() && renderSubComponent ? (
                        <tr>
                            <TableCell
                                className='p-0'
                                colSpan={row.getVisibleCells()?.length}
                            >
                                <div
                                    className={cn(
                                        'relative overflow-hidden rounded-md py-2.5 pr-2.5 pl-16'
                                    )}
                                >
                                    {renderSubComponent(row)}
                                </div>
                            </TableCell>
                        </tr>
                    ) : null}
                </Fragment>
            ))}
        </>
    )
}

export const BasicTable = <TData, TValue>({
    isStickyHeader = true,
    isFetchingNextPage = false,
    renderSubComponent,
    table,
    columns,
    isLoading = false,
    className,
    loadMoreRef
}: BasicTableProps<TData, TValue>) => {
    const headerGroups = useMemo(() => table.getHeaderGroups(), [table])

    return (
        <ScrollArea className='h-40 rounded-md'>
            <Table className={cn('w-full table-fixed', className)}>
                <TableHeaders
                    table={table}
                    isStickyHeader={isStickyHeader}
                />
                <TableBody>
                    {isLoading ? (
                        <BasicTableSkeleton headers={headerGroups[0].headers} />
                    ) : (
                        <TableRows
                            table={table}
                            renderSubComponent={renderSubComponent}
                            loadMoreRef={loadMoreRef}
                            columns={columns}
                        />
                    )}
                    {isFetchingNextPage && (
                        <BasicTableSkeleton headers={headerGroups[0].headers} />
                    )}
                </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
        </ScrollArea>
    )
}
