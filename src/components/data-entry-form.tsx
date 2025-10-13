"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { nigerianStates } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";


const birthFormSchema = z.object({
  state: z.string({ required_error: "Please select a state." }),
  gender: z.enum(["Male", "Female"], { required_error: "Please select a gender." }),
  dob: z.date({ required_error: "A date of birth is required." }),
});

const deathFormSchema = z.object({
  state: z.string({ required_error: "Please select a state." }),
  age: z.coerce.number().min(0, "Age must be a positive number."),
  dod: z.date({ required_error: "A date of death is required." }),
});

export default function DataEntryForm() {
  const { toast } = useToast();

  const birthForm = useForm<z.infer<typeof birthFormSchema>>({
    resolver: zodResolver(birthFormSchema),
  });

  const deathForm = useForm<z.infer<typeof deathFormSchema>>({
    resolver: zodResolver(deathFormSchema),
  });

  function onBirthSubmit(data: z.infer<typeof birthFormSchema>) {
    console.log(data);
    toast({
      title: "Birth Record Submitted",
      description: `A new birth record for ${data.state} has been logged.`,
    });
    birthForm.reset();
  }

  function onDeathSubmit(data: z.infer<typeof deathFormSchema>) {
    console.log(data);
    toast({
      title: "Death Record Submitted",
      description: `A new death record for ${data.state} has been logged.`,
    });
    deathForm.reset();
  }

  return (
    <Tabs defaultValue="birth" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="birth">Log a Birth</TabsTrigger>
        <TabsTrigger value="death">Log a Death</TabsTrigger>
      </TabsList>
      <TabsContent value="birth">
        <Card>
            <CardContent className="pt-6">
                <Form {...birthForm}>
                <form onSubmit={birthForm.handleSubmit(onBirthSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={birthForm.control}
                        name="state"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>State of Birth</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {nigerianStates.map(state => (
                                    <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={birthForm.control}
                        name="gender"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={birthForm.control}
                        name="dob"
                        render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of Birth</FormLabel>
                            <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                    <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Submit Birth Record</Button>
                </form>
                </Form>
            </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="death">
         <Card>
            <CardContent className="pt-6">
                <Form {...deathForm}>
                    <form onSubmit={deathForm.handleSubmit(onDeathSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={deathForm.control}
                            name="state"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>State of Death</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a state" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {nigerianStates.map(state => (
                                        <SelectItem key={state} value={state}>{state}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={deathForm.control}
                            name="age"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age at Death</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="Enter age" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={deathForm.control}
                            name="dod"
                            render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of Death</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                    />
                                </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>
                        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Submit Death Record</Button>
                    </form>
                </Form>
            </CardContent>
         </Card>
      </TabsContent>
    </Tabs>
  );
}
