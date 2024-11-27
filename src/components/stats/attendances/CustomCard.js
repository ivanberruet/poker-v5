import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function CustomCard({title, description, value}) {
  return (
    <Card className="text-white border-muted w-full" x-chunk="charts-01-chunk-2">
      <CardHeader className="p-2">
        <CardTitle className="text-sm lg:text-xl text-center">{title}</CardTitle>
        <CardDescription className="text-center uppercase">{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 place-content-center p-4 pt-0">
        <span className="text-xl lg:text-[3rem] font-semibold">{value}</span>
      </CardContent>
    </Card>
)
}
