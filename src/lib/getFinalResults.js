import timeDiff from "./timeDiff"

export default function getFinalResults(game, players, money){
  const date = game.date
  const startTime = game.startTime
  const endTime = game.endTime
  const winners = money.winners
  const pool = money.pool
  const percentages = money.prizes[winners-1]
  const winner = players.active[0]
  const eliminatedPlayers = players.eliminated
  console.log("eliminatedPlayers", eliminatedPlayers);
  

  let results = []

  //Winner row
  results.push([
      date, //Fecha
      startTime, //Hora de inicio
      endTime, //Hora de finalización
      1, //Posición
      winner.name, //Jugador
      winner.reentry ? 'Si' : 'No', //Reentrada
      winner.reentryTime, //Hora de reentrada
      null, //Hora de eliminación
      timeDiff(startTime,endTime), //Tiempo de juego
      pool*(percentages[0]/100) //Premio
  ])

  //Eliminated players rows
  for(let i = 0; i < eliminatedPlayers.length; i++){
      let row = [
          date, //Fecha
          startTime, //Hora de inicio
          endTime, //Hora de finalización
          eliminatedPlayers[i].position, //Posición
          eliminatedPlayers[i].name, //Jugador
          eliminatedPlayers[i].reentry ? 'Si' : 'No', //Reentrada
          eliminatedPlayers[i].reentryTime, //Hora de reentrada
          eliminatedPlayers[i].eliminatedTime, //Hora de eliminación
          timeDiff(startTime,eliminatedPlayers[i].eliminatedTime), //Tiempo de juego
          eliminatedPlayers[i].prize //Premio
      ]
      results.push(row)
  }
  
  return results
}
