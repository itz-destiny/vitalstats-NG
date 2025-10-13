
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendDirection?: "up" | "down";
  description?: string;
};

export function StatsCard({ title, value, icon: Icon, trend, trendDirection, description }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
           <p className="text-xs text-muted-foreground flex items-center">
            {trendDirection === 'up' ? <TrendingUp className="mr-1 h-4 w-4 text-green-500"/> : <TrendingDown className="mr-1 h-4 w-4 text-red-500" />}
            {trend}
          </p>
        )}
        {description && !trend && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
