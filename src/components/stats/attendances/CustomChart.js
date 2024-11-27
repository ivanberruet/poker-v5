import { useEffect, useRef } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Chart } from "chart.js/auto";
import { computeStats } from "@/lib/stats";

export default function CustomChart({dataset}) {
  const sm = useMediaQuery('(min-width:640px)');
  const chartRef = useRef(null)
  

  useEffect(() => {
    // Date format for chart
    const data = {
      labels: dataset.map(row => new Date(row.date).toLocaleDateString("es-ES", { month: "short" }).toUpperCase() + " " + new Date(row.date).getFullYear().toString().substring(2)),
      datasets: [{
        label: "Jugadores",
        data: dataset.map(row => row.players),
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "hsl(220 70% 50%)",
      }]
    }

    // Chart
    if(chartRef.current) {
      if(chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }

      const context = chartRef.current.getContext("2d");
      const newChart = new Chart(context,{
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 2,
          scales: {
            x: {
              grid:{
                display: false
              },
              ticks:{
                minRotation: 45,
              }
            },
            y: {
              grid:{
                color: 'hsl(240 3.7% 15.9%)',
                drawTicks: false,
              },
            }
          },
          plugins: {
            title: {
              display: true,
              text: "Asistencias por torneo",
              color: 'white',
              align: 'start',
              padding: {bottom: 20},
              font:{size: sm ? 30 : 24}
            },
            // subtitle: {
            //   display: true,
            //   text: playersStats.map(stat => `${stat.title}: ${stat.value}`).join(' | '),
            //   color: 'white',
            //   align: 'center',
            //   padding: {bottom: 20},
            //   font:{size: sm ? 20 : 12}
            // },
            legend: {
              display: false
            },
            tooltip: {
              callbacks:{
                title: (context) => {
                  const date = new Date(dataset[context[0].dataIndex].date)
                  let day = date.toLocaleDateString("es-ES", { day: "numeric" })
                  let month = date.toLocaleDateString("es-ES", { month: "long" })
                  month = month.charAt(0).toUpperCase() + month.slice(1);
                  let year = date.getFullYear()

                  return `${day} de ${month} de ${year}`
                }
              }
            }
          },
          layout: {
            padding: 24
          }
        }
      });
      chartRef.current.chart = newChart
    }
  },[])

  
return (
  <div className=" sm:col-span-3 w-full h-[20rem] flex flex-col">
    {/* <div className="Attendances |!relative h-[20rem] sm:h-[30rem] w-[auto]  "> */}
    <div className="!relative w-full h-full sm:h-auto ">
      <canvas ref={chartRef}  className=" h-full w-full border border-muted rounded-xl" />
    </div>
  </div>
)
}
