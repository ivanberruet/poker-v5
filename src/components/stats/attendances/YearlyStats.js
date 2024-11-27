import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aggregateHistoryByDate, getYearlyStats } from "@/lib/stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useSelector } from "react-redux";

export default function YearlyStats() {
  const {history} = useSelector(state => state.history);
  const dataset = aggregateHistoryByDate(history);
  const yealyStats = getYearlyStats(dataset);

  return (
    <div className="TestingChart | flex flex-col w-full h-full">
      <Tabs defaultValue="2024" className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <p className="text-xl sm:text-3xl font-semibold">Estadísticas por año</p>
          <TabsList className="text-white flex gap-4 p-1 bg-muted w-fit rounded-xl">
          {yealyStats.map((record,i) => {
            return (
              <TabsTrigger key={i} value={record.year} className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
                  {record.year}
              </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {yealyStats.map((record,i) => {
          return (
            <TabsContent key={i} value={record.year}>
                <div className="grid grid-cols-1 sm:grid-cols-3 w-full h-full gap-6 ">
                  <Card className="text-white border-muted" x-chunk="charts-01-chunk-2">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-3xl text-center">Mínimo</CardTitle>
                      <CardDescription className="text-center uppercase">{new Date(record.min.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 place-content-center">
                      <span className="text-5xl sm:text-[6rem]">{record.min.value}</span>
                    </CardContent>
                  </Card>

                  <Card className="text-white border-muted" x-chunk="charts-01-chunk-2">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-3xl text-center">Promedio</CardTitle>
                      <CardDescription className="text-center uppercase">{record.avg.total} torneos jugados</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 place-content-center">
                      <span className="text-5xl sm:text-[6rem]">{record.avg.value}</span>
                    </CardContent>
                  </Card>

                  <Card className="text-white border-muted" x-chunk="charts-01-chunk-2">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-3xl text-center">Máximo</CardTitle>
                      <CardDescription className="text-center uppercase">{new Date(record.max.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 place-content-center">
                      <span className="text-5xl sm:text-[6rem]">{record.max.value}</span>
                    </CardContent>
                  </Card>
                </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
