import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useSelector } from 'react-redux';
import { getHistoryTableData, getPlayerStatistics } from '@/lib/stats';
import DataTable from './DataTable';

export default function Players() {
  const {history} = useSelector(state => state.history);
  const stats = getPlayerStatistics(history)
  const data = getHistoryTableData(history)
  const [selectedPlayer, setSelectedPlayer] = useState('');
  
  const handleChange = (value) => {
    const cards = Array.from(document.getElementsByClassName('player-card'))
    for (let i = 0; i < cards.length; i++) {
      if(cards[i].id == value){
        console.log(cards[i].id, "removing hidden")
        cards[i].classList.remove('hidden')
      }
      else{
        cards[i].classList.add('hidden')
      }
    
    }

    const tableContainer = document.getElementById('table-container')
    value == '' ? tableContainer.classList.add('hidden') : tableContainer.classList.remove('hidden')
    
    setSelectedPlayer(value)
  }  

  return (
    <div className='flex flex-col py-6 gap-4 lg:max-w-[80%] xl:max-w-[60%]'>

      <select id='player-select' className='bg-transparent border border-muted px-3 py-2 rounded-lg w-max scrollbar-hidden' onChange={(e)=>handleChange(e.target.value)}>
        <option value={""} className="bg-background text-foreground">Jugador...</option>
        {stats.map((player) => {
          return (
            <option value={player.name} key={player.name} className="bg-background text-foreground">
              {player.name}
            </option>
          )
        })}
      </select>
      
        {stats.map((player) => {
          let bestColor = player.bestResult.position == 1 ? 'text-gold' : player.bestResult.position == 2 ? 'text-silver' : player.bestResult.position == 3 ? 'text-bronze' : ''

          return (
            <Card className="player-card | border-muted hidden w-full" id={player.name} key={player.name}>
              <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:justify-between">
                <div className="grid auto-rows-min gap-1">
                    <div className="text-sm text-muted-foreground">Nombre</div>
                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                        {player.name}
                    </div>
                </div>
                <div className="grid auto-rows-min gap-1">
                  <div className="text-sm text-muted-foreground">Participaciones</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {player.participations}
                  </div>
                </div>
                <div className="grid auto-rows-min gap-1">
                  <div className="text-sm text-muted-foreground">Reentradas</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {player.reentries}
                  </div>
                </div>
                <div className="grid auto-rows-min gap-1">
                  <div className="text-sm text-muted-foreground">Podios</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {player.podiums}
                  </div>
                </div>
                <div className="grid auto-rows-min gap-1">
                  <div className="text-sm text-muted-foreground">Mejor resultado</div>
                  <div className={`flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none ${bestColor}`}>
                  {player.bestResult.position}
                  </div>
                </div>
                <div className="grid auto-rows-min gap-1">
                  <div className="text-sm text-muted-foreground">Fecha</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  {player.bestResult.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
          })
        }

        <div id='table-container' className='hidden'>
          <DataTable selectedPlayer={selectedPlayer} data={data} />
        </div>    
    </div>
  )
}
