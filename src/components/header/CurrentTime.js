import React, { useState } from 'react'

export default function CurrentTime() {
  const [currtentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false}))

  setInterval(() => {
		setCurrentTime(new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false}));
	}, 1000)

  return (
    <div className='col-span-1 lg:text-3xl flex flex-col xl:flex-row gap-2'>
      <span>Hora:</span>
      <span>{currtentTime}</span>
    </div>

  )
}
