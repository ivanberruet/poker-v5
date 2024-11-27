import React from 'react'
import SelectPlayers from './selection/SelectPlayers'
import TableOfPlayers from './table/TableOfPlayers'

export default function Players() {
  return (
    <div className='flex flex-col py-3 lg:py-6 gap-3 sm:gap-6'>
      <SelectPlayers />
      <TableOfPlayers />
    </div>
  )
}
