"use client"

import { useMemo } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { VitalData } from "@/lib/data"

type ChartData = {
  year: string
  births: number
  deaths: number
}

export default function BirthDeathTrendChart({ data }: { data: VitalData[] }) {
  const chartData: ChartData[] = useMemo(() => {
    const yearlyData = data.reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = { births: 0, deaths: 0 }
      }
      acc[curr.year].births += curr.births
      acc[curr.year].deaths += curr.deaths
      return acc
    }, {} as Record<number, { births: number; deaths: number }>)

    return Object.entries(yearlyData).map(([year, values]) => ({
      year,
      ...values,
    }))
  }, [data])

  return (
    <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
            data={chartData}
            margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value as number)} />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Line type="monotone" dataKey="births" stroke="hsl(var(--chart-1))" strokeWidth={2} activeDot={{ r: 8 }} name="Births" />
            <Line type="monotone" dataKey="deaths" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Deaths" />
        </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
