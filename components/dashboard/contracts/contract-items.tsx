"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

const getStatusColor = (status: string) => {
  const colors = {
    "Shipped": "success",
    "In Production": "warning",
    "Pending": "secondary",
    "Delivered": "default"
  } as const
  return colors[status as keyof typeof colors] || "default"
}

export function ContractItems() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pack Type</TableHead>
            <TableHead>Pack ID</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Weight (KG)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.packId}>
              <TableCell>{item.packType}</TableCell>
              <TableCell>{item.packId}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}