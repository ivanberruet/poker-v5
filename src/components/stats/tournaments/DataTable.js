'use client';
import React, { useState } from "react";
import { getFacetedUniqueValues,getFilteredRowModel,flexRender,getCoreRowModel,useReactTable, getFacetedRowModel,} from "@tanstack/react-table";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { columns } from './columns'
import { Card, CardContent } from '@/components/ui/card'
import { getIndividualTournamentStats } from "@/lib/stats";

export default function DataTable({data}) {
    const [columnFilters, setColumnFilters] = useState([{id: 'date', value: data[0]?.date}]);
    const [columnVisibility, setColumnVisibility] = useState({date: false, position: true, player: true, reEntry: true});
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
        columnFilters,
        columnVisibility,
        },
    });

    const [tournamentInfo, setTournamentInfo] = useState(getIndividualTournamentStats(data, table.getColumn("date")?.getFilterValue()));

    function DateFilter({ column }) {
        
        const columnFilterValue = column.getFilterValue()
        
        const sortedUniqueValues = React.useMemo(() =>
            Array.from(column.getFacetedUniqueValues().keys())
                .slice(0, 5000),
            [column.getFacetedUniqueValues()]
        )  
    
        return (
        <select
            className="bg-transparent border border-muted px-2 py-2 rounded-lg scrollbar-hidden"
            value={columnFilterValue}
            onChange={e => {
                column.setFilterValue(e.target.value); 
                setTournamentInfo(getIndividualTournamentStats(data, e.target.value))
            }}
        >
            {/* <option value="" className="bg-background text-foreground">Torneo...</option> */}
            {sortedUniqueValues.map((value,i) => {
                const [day, month, year] = value.split("/");
                const displayDate = new Date(`${year}-${month}-${day}`).toLocaleDateString("es-ES", {month:"short", year:"numeric"})
                return (
                    //dynamically generated select options from faceted values feature
                    <option className="bg-background text-foreground" value={value} key={i}>
                        {displayDate.toUpperCase()}
                    </option>
                )
            })}
        </select>
        ) 
    }
    
    return (
        <div className="w-full lg:w-[50%] flex flex-col gap-4">

            {/* Filters */}
            <div className="w-full flex gap-2 items-center">
                {/* Date */}
                <DateFilter column={table.getColumn("date")} />

                <Card className="hidden 2xl:inline-block flex-1 border-muted rounded-lg">
                    <CardContent className="flex p-2 justify-between">
                        <div className="flex items-center gap-2">
                            <div className="text-muted-foreground">Fecha:</div>
                            <div className="flex items-baseline gap-1 font-bold tabular-nums leading-none">{table.getColumn("date")?.getFilterValue()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-muted-foreground">Comienzo:</div>
                            <div className="flex items-baseline gap-1 font-bold tabular-nums leading-none">{tournamentInfo?.startTime}</div>
                            
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-muted-foreground">Final:</div>
                            <div className="flex items-baseline gap-1 font-bold tabular-nums leading-none">{tournamentInfo?.endTime}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-muted-foreground">Reentradas:</div>
                            <div className="flex items-baseline gap-1 font-bold tabular-nums leading-none">{tournamentInfo?.reentriesCount}</div>
                        </div>
                    </CardContent>
                </Card>

            </div>

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

            <Card className="2xl:hidden flex-1 border-muted rounded-lg">
                    <CardContent className="flex p-2 justify-between">
                        <div className="grid auto-rows-min items-center gap-2">
                            <div className="text-muted-foreground">Fecha</div>
                            <div className="text-xs sm:text-base lg:text-xl flex items-baseline gap-1 font-bold tabular-nums leading-none">{table.getColumn("date")?.getFilterValue()}</div>
                        </div>
                        <div className="grid auto-rows-min items-center gap-2">
                            <div className="text-muted-foreground">Comienzo</div>
                            <div className="text-xs sm:text-base lg:text-xl flex items-baseline gap-1 font-bold tabular-nums leading-none">{tournamentInfo?.startTime}</div>
                            
                        </div>
                        <div className="grid auto-rows-min items-center gap-2">
                            <div className="text-muted-foreground">Final</div>
                            <div className="text-xs sm:text-base lg:text-xl flex items-baseline gap-1 font-bold tabular-nums leading-none">{tournamentInfo?.endTime}</div>
                        </div>
                        <div className="grid auto-rows-min items-center gap-2">
                            <div className="text-muted-foreground">Reentradas</div>
                            <div className="text-xs sm:text-base lg:text-xl flex items-baseline gap-1 font-bold tabular-nums leading-none">{tournamentInfo?.reentriesCount}</div>
                        </div>
                    </CardContent>
                </Card>


        </div>
    );
}
  