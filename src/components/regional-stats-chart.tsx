"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

type RegionalData = {
  name: string
  births: number
  deaths: number
}

export default function RegionalStatsChart({ data }: { data: RegionalData[] }) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
            data={data.slice(0, 10)} // Show top 10 for clarity
            margin={{
                top: 5,
                right: 10,
                left: -10,
                bottom: 5,
            }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
          <Bar dataKey="births" fill="hsl(var(--chart-1))" name="Births" radius={[4, 4, 0, 0]} />
          <Bar dataKey="deaths" fill="hsl(var(--chart-2))" name="Deaths" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
