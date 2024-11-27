import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { computeStats, transformData } from "@/lib/stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useSelector } from "react-redux";
import CustomChart from "./CustomChart";
import CustomCard from "./CustomCard";


export default function Attendances() {
  const {history} = useSelector(state => state.history);
  const yealyStats = transformData(history);

  return (
    <div className="TestingChart | flex flex-col w-full h-full">
      <Tabs defaultValue={2024} className="w-full">
        <TabsList className="text-white flex gap-4 p-1 mb-4 bg-muted w-fit rounded-xl">
        {yealyStats.map((record,i) => {
          return (
            <TabsTrigger key={i} value={record.year} className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow text-xs sm:text-xl">
                {record.year}
            </TabsTrigger>
            )
          })}
        </TabsList>

        {yealyStats.map((record,i) => {
          
          const stats = computeStats(record.attendances);
          return (
            <TabsContent key={i} value={record.year}>
              <div className="flex flex-col sm:grid sm:grid-cols-3 w-full lg:w-[60%] h-full gap-6 ">

                <CustomCard title={"Mínimo"} description={new Date(stats.minDate).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })} value={stats.min} />
                <CustomCard title={"Promedio"} description={record.attendances.length+" torneos jugados"} value={stats.avg} />
                <CustomCard title={"Máximo"} description={new Date(stats.maxDate).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })} value={stats.max} />

                <CustomChart dataset={record.attendances} />

              </div>

            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
