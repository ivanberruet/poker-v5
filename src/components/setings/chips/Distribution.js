import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
export default function Distribution() {
  const {distribution} = useSelector(state => state.chips)

  return (
    <Table className="w-fit lg:min-w-full">
      <TableHeader>
        <TableRow className="h-[50px] bg-muted/50">
          <TableHead className="w-[100px]">Fichas</TableHead>
          <TableHead className="font-medium text-white"><FontAwesomeIcon icon={faCircle} /></TableHead>
          <TableHead className="font-medium text-red-500"><FontAwesomeIcon icon={faCircle} /></TableHead>
          <TableHead className="font-medium text-green-500"><FontAwesomeIcon icon={faCircle} /></TableHead>
          <TableHead className="font-medium text-blue-500"><FontAwesomeIcon icon={faCircle} /></TableHead>
          <TableHead className="font-medium text-black"><FontAwesomeIcon icon={faCircle} /></TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {distribution.map((box) => (
          <TableRow key={box.label} className="h-[50px]">
            <TableCell>{box.label}</TableCell>
            <TableCell>{Intl.NumberFormat('es-AR').format(box.white.quantity)}</TableCell>
            <TableCell>{Intl.NumberFormat('es-AR').format(box.red.quantity)}</TableCell>
            <TableCell>{Intl.NumberFormat('es-AR').format(box.green.quantity)}</TableCell>
            <TableCell>{Intl.NumberFormat('es-AR').format(box.blue.quantity)}</TableCell>
            <TableCell>{Intl.NumberFormat('es-AR').format(box.black.quantity)}</TableCell>
            <TableCell>{Intl.NumberFormat('es-AR').format(box.value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
