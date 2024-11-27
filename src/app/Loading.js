import React, { useEffect, useState } from 'react'

export default function Loading() {
  const messages = [
    'Cargando...',
    'Ya casi...',
    'Solo un poco más...',
    'Gracias por esperar...',
  ]
  const [ text, setText ] = useState(messages[0])

  setInterval(() => {
    const index = Math.floor(Math.random() * messages.length)
    setText(messages[index])
  }, 5000)

  return (
    <div className='min-h-screen bg-background flex flex-col justify-center items-center'>
      {/* Loader */}
      <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
      <p className='text-white p-4 text-xl'>{text}</p>
    </div>
  )
}
