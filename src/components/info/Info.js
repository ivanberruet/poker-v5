import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Rules from './Rules'
import Structure from './Structure'

export default function Info() {
  return (
    <div className="w-full flex flex-col gap-4">
        <Tabs defaultValue="rules" className="w-full">
             <TabsList className="w-fit text-white flex gap-4 p-1 bg-muted rounded-xl mb-4 text-xs sm:text-xl">
                <TabsTrigger value="rules" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Reglamento</TabsTrigger>
                <TabsTrigger value="structure" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Estructura</TabsTrigger>
            </TabsList>

            <TabsContent value="rules"><Rules /></TabsContent>
            <TabsContent value="structure"><Structure /></TabsContent>
            
        </Tabs>    
    </div>
  )
}
