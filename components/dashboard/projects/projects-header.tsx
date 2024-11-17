"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, FileDown, FileUp } from "lucide-react"

export function ProjectsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stone Projects</h1>
        <p className="text-muted-foreground">
          Manage your natural stone export projects
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <FileUp className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  )
}