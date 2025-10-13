
"use client";

import { useState } from "react";
import { vitalData, nigerianStates } from "@/lib/data";
import type { VitalData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatsCard } from "@/components/stats-card";
import { Printer, Baby, Skull, TrendingUp, Scaling, Menu } from "lucide-react";
import { useSidebarContext } from "@/components/ui/sidebar-new";

type ReportData = {
  summary: {
    totalBirths: number;
    totalDeaths: number;
    netPopulationChange: number;
    birthDeathRatio: string;
  };
  insights: string[];
  tableData: VitalData[];
  tableHeaders: string[];
  previousYearData?: {
    totalBirths: number;
    totalDeaths: number;
  }
};

const years = Array.from(new Set(vitalData.map(d => d.year))).sort((a, b) => b - a);

export default function ReportsPage() {
  const { isMobile, setIsOpen } = useSidebarContext();
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [report, setReport] = useState<ReportData | null>(null);

  const generateReport = () => {
    // Data for the selected year and state for summary cards and insights
    const currentYearStateData = vitalData.filter(d => 
        d.year === selectedYear && (selectedState === "all" || d.state === selectedState)
    );
    const prevYearStateData = vitalData.filter(d => 
        d.year === selectedYear - 1 && (selectedState === "all" || d.state === selectedState)
    );

    const totalBirths = currentYearStateData.reduce((sum, d) => sum + d.births, 0);
    const totalDeaths = currentYearStateData.reduce((sum, d) => sum + d.deaths, 0);

    const prevTotalBirths = prevYearStateData.reduce((sum, d) => sum + d.births, 0);
    const prevTotalDeaths = prevYearStateData.reduce((sum, d) => sum + d.deaths, 0);

    const netPopulationChange = totalBirths - totalDeaths;
    const birthDeathRatio = totalDeaths > 0 ? `${(totalBirths / totalDeaths).toFixed(2)}:1` : "N/A";

    // Generate insights
    const insights = [];
    if (prevTotalBirths > 0) {
        const birthChange = ((totalBirths - prevTotalBirths) / prevTotalBirths) * 100;
        if (birthChange > 5) {
            insights.push(`Significant increase in births by ${birthChange.toFixed(1)}% from ${selectedYear - 1}.`);
        } else if (birthChange < -5) {
            insights.push(`Significant decrease in births by ${Math.abs(birthChange.toFixed(1))}% from ${selectedYear - 1}.`);
        } else {
            insights.push(`Birth rate remained relatively stable compared to ${selectedYear - 1}.`);
        }
    }
     if (netPopulationChange > 0) {
        insights.push(`There was a net population increase of ${netPopulationChange.toLocaleString()}.`);
     } else {
        insights.push(`There was a net population decrease of ${Math.abs(netPopulationChange).toLocaleString()}.`);
     }

    // Prepare table data and headers
    let tableData: VitalData[];
    let tableHeaders: string[];

    if (selectedState === "all") {
        tableData = vitalData.filter(d => d.year === selectedYear);
        tableHeaders = ['State', 'Births', 'Deaths'];
    } else {
        tableData = vitalData.filter(d => d.state === selectedState).sort((a, b) => b.year - a.year);
        tableHeaders = ['Year', 'Births', 'Deaths'];
    }

    setReport({
      summary: { totalBirths, totalDeaths, netPopulationChange, birthDeathRatio },
      insights,
      tableData,
      tableHeaders,
      previousYearData: {
        totalBirths: prevTotalBirths,
        totalDeaths: prevTotalDeaths
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          {isMobile && <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="sm:hidden mb-2"><Menu /></Button>}
          <h1 className="text-3xl font-bold font-headline">Generate Reports</h1>
          <p className="text-muted-foreground">Create detailed printable reports for specific regions and years.</p>
        </div>
      </div>
      
      <Card className="print:hidden">
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Select a year and state to generate a report.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Select onValueChange={(val) => setSelectedYear(parseInt(val))} defaultValue={selectedYear.toString()}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedState} defaultValue={selectedState}>
            <SelectTrigger className="w-full sm:w-[240px]">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Nigeria</SelectItem>
              {nigerianStates.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={generateReport} className="w-full sm:w-auto">Generate Report</Button>
        </CardContent>
      </Card>

      {report && (
        <div id="print-area">
          <Card id="report-content" className="print:shadow-none print:border-none print:p-0">
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle className="font-headline text-2xl mb-2">
                  Vital Statistics Report: {selectedState === "all" ? "Nigeria" : selectedState} - {selectedYear}
                </CardTitle>
                <CardDescription>Generated on {new Date().toLocaleDateString()}</CardDescription>
              </div>
              <Button variant="outline" size="icon" onClick={handlePrint} className="print:hidden">
                <Printer className="h-4 w-4" />
                <span className="sr-only">Print Report</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold font-headline mb-4">Executive Summary</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatsCard title="Total Births" value={report.summary.totalBirths.toLocaleString()} icon={Baby} description={`vs ${report.previousYearData?.totalBirths.toLocaleString() || 0} in ${selectedYear - 1}`} />
                  <StatsCard title="Total Deaths" value={report.summary.totalDeaths.toLocaleString()} icon={Skull} description={`vs ${report.previousYearData?.totalDeaths.toLocaleString() || 0} in ${selectedYear - 1}`} />
                  <StatsCard title="Net Population Change" value={report.summary.netPopulationChange.toLocaleString()} icon={TrendingUp} />
                  <StatsCard title="Birth to Death Ratio" value={report.summary.birthDeathRatio} icon={Scaling} />
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold font-headline mb-4">Key Insights</h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                      {report.insights.map((insight, index) => <li key={index}>{insight}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </section>
              
              <section>
                  <h3 className="text-lg font-semibold font-headline mb-4">Detailed Data</h3>
                  <div className="border rounded-lg">
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>{report.tableHeaders[0]}</TableHead>
                                  <TableHead className="text-right">{report.tableHeaders[1]}</TableHead>
                                  <TableHead className="text-right">{report.tableHeaders[2]}</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {report.tableData.length > 0 ? report.tableData.map((row) => (
                                  <TableRow key={selectedState === 'all' ? row.state : row.year}>
                                      <TableCell className="font-medium">{selectedState === 'all' ? row.state : row.year}</TableCell>
                                      <TableCell className="text-right">{row.births.toLocaleString()}</TableCell>
                                      <TableCell className="text-right">{row.deaths.toLocaleString()}</TableCell>
                                  </TableRow>
                              )) : (
                                  <TableRow>
                                      <TableCell colSpan={3} className="text-center">No data available for this selection.</TableCell>
                                  </TableRow>
                              )}
                          </TableBody>
                      </Table>
                  </div>
              </section>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
