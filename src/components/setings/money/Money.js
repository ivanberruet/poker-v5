import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { setEntry, setReentry, setWinners } from '@/reducers/moneySlice';

export default function Money() {
  const dispatch = useDispatch();
  const optionValues = [5,6,7,8,9,10,11,12,13,14,15]
  const {entry, reentry, winners} = useSelector((state) => state?.money)


  return (
    <div className='flex flex-col py-3 lg:py-6 gap-6'>
      {/* Entry */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Valor de la entrada</Label>
        <Select defaultValue={entry} onValueChange={(value)=>dispatch(setEntry(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Entrada..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {optionValues.map((value) => {
                return (
                  <SelectItem value={value*1000} key={value*1000}>
                    {Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS', maximumFractionDigits: 0}).format(value*1000)}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Reentry */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Valor de la reentrada</Label>
        <Select defaultValue={reentry} onValueChange={(value)=>dispatch(setReentry(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Reentrada..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {optionValues.map((value) => {
                return (
                  <SelectItem value={value*1000} key={value*1000}>
                    {Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS', maximumFractionDigits: 0}).format(value*1000)}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
        
      {/* Winners */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Cantidad de ganadores</Label>
        <Select defaultValue={winners} onValueChange={(value)=>dispatch(setWinners  (value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ganadores" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={1}>1</SelectItem>
              <SelectItem value={2}>2</SelectItem>
              <SelectItem value={3}>3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>


    </div>  
  )
}
