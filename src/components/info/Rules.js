import React from 'react'
import { useSelector } from 'react-redux';

export default function Rules() {
  const {entry, reentry, winners, prizes} = useSelector((state) => state?.money)
  const {perLevel} = useSelector((state) => state?.time)

  let options = Array.from({ length: winners }, (_, i) => i + 1);

  return (
    <div className='flex flex-col py-3 lg:py-6 gap-3 sm:gap-6'>
      <div className='w-full underline underline-offset-4 lg:text-3xl'>Información del torneo</div>
      <ul className='flex flex-col text-sm lg:text-xl gap-2 sm:gap-5'>
				<li className='list-inside list-disc marker:text-xl py-1 pt-2'>Modalidad de juego Texas Hold'em, dos cartas en mano (preflop) y 5 en mesa (flop, turn y river).</li>
				<li className='list-inside list-disc marker:text-xl py-1'>Valor de la entrada {new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS', maximumFractionDigits: 0}).format(entry)}.</li>
				<li className='list-inside list-disc marker:text-xl py-1'>1 reingreso por jugador permitido hasta antes de quedar solo 2 jugadores en juego ({new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS', maximumFractionDigits: 0}).format(reentry)} el reingreso).</li>
				<li className='list-inside list-disc marker:text-xl py-1'>Cada jugador inicia con un mínimo de 1500 en fichas (150 BB). Pueden ser más dependiendo de la cantidad de jugadores.</li>
				<li className='list-inside list-disc marker:text-xl py-1'>Incremento de ciegas cada {perLevel} minutos.</li>
				<li className='list-inside list-disc marker:text-xl py-1'>El pozo se conforma con la entrada de los jugadores y se le incorpora cada reingreso que se efectúe.</li>
				{
          options.map((_, i) => (
					  <li key={i} className='list-inside list-disc marker:text-xl py-1'>Al {i+1}° Puesto se le otorga un premio del {prizes[winners-1][i]}% del pozo.</li>
            ))
        }

				<li className='list-inside list-disc marker:text-xl py-1 pb-2'>Todos amigos y gente cercana, ambiente muy tranquilo.</li>
			</ul>
    </div>
  )
}
