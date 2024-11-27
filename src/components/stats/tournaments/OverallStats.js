import React from 'react'
import { calculateOverallTournamentsStats } from '@/lib/stats'
import { Card, CardContent } from '@/components/ui/card'

export default function OverallStats({data}) {
  const stats = calculateOverallTournamentsStats(data)

  return (
    <Card className="w-fit border-muted">
      <CardContent className="flex gap-6 sm:gap-12 p-4">
        <div className="grid auto-rows-min gap-2">
            <div className="text-sm text-muted-foreground">Torneos disputados</div>
            <div className="flex items-baseline gap-1 text-lg sm:text-3xl font-bold tabular-nums leading-none">
                {stats.totalTournaments}
            </div>
        </div>
        <div className="grid auto-rows-min gap-1">
            <div className="text-sm text-muted-foreground">Duración promedio</div>
            <div className="flex items-baseline gap-1 text-lg sm:text-3xl font-bold tabular-nums leading-none">
            {Math.floor(stats.averageLength)} h {Math.floor((stats.averageLength - Math.floor(stats.averageLength)) * 60)} m
            </div>
        </div>
        <div className="grid auto-rows-min gap-1">
            <div className="text-sm text-muted-foreground">Reentradas promedio</div>
            <div className="flex items-baseline gap-1 text-lg sm:text-3xl font-bold tabular-nums leading-none">
              {stats.averageReentries}
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
