"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Eye, Building2, CalendarDays, CircleDollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    id: "PRJ2024-0123",
    title: "Dubai Marina Project",
    client: "Dubai Properties LLC",
    startDate: "15.10.2024",
    status: ["Partially Shipped", "3/5 Operations Complete"],
    metrics: {
      volume: "1,250 m²",
      weight: "98.5 tons",
      packages: "56 crates",
      value: "83,731.24 €",
      completion: 60
    }
  },
  {
    id: "PRJ2024-0124",
    title: "London Residential Complex",
    client: "UK Development Ltd",
    startDate: "20.10.2024",
    status: ["In Production", "1/4 Operations Complete"],
    metrics: {
      volume: "850 m²",
      weight: "67.2 tons",
      packages: "42 crates",
      value: "62,450.00 €",
      completion: 25
    }
  }
]

export function ContractOverview() {
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-4">
          <Image
            src="https://marmolturco.com/wp-content/uploads/2018/06/go2stone-siyah-logo@4x.png"
            alt="Go2Stone Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <div className="border-l pl-4">
            <h2 className="text-2xl font-semibold tracking-tight">Stone Projects</h2>
            <p className="text-sm text-muted-foreground">Active natural stone export projects</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="space-y-4">
              {/* Project Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <code className="relative rounded bg-muted px-[0.5rem] py-[0.2rem] font-mono text-sm">
                      {project.id}
                    </code>
                    <span>•</span>
                    <span>{project.client}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex flex-col gap-2">
                    {project.status.map((status, index) => (
                      <Badge 
                        key={index} 
                        variant={index === 0 ? "default" : "secondary"}
                        className="whitespace-nowrap"
                      >
                        {status}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Project Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2 p-3 rounded-lg bg-primary/10">
                  <div className="text-xs text-primary">Total Volume</div>
                  <div className="text-lg font-semibold">{project.metrics.volume}</div>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-primary/10">
                  <div className="text-xs text-primary">Total Weight</div>
                  <div className="text-lg font-semibold">{project.metrics.weight}</div>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-primary/10">
                  <div className="text-xs text-primary">Packages</div>
                  <div className="text-lg font-semibold">{project.metrics.packages}</div>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-primary/10">
                  <div className="text-xs text-primary">Project Value</div>
                  <div className="text-lg font-semibold">{project.metrics.value}</div>
                </div>
              </div>

              {/* Timeline and Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    Started {project.startDate}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CircleDollarSign className="h-4 w-4" />
                    {project.metrics.completion}% Complete
                  </div>
                </div>
                <Progress value={project.metrics.completion} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}