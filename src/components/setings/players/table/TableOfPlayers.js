import React from 'react'
import { TableActions } from './TableActions';
import { Table, TableBody, TableCell, TableHead, TableRow , TableHeader } from '@/components/ui/table'
import { useSelector } from 'react-redux';

export default function TableOfPlayers() {
  const {active: activePlayers, eliminated: eliminatedPlayers} = useSelector((state) => state?.players)


  return (
    <Table className="w-fit lg:min-w-[400px]">
      <TableHeader>
        <TableRow className="h-[50px]">
          <TableHead>#</TableHead>
          <TableHead className="w-[100px]">Nombre</TableHead>
          <TableHead>Reentrada</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activePlayers.map((player) => (
          <TableRow key={player.id} className="h-[50px]">
            <TableCell>{player.position}</TableCell>
            <TableCell className="font-medium">{player.nick}</TableCell>
            <TableCell>{player.reentry ? "Si" : "No"}</TableCell>
            <TableCell><TableActions playerID={player.id} /></TableCell>
          </TableRow>
        ))}
        {eliminatedPlayers.map((player) => (
          <TableRow key={player.id} className="h-[50px] text-muted-foreground">
            <TableCell>{player.position}</TableCell>
            <TableCell className="font-medium">{player.nick}</TableCell>
            <TableCell>{player.reentry ? "Si" : "No"}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  
  )
}
