import React from 'react'
import SelectTime from './SelectTime'
import { useDispatch, useSelector } from 'react-redux'

export default function Time() {
  const dispatch = useDispatch()
  const {perLevel, currentLevel} = useSelector(state => state.time)
  const changePerLevel = (payload) => dispatch({type: 'time/setPerLevel', payload})
  const changeCurrentLevel = (payload) => dispatch({type: 'time/setCurrentLevel', payload})

  return (
    <div className='flex flex-col py-3 lg:py-6 gap-6'>
      <SelectTime 
        title='Tiempo por nivel' 
        state={perLevel} 
        setState={changePerLevel} 
        options={{from:10, to:20}} 
      />
      <SelectTime 
        title='Nivel actual' 
        state={currentLevel} 
        setState={changeCurrentLevel} 
        options={{from:1, to:30}} 
      />
    </div>
  )
}
