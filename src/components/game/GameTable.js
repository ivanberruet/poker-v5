import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
export default function GameTable({playerList}) {

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg w-full h-fit">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs lg:text-base text-white uppercase border-b border-gray-700">
          <tr>
            <th scope="col" className="p-2 lg:px-6 lg:pb-3 lg:pt-2">#</th>
            <th scope="col" className="p-2 lg:px-6 lg:pb-3 lg:pt-2">Nombre</th>
            <th scope="col" className="p-2 lg:px-6 lg:pb-3 lg:pt-2">
              <span className="md:hidden">x2</span>
              <span className="hidden md:inline-block">Reentrada</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-xs lg:text-base">
          {playerList.map((player, index) => {
            let className, position
            position = player.position			
            if(player.eliminatedTime){
              className = 'text-gray-400 line-through'
            }
            else{
              className = 'text-white'
            } 

            
            return (
              <tr key={index} className="border-b border-gray-700 font-semibold">
                <td className="px-2 lg:px-6 py-1 lg:py-3">{position}</td>
                <td className={`px-2 lg:px-6 py-1 lg:py-3 ${className}`} id={`${player.id}_td`}>{player.nick}</td>
                <td className="px-2 lg:px-6 py-1 lg:py-3">{player.reentry ? <FontAwesomeIcon icon={faCheck} className='text-green-600' /> : <FontAwesomeIcon icon={faXmark} className='text-red-700' />}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>  
  )
}
