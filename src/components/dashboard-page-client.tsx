
"use client";

import { useState, useMemo } from "react";
import type { VitalData } from "@/lib/data";
import { nigerianStates } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Baby, FileDown, Skull, TrendingUp, TrendingDown, Menu } from "lucide-react";
import BirthDeathTrendChart from "@/components/birth-death-trend-chart";
import RegionalStatsChart from "@/components/regional-stats-chart";
import NigeriaMap from "@/components/nigeria-map";
import { StatsCard } from "@/components/stats-card";


export default function DashboardPageClient({ data }: { data: VitalData[] }) {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return selectedState ? data.filter((d) => d.state === selectedState) : data;
  }, [data, selectedState]);
  
  const handleStateSelect = (state: string) => {
    setSelectedState(state === "all" ? null : state);
  };
  
  const handleDownloadReport = () => {
    const headers = ["Year", "State", "Births", "Deaths"];
    const csvRows = [headers.join(",")];
    const dataToExport = selectedState ? filteredData : data;

    dataToExport.forEach(row => {
        const values = [row.year, row.state, row.births, row.deaths];
        csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `vitalstats_report_${selectedState || 'nigeria'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentYear = 2024;
  const previousYear = 2023;

  const summary = useMemo(() => {
    const currentYearData = filteredData.filter(d => d.year === currentYear);
    const prevYearData = filteredData.filter(d => d.year === previousYear);

    const totalBirths = currentYearData.reduce((sum, d) => sum + d.births, 0);
    const totalDeaths = currentYearData.reduce((sum, d) => sum + d.deaths, 0);
    
    const prevTotalBirths = prevYearData.reduce((sum, d) => sum + d.births, 0);

    const birthTrend = prevTotalBirths > 0 ? (((totalBirths - prevTotalBirths) / prevTotalBirths) * 100).toFixed(1) : "0.0";
    
    const totalPopulation = totalBirths + totalDeaths;
    return {
      totalBirths,
      totalDeaths,
      birthRate: totalPopulation > 0 ? (totalBirths / totalPopulation * 100).toFixed(1) + "%" : "0.0%",
      deathRate: totalPopulation > 0 ? (totalDeaths / totalPopulation * 100).toFixed(1) + "%" : "0.0%",
      birthTrend: `${birthTrend}%`,
      birthTrendDirection: parseFloat(birthTrend) >= 0 ? "up" : "down",
    };
  }, [filteredData]);
  
  const regionalData = useMemo(() => {
    const yearData = data.filter(d => d.year === currentYear);
    return nigerianStates.map(state => {
        const stateData = yearData.find(d => d.state === state);
        return {
            name: state,
            births: stateData?.births || 0,
            deaths: stateData?.deaths || 0,
        }
    }).sort((a, b) => b.births - a.births);
  }, [data]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">
            {selectedState ? `${selectedState} State` : "National Overview"}
          </h1>
          <p className="text-muted-foreground">
            Welcome to the VitalStats NG dashboard.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select onValueChange={handleStateSelect} defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Nigeria</SelectItem>
              {nigerianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleDownloadReport}>
            <FileDown className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Births (2024)"
          value={summary.totalBirths.toLocaleString()}
          icon={Baby}
          trend={`${summary.birthTrend} from last year`}
          trendDirection={summary.birthTrendDirection as 'up' | 'down'}
        />
        <StatsCard
          title="Total Deaths (2024)"
          value={summary.totalDeaths.toLocaleString()}
          icon={Skull}
        />
        <StatsCard
          title="Birth Rate"
          value={summary.birthRate}
          icon={TrendingUp}
        />
        <StatsCard
          title="Death Rate"
          value={summary.deathRate}
          icon={TrendingDown}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Yearly Trends {selectedState ? `(${selectedState})`: ''}</CardTitle>
                <CardDescription>Birth and death trends from 2020-2024.</CardDescription>
            </CardHeader>
            <CardContent>
                <BirthDeathTrendChart data={filteredData} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Regional Map</CardTitle>
                <CardDescription>Click on a state to view its statistics.</CardDescription>
            </CardHeader>
            <CardContent>
                 <NigeriaMap data={regionalData} selectedState={selectedState} onStateClick={handleStateSelect} />
            </CardContent>
        </Card>
      </div>
      
       <Card>
          <CardHeader>
            <CardTitle>Regional Breakdown (2024)</CardTitle>
            <CardDescription>Comparison of births and deaths across the top 10 states.</CardDescription>
          </CardHeader>
          <CardContent>
            <RegionalStatsChart data={regionalData} />
          </CardContent>
        </Card>
    </div>
  );
}
