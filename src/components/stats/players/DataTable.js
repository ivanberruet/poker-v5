'use client';
import React, { useEffect, useState } from "react";
import {getFacetedUniqueValues,getPaginationRowModel,getFilteredRowModel,flexRender,getCoreRowModel,useReactTable, getFacetedRowModel,} from "@tanstack/react-table";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { columns } from './columns'
import { Button } from "@/components/ui/button";

export default function DataTable({data, selectedPlayer}) {
    const [columnFilters, setColumnFilters] = useState([{id: 'player', value: selectedPlayer}]);
    const [columnVisibility, setColumnVisibility] = useState({date: true, position: true, player: false, reEntry: true});
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 20, //default page size
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
        columnFilters,
        columnVisibility,
        pagination,
        },
    });

    useEffect(() => {
        setColumnFilters([{id: 'player', value: selectedPlayer}]);
    }, [selectedPlayer]);

    return (
        <div className="w-full flex flex-col gap-4">

            {/* Table */}
            <div >
                <div className="rounded-md border border-muted xl|
                :max-w-[80%]">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
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
                    <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() ? "selected" : undefined}
                            className="border-muted"
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    >
                    Anterior
                    </Button>
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    >
                    Siguiente
                    </Button>
            </div>


        </div>
    );
}
  