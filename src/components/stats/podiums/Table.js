import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faTrophy } from '@fortawesome/free-solid-svg-icons'

export default function Table({sortedPlayers, players}) {
  
  return (
    <table className='w-full border border-collapse lg:w-auto'>
      <thead>
        <tr>
          <th className='border pl-1 text-lg lg:text-2xl lg:py-4 lg:px-6'>Jugador</th>
          <th className='border pl-1 text-lg lg:text-4xl lg:py-4 lg:px-6'><FontAwesomeIcon icon={faTrophy} className='text-gold px-1' /></th>
          <th className='border pl-1 text-lg lg:text-4xl lg:py-4 lg:px-6'><FontAwesomeIcon icon={faTrophy} className='text-silver px-1' /></th>
          <th className='border pl-1 text-lg lg:text-4xl lg:py-4 lg:px-6'><FontAwesomeIcon icon={faTrophy} className='text-bronze px-1' /></th>
        </tr>
      </thead>
      <tbody>
        {sortedPlayers.map((player, index) => (
          <tr key={index} className='text-base lg:text-xl'>
            <td className='px-3 py-1 border lg:px-4 lg:py-2'>{player} {index === 0  ? <FontAwesomeIcon icon={faCrown} className="text-gold ml-1" /> : null}</td>
            <td className='px-1 py-1 border text-center lg:px-4 lg:py-2'>{players[player].first}</td>
            <td className='px-1 py-1 border text-center lg:px-4 lg:py-2'>{players[player].second}</td>
            <td className='px-1 py-1 border text-center lg:px-4 lg:py-2'>{players[player].third}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
