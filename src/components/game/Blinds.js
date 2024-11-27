import React from 'react'
import { useSelector } from 'react-redux'

export default function Blinds({level, status}) {
  const { smallBlind, bigBlind } = useSelector((state) => state?.structure?.blinds[level]);
  
  return (
    <div className={`h-fit flex-1 flex flex-col gap-2 justify-start ${status=="current" ? "" : "lg:text-right opacity-20" }`}>
      <div className={`flex lg:flex-col items-center lg:justify-start w-full font-semibold ${status=="current" ? "lg:items-start" : "lg:items-end"}`}>
        <h1 className={`w-full text-2xl xl:text-3xl self-center ${status=="current" ? "lg:pb-2" : "pb-2"}`}>Ciega Grande</h1>
        <p className='text-3xl lg:text-8xl'>{`${bigBlind}`}</p>
      </div>
      <div className={`flex lg:flex-col items-center lg:justify-start w-full font-semibold ${status=="current" ? "lg:items-start" : "lg:items-end"}`}>
        <h1 className={`w-full text-2xl xl:text-3xl self-center ${status=="current" ? "lg:pb-2" : "pb-2"}`}>Ciega Pequeña</h1>
        <p className='text-3xl lg:text-8xl'>{`${smallBlind}`}</p>
      </div>
    </div>
  )
}
