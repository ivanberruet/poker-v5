import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import Players from './players/Players'
import Money from './money/Money'
import Time from './time/Time'
import Chips from './chips/Chips'

export default function Settings() {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <Tabs defaultValue="Players" className="w-full">
        <TabsList className="w-fit text-white flex gap-4 p-1 bg-muted rounded-xl mb-4 text-xs sm:text-xl">
          <TabsTrigger value="Players" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Jugadores</TabsTrigger>
          <TabsTrigger value="Money" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Dinero</TabsTrigger>
          <TabsTrigger value="Time" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Tiempo</TabsTrigger>
          <TabsTrigger value="Chips" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Fichas</TabsTrigger>
        </TabsList>

        <TabsContent value="Players"><Players /></TabsContent>
        <TabsContent value="Money"><Money /></TabsContent>
        <TabsContent value="Time"><Time /></TabsContent>
        <TabsContent value="Chips"><Chips /></TabsContent>
          
      </Tabs>    
    </div>
  )
}
