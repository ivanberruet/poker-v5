import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from './DataTable'
import { setActivePlayers, setAvailablePlayers, setRegisteredPlayers } from '@/reducers/playersSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function SelectPlayers() {
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = useState({})
  const {available: availablePlayers, registered: registeredPlayers} = useSelector((state) => state?.players)

    const getSelectedAndFilterOutPlayers = (availablePlayers, selectedRowsID) => {
    // Retrieve selected players based on the selectedRowsID array
    const selectedPlayers = selectedRowsID.map(rowId => availablePlayers[rowId]);
  
    // Filter out the selected players from the availablePlayers array
    const filteredAvailablePlayers = availablePlayers.filter((_, index) => !selectedRowsID.includes(index.toString()));
  
    return { selectedPlayers, filteredAvailablePlayers };
  }

  const handleAdd = () => {
    const selectedRowsID = Object.keys(rowSelection);
    const { selectedPlayers, filteredAvailablePlayers } = getSelectedAndFilterOutPlayers(availablePlayers, selectedRowsID);
    const newActivePlayers = selectedPlayers.map(p => ({
      id: p.id, 
      name: p.name, 
      nick: p.nick, 
      reentry: false,
      reentryTime: null,
      position: null,
      eliminatedTime: null,
    }))
    
    dispatch(setAvailablePlayers(filteredAvailablePlayers));
    dispatch(setRegisteredPlayers([...registeredPlayers, ...selectedPlayers]));
    dispatch(setActivePlayers([...registeredPlayers, ...newActivePlayers]));
    setRowSelection({})
  }

  return (
    <Dialog>
      <DialogTrigger asChild  className="w-fit">
        <Button variant="outline"><FontAwesomeIcon icon={faUserPlus} className='w-5 h-5 mr-2' />Seleccionar jugadores</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[85%] ">
        <DialogHeader>
          <DialogTitle>Seleccionar jugadores</DialogTitle>
          <DialogDescription>
            Selecciona todos los participantes para el torneo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 overflow-scroll scrollbar-hidden">
          <DataTable columns={columns} data={availablePlayers} rowSelection={rowSelection} setRowSelection={setRowSelection} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="text-foreground-muted" onClick={() => handleAdd()} >
              Agregar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
