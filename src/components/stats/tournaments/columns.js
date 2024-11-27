export const columns = [
  // date
  {
    accessorKey: "date",
    header: "Fecha",
  },
  // position
  {
      accessorKey: "position",
      header: "Posición",
      cell: ({ row }) => {
          const position = row.getValue("position")
          if(position === "1") return <div className="font-medium text-yellow-500">{position}°</div>
          else if(position === "2") return <div className="font-medium text-gray-300">{position}°</div>
          else if(position === "3") return <div className="font-medium text-amber-900">{position}°</div>
          else return <div className="font-medium text-gray-500">{position}°</div>
        },
  },
  // player'
  {
      accessorKey: "player",
      header: "Jugador",
  },
  // reentry
  {
      accessorKey: "reEntry",
      header: "Reentrada",
  },]
