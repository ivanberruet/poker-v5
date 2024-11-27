import React from 'react'
import { useSelector } from 'react-redux';
import Blinds from './Blinds';
import Clock from './Clock';
import GameTable from './GameTable';

export default function Game({view}) {
  const {currentLevel} = useSelector((state) => state?.time);
  const {bigBlind} = useSelector((state) => state?.structure?.blinds[currentLevel-1]);
  const {registered, active, reentry, eliminated} = useSelector((state) => state?.players);
  const {distribution} = useSelector((state) => state?.chips);
  const {winners, prizes, pool} = useSelector((state) => state?.money);
  
  const perPlayer = distribution[0]?.value || 0;
  const chipsCount = perPlayer * (registered.length + reentry.length);
  const averageChips = Math.floor(chipsCount / active.length) || 0;
  const averageBBs = Math.floor(averageChips / bigBlind) || 0;

  const options = Array.from({ length: winners }, (_, i) => i + 1);

  const formatNumber = (number) => Intl.NumberFormat('es-AR').format(number);
  const displayTable = () => {
    if(registered.length <= 7) {
      return <GameTable playerList={active.concat(eliminated)} />
    }
    else if (registered.length <= 14){
      return (
        <>
        <GameTable playerList={active.concat(eliminated).slice(0,7)} />
        <GameTable playerList={active.concat(eliminated).slice(7,registered.length)} />
        </>
      )
    }
    else if (registered.length <= 21){
      return (
        <>
        <GameTable playerList={active.concat(eliminated).slice(0,7)} />
        <GameTable playerList={active.concat(eliminated).slice(7,14)} />
        <GameTable playerList={active.concat(eliminated).slice(14,registered.length)} />
        </>
      )
    }

  }

  return (
    <div className={`w-full flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 ${view == "game" ? "" : "hidden"}`}>

      <section className='isolate bg-muted/20 shadow-lg rounded-xl p-6 lg:col-span-3 w-full flex flex-col lg:flex-row justify-around gap-6 lg:gap-0'>
        <Blinds level={currentLevel-1} status={"current"} />
          <Clock />
        <Blinds level={currentLevel} status={"next"} />
      </section>

      <section className='isolate bg-muted/20 shadow-lg rounded-xl p-6 flex flex-col gap-4 xl:text-2xl'>
        <p><span className='font-semibold'>Fichas:</span> {formatNumber(chipsCount)}</p>
        <p><span className='font-semibold'>Promedio:</span> {formatNumber(averageChips)} ({averageBBs} BB)</p>
        <p><span className='font-semibold'>Jugadores:</span> {active.length} / {registered.length}</p>
        <p><span className='font-semibold'>Reentradas:</span> {reentry.length}</p>
      </section>

      <section className='isolate bg-muted/20 shadow-lg rounded-xl p-6 lg:col-span-2 lg:row-span-2 flex gap-6'>
        {displayTable()}
      </section>

      <section className='isolate bg-muted/20 shadow-lg rounded-xl p-6 flex flex-col gap-4 lg:text-2xl'>
        <p className='lg:text-3xl'><span className='font-semibold'>Pozo:</span> ${formatNumber(pool)}</p>
        <div className='grid gap-2 '>
          {options.map((_,i) => {
            let prize = prizes[winners-1][i]*pool/100
            return (
            <p key={i}><span className='font-semibold'>{i+1}º Puesto:</span> ${formatNumber(prize)}</p>
          )})}
        </div>
      </section>
      
    </div>
  )
}
