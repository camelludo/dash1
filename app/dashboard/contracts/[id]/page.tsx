import { Metadata } from "next"
import { ContractHeader } from "@/components/dashboard/contracts/contract-header"
import { ContractInfo } from "@/components/dashboard/contracts/contract-info"
import { ContractMetricsGrid } from "@/components/dashboard/contracts/contract-metrics-grid"
import { ContractCalendar } from "@/components/dashboard/contracts/contract-calendar"
import { ContractItems } from "@/components/dashboard/contracts/contract-items"
import { ContractOperations } from "@/components/dashboard/contracts/contract-operations"
import { ContractFinancials } from "@/components/dashboard/contracts/contract-financials"
import { ContractDocuments } from "@/components/dashboard/contracts/contract-documents"
import { ContractQC } from "@/components/dashboard/contracts/contract-qc"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Contract Details - Global Stone Trading Platform",
  description: "View and manage contract details",
}

// This generates the static paths for all contract IDs at build time
export function generateStaticParams() {
  // In a real app, this would fetch from your API/database
  return [
    { id: 'PRJ2024-0123' },
    { id: 'PRJ2024-0124' },
  ]
}

export default function ContractDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-8">
      <ContractHeader />
      <ContractInfo />
      <ContractMetricsGrid />
      
      <Tabs defaultValue="items" className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-8">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="qc">Quality Control</TabsTrigger>
        </TabsList>
        
        <TabsContent value="items" className="mt-6">
          <ContractItems />
        </TabsContent>
        
        <TabsContent value="operations" className="mt-6">
          <ContractOperations />
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <ContractCalendar />
        </TabsContent>
        
        <TabsContent value="financials" className="mt-6">
          <ContractFinancials />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <ContractDocuments />
        </TabsContent>
        
        <TabsContent value="qc" className="mt-6">
          <ContractQC />
        </TabsContent>
      </Tabs>
    </div>
  )
}