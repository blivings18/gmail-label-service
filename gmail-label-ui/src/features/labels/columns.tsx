import { ColumnDef } from '@tanstack/react-table'
import { Label } from './api'

export const labelColumns: ColumnDef<Label>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: (info) => info.getValue<string>(),
  },
]
