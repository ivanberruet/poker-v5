import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePlayers, setAvailablePlayers, setEliminatedPlayers, setReentryPlayers, setRegisteredPlayers } from '@/reducers/playersSlice';
import { setPool } from '@/reducers/moneySlice';
import { setEndTime, setIsPaused, setIsStarted } from '@/reducers/gameSlice';

export function TableActions({playerID}) {
  const dispatch = useDispatch();
  const {available: availablePlayers, registered: registeredPlayers, active: activePlayers, eliminated: eliminatedPlayers, reentry: reentryPlayers} = useSelector((state) => state?.players)
  const {entry: entryValue, reentry: reentryValue, pool, winners, prizes} = useSelector((state) => state?.money)

  const player = activePlayers.find(p => p.id === playerID)
  const dateOptions = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}
  
    
  const handleDelete = () => {

    if (confirm("¿Seguro que quieres borrar este jugador?")){
      // Add to available list again
      dispatch(setAvailablePlayers([...availablePlayers, player]))
      // Remove from registered list again
      dispatch(setRegisteredPlayers(registeredPlayers.filter(p => p.id !== playerID)))
      // Remove from active list again
      dispatch(setActivePlayers(activePlayers.filter(p => p.id !== playerID)))
      // Remmove from reentry list again
      dispatch(setReentryPlayers(reentryPlayers.filter(p => p.id !== playerID)))
    }
  }

  const handleReentry = () => {
    
    const updatedPlayer = {
      ...player, 
      reentry: !player.reentry, 
      reentryTime: !player.reentry ? new Date().toLocaleTimeString([], dateOptions) : null
    }
    // Update active players
    dispatch(setActivePlayers(activePlayers.map(p => p.id === playerID ? updatedPlayer : p)))
    // Update reentry players
    dispatch(setReentryPlayers( player.reentry ? reentryPlayers.filter(p => p.id !== playerID) : [...reentryPlayers, updatedPlayer]))

  }

  const handleElimination = () => {
    const position = registeredPlayers.length - eliminatedPlayers.length
    const prize = position > winners ? 0 : pool * prizes[winners - 1][position - 1]/100
    const updatedPlayer = {
      ...player, 
      eliminatedTime: new Date().toLocaleTimeString([], dateOptions),
      position: position,
      prize: prize
    }

    // Remove from active list
    dispatch(setActivePlayers(activePlayers.filter(p => p.id !== playerID)))
    // Add to eliminated list
    dispatch(setEliminatedPlayers([updatedPlayer, ...eliminatedPlayers, ]))

    // Endgame
    if (activePlayers.length == 2) {
      dispatch(setEndTime(new Date().toLocaleTimeString([], dateOptions)))
      dispatch(setIsStarted(false))
      dispatch(setIsPaused(false))
    } 

  }

  useEffect(() => {
    dispatch(setPool(entryValue*registeredPlayers.length + reentryValue*reentryPlayers.length))
  }, [registeredPlayers, reentryPlayers])

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><FontAwesomeIcon icon={faEllipsis} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Acciones:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span variant="outline" className="w-full cursor-pointer" onClick={()=>handleReentry()}>{!player.reentry ? "Anotar reentrada" : "Quitar reentrada"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span variant="outline" className="w-full cursor-pointer" onClick={()=>handleElimination()}>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-500">
          <span variant="outline" className="w-full cursor-pointer" onClick={()=>handleDelete()}>Borrar</span>
          <DropdownMenuShortcut><FontAwesomeIcon icon={faTrash} /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}
