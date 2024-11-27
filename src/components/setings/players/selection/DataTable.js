'use client';
import React, { useState } from "react";
import {getFacetedUniqueValues,getPaginationRowModel,getFilteredRowModel,flexRender,getCoreRowModel,useReactTable, getFacetedRowModel,} from "@tanstack/react-table";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export function DataTable({ columns, data, rowSelection, setRowSelection }) {
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onRowSelectionChange: setRowSelection,
        state: {
        columnFilters,
        pagination,
        rowSelection,
        },
    });
    
    return (
        <div className="w-full">

            {/* Filters */}
            <div className="flex gap-2 items-center py-4">
                {/* Player */}
                <Input placeholder="Jugador..."
                value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />                
            </div>

            {/* Table */}
            <div>
                <div className="rounded-md border border-muted">
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
        </div>
    );
}
  