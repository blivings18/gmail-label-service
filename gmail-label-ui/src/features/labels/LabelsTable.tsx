import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Label } from './api'
import { labelColumns } from './columns'

export function LabelsTable({ data }: { data: Label[] }) {
  const table = useReactTable({
    data,
    columns: labelColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {table.getHeaderGroups().map((hg) =>
            hg.headers.map((h) => (
              <th
                key={h.id}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
              >
                {flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            )),
          )}
        </tr>
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="px-4 py-2 text-sm text-gray-700 border-b"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
