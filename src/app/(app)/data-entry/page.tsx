import DataEntryForm from "@/components/data-entry-form";

export default function DataEntryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Data Entry</h1>
      </div>
      <div className="flex flex-1 rounded-lg shadow-sm">
        <DataEntryForm />
      </div>
    </div>
  )
}
