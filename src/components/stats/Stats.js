import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Tournaments from './tournaments/Tournaments'
import Attendances from './attendances/Attendances'
import Podiums from './podiums/Podiums'
import Players from './players/Players'

export default function Stats() {
  return (
    <section className="w-full h-full flex-col">
      <div className="w-full flex flex-col gap-4 ">
        <Tabs defaultValue="Tournaments" className="w-full">
          <TabsList className="w-fit text-white flex gap-4 p-1 bg-muted rounded-xl mb-4 h-auto">
            <TabsTrigger value="Tournaments" className="text-xs sm:text-xl px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Torneos</TabsTrigger>
            <TabsTrigger value="Attendances" className="text-xs sm:text-xl px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Asistencias</TabsTrigger>
            <TabsTrigger value="Podiums" className="text-xs sm:text-xl px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Podios</TabsTrigger>
            <TabsTrigger value="Players" className="text-xs sm:text-xl px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Jugadores</TabsTrigger>
          </TabsList>

          <TabsContent value="Tournaments"><Tournaments /></TabsContent>
          <TabsContent value="Attendances"><Attendances /></TabsContent>
          <TabsContent value="Podiums"><Podiums /></TabsContent>
          <TabsContent value="Players"><Players /></TabsContent>
        </Tabs>    
      </div>
    </section>
  )
}
