import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export default function DesktopLink({className, icon, text, setView, value}) {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors cursor-pointer hover:text-foreground md:h-8 md:w-8 ${className}`}
                 onClick={() => setView(value)}
                >
                {icon}
                <span className="sr-only">{text}</span>
                </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-background bg-foreground">{text}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}
