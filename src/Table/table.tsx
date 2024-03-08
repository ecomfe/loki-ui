/* eslint-disable complexity */
import React, {PropsWithChildren, isValidElement, useMemo} from 'react';
import {
    useReactTable as useTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel
} from '@tanstack/react-table';
import cn from 'classnames';
import Pagination from '../Pagination';
import type {PaginationProps} from '../Pagination';
import EmptyState from './EmptyState';
import type {CustomTableProps} from './interface';

const noop = {};
export const TableHead: React.FC<PropsWithChildren<{className?: string}>> = ({children, className}) => {
    return (
        <span className={cn(
            'block px-[--padding-xxl] py-[--padding-lg] text-base text-[--color-text] text-left', className)}
        >
            {children}
        </span>
    );
};
export const TableCell: React.FC<PropsWithChildren<{className?: string}>> = ({children, className}) => {
    return (
        <span className={cn(
            'block px-[--padding-xxl] py-[--padding-lg] text-sm text-[--color-text] text-left',
            className
        )}
        >
            {children}
        </span>
    );
};
type AnyObject = Record<PropertyKey, any>;
export const CustomTable = <RecordType extends AnyObject = AnyObject>({
    columns,
    dataSource,
    loading,
    spin,
    loadingIcon,
    pagination = noop as PaginationProps,
    style = noop as React.CSSProperties,
    className,
    classNames = noop as CustomTableProps<RecordType>['classNames'],
    sticky = false,
    minHeight,
    maxHeight,
    empty,
    scrollRef
}: CustomTableProps<RecordType>, ref: React.RefObject<HTMLDivElement>) => {
    const table = useTable({
        data: dataSource,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
        initialState: {
            pagination: pagination ? {
                pageIndex: pagination.current > 0 ? pagination.current - 1 : 0,
                pageSize: pagination.pageSize || 10,
            } : null,
        }
    });

    const handlePageChange = (pageNum: number, pageSize: number) => {
        // 走内部分页
        if (dataSource.length >= pagination.total) {
            table.setPageIndex(pageNum - 1);
        }
        if (pagination && typeof pagination.onChange === 'function') {
            pagination.onChange(pageNum, pageSize);
        }
    };

    const emptyNode = useMemo(
        () => {
            if (empty === undefined) {
                return <EmptyState height={minHeight} />;
            } else if (isValidElement(empty)) {
                return empty;
            } else {
                return null;
            }
        },
        [empty]
    );

    const getTableContent = (tableCn: string, theadCn: string, tbodyCn: string) => (
        <table
            className={cn('w-full', tableCn)}
        >
            <thead className={cn('bg-[--color-bg-layout]', theadCn, classNames.header)}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className={cn(tbodyCn, classNames.body)}>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className={classNames.row}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className={classNames.ceil}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className={cn('relative w-full', className)} style={style} ref={ref}>
            <div
                className="relative w-full"
                style={{
                    minHeight, maxHeight
                }}
            >{
                    sticky ? (
                        <>
                            <div
                                className="w-full absolute top-0 left-0 z-10 pointer-events-none h-full overflow-hidden"
                                style={{
                                    height: minHeight
                                }}
                            >
                                {getTableContent('', 
                                    'opacity-100', 'opacity-0 pointer-events-none')}
                            </div>
                            {/* sticky的实际滚动元素 */}
                            <div
                                className="w-full overflow-auto loki-scrollbar"
                                ref={scrollRef}
                                style={{
                                    minHeight: dataSource.length ? minHeight : 0,
                                    maxHeight
                                }}
                            >
                                {getTableContent('', 'opacity-0 pointer-events-none', 'opacity-100')}
                            </div>
                        </>
                    ) : getTableContent('', '', '')
                }
                {
                    !dataSource.length && emptyNode
                }
            </div>
            {
                pagination && (
                    <Pagination
                        onChange={handlePageChange}
                        {...pagination}
                        className={cn('mt-[--margin-xs] justify-end', pagination.className)}
                    />
                )
            }
            {
                loading && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 z-20">
                        {
                            isValidElement(spin) ? spin : (
                                <div className="flex items-center h-full
                            justify-center bg-white bg-opacity-40 transition-all duration-200 ease"
                                >
                                    {
                                        React.isValidElement(loadingIcon) ? loadingIcon : (
                                            <div className="flex space-x-2">
                                                <div className="w-3 h-3
                                                bg-[--color-primary] rounded-full animate-bounce"
                                                />
                                                <div
                                                    className="w-3 h-3 bg-[--color-primary] rounded-full animate-bounce"
                                                    style={{animationDelay: '0.1s'}}
                                                >
                                                </div>
                                                <div
                                                    className="w-3 h-3 bg-[--color-primary] rounded-full animate-bounce"
                                                    style={{animationDelay: '0.2s'}}
                                                >
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};
export default React.forwardRef(CustomTable) as <RecordType extends AnyObject = AnyObject>(
    props: React.PropsWithChildren<CustomTableProps<RecordType>> & React.RefAttributes<HTMLDivElement>
  ) => React.ReactElement;
