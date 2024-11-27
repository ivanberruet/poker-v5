import React from 'react'
import CurrentTime from './CurrentTime'
import GameTime from './GameTime'
import Player from '../music/player/Player'

export default function Header() {
  return (
    // <header className='w-full hidden sm:flex items-center justify-between pb-4'>
    <header className='w-full hidden sm:grid grid-cols-6 items-center pb-4'>
      <CurrentTime />
      <Player />
      <GameTime />
    </header>
  )
}
