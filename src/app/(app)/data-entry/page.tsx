import DataEntryForm from "@/components/data-entry-form";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebarContext } from "@/components/ui/sidebar-new";

const DataEntryPageClient = () => {
    "use client"
    const { isMobile, setIsOpen } = useSidebarContext();
    return(
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    {isMobile && <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="sm:hidden mb-2"><Menu /></Button>}
                    <h1 className="text-3xl font-bold font-headline">Data Entry</h1>
                    <p className="text-muted-foreground">Log new birth or death records.</p>
                </div>
            </div>
            <DataEntryForm />
        </div>
    )
}


export default function DataEntryPage() {
  return <DataEntryPageClient />;
}
