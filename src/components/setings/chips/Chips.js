import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Available from './Available'
import Distribution from './Distribution'

export default function Chips() {
  

  return (
    <Accordion type="multiple" collapsible="true" className="w-full sm:w-[50%] flex flex-col py-3 lg:py-6 gap-3 sm:gap-6" defaultValue={["item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-base sm:text-xl pt-0">Fichas disponibles</AccordionTrigger>
        <AccordionContent>
          <Available />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="text-base sm:text-xl">Distribución</AccordionTrigger>
        <AccordionContent>
          <Distribution />
        </AccordionContent>
      </AccordionItem>
    </Accordion>  
  )
}
