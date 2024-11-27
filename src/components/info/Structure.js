import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSelector } from 'react-redux';

export default function Structure() {
  const structure = useSelector((state) => state?.structure?.blinds);
  return (
    <div className='flex flex-col py-3 lg:py-6 gap-3 sm:gap-6'>
      <Table className="w-fit lg:min-w-[400px]">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px]">Nivel</TableHead>
            <TableHead className="w-[100px]">Ciega chica</TableHead>
            <TableHead className="w-[100px]">Ciega Grande</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {structure.map((row) => (
            <TableRow key={row.level} className="h-[40px]">
              <TableCell className="text-muted-foreground">{row.level}</TableCell>
              <TableCell>{row.smallBlind}</TableCell>
              <TableCell>{row.bigBlind}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
