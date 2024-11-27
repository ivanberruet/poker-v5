import React from 'react'
import { SheetTrigger } from '../ui/sheet'

export default function MobileLink({ icon, text, className, setView, value }) {
  return (
    <SheetTrigger asChild>
        <div className={`flex items-center gap-4 px-2.5 hover:text-foreground cursor-pointer ${className}`}
            onClick={() => setView(value)}
        >
            {icon}
            {text}
        </div>
    </SheetTrigger>
)
}
