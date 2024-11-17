import { Metadata } from "next"
import { ContractOverview } from "@/components/dashboard/contract-overview"
import { ContractMetrics } from "@/components/dashboard/contract-metrics"
import { ProjectsHeader } from "@/components/dashboard/projects/projects-header"

export const metadata: Metadata = {
  title: "Stone Projects - Global Stone Trading Platform",
  description: "Manage your natural stone export projects",
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <ProjectsHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ContractMetrics />
      </div>
      <ContractOverview />
    </div>
  )
}