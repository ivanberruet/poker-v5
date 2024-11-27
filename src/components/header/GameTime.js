import React from 'react'
import { useSelector } from 'react-redux'

export default function GameTime() {
  const {inGameTime, isStarted} = useSelector(state => state.game)

  function secondsToHoursMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  }

  const {hours, minutes} = secondsToHoursMinutes(inGameTime)

  return (
    <div className='col-span-1 lg:text-3xl flex flex-col xl:flex-row sm:justify-end gap-2'>
      <span>En juego:</span>
      <span>
        {isStarted
          ? ` ${hours < 10 ? "0" : ""}${hours}:${ minutes < 10 ? "0" : ""}${minutes}`
        : " 00:00"
        }
      </span>
    </div>
  )
}
