"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DownloadCloud,
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Sample data
const items = [
  {
    packType: "Wooden Crate",
    packId: "PCK001",
    sku: "BM-P60X60",
    description: "Beige Marble Polished 60x60x2cm",
    quantity: 200,
    unit: "m²",
    weight: 2800,
    status: "Shipped"
  },
  {
    packType: "Wooden Crate",
    packId: "PCK002",
    sku: "BM-P60X60",
    description: "Beige Marble Polished 60x60x2cm",
    quantity: 150,
    unit: "m²",
    weight: 2100,
    status: "In Production"
  },
  {
    packType: "Wooden Crate",
    packId: "PCK003",
    sku: "BM-P30X60",
    description: "Beige Marble Polished 30x60x2cm",
    quantity: 100,
    unit: "m²",
    weight: 1400,
    status: "In Production"
  }
]

const ITEMS_PER_PAGE = 10

type SortConfig = {
  key: keyof typeof items[0] | null
  direction: 'asc' | 'desc'
}

const getStatusColor = (status: string) => {
  const colors = {
    "Shipped": "success",
    "In Production": "warning",
    "Pending": "secondary",
    "Delivered": "default"
  } as const
  return colors[status as keyof typeof colors] || "default"
}

export function OperationItems() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' })

  // Sorting function
  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
    }

    return sortConfig.direction === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })

  // Filtering function
  const filteredItems = sortedItems.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Calculate totals
  const totals = filteredItems.reduce((acc, item) => ({
    quantity: acc.quantity + item.quantity,
    weight: acc.weight + item.weight
  }), { quantity: 0, weight: 0 })

  // Sorting handler
  const handleSort = (key: keyof typeof items[0]) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  // Export to Excel handler
  const handleExport = () => {
    const headers = ['Pack Type', 'Pack ID', 'SKU', 'Description', 'Quantity', 'Unit', 'Weight (KG)', 'Status']
    const csvContent = [
      headers.join(','),
      ...filteredItems.map(item => [
        item.packType,
        item.packId,
        item.sku,
        `"${item.description}"`,
        item.quantity,
        item.unit,
        item.weight,
        item.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'operation-items.csv'
    link.click()
  }

  const SortButton = ({ column }: { column: keyof typeof items[0] }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 data-[state=open]:bg-accent"
      onClick={() => handleSort(column)}
    >
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  )

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-[250px]"
          />
        </div>
        <Button size="sm" onClick={handleExport}>
          <DownloadCloud className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">
                Pack Type
                <SortButton column="packType" />
              </TableHead>
              <TableHead>
                Pack ID
                <SortButton column="packId" />
              </TableHead>
              <TableHead>
                SKU
                <SortButton column="sku" />
              </TableHead>
              <TableHead className="min-w-[200px]">
                Description
                <SortButton column="description" />
              </TableHead>
              <TableHead className="text-right">
                Quantity
                <SortButton column="quantity" />
              </TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">
                Weight (KG)
                <SortButton column="weight" />
              </TableHead>
              <TableHead>
                Status
                <SortButton column="status" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.packId}>
                <TableCell>{item.packType}</TableCell>
                <TableCell>{item.packId}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell className="text-right">{item.weight.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right font-medium">Totals:</TableCell>
              <TableCell className="text-right font-medium">{totals.quantity.toLocaleString()}</TableCell>
              <TableCell />
              <TableCell className="text-right font-medium">{totals.weight.toLocaleString()}</TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length} items
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}