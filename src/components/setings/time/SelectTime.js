import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SelectTime({state, setState, options, title}) {
  
  let optionValues = []  
  for (let i = options.from; i < options.to; i++) {
    optionValues.push(i)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{title}</Label>
      <Select defaultValue={state} onValueChange={(value)=>setState(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Nivel..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionValues.map((value) => {
              return (
                <SelectItem value={value} key={value}>
                  {value}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
