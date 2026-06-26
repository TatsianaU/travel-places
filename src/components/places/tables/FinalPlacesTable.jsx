import '../../PlaceTable/PlaceTable.css'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { placesTableColumns } from './placesTableColumns'

export default function FinalPlacesTable({ places }) {
  const table = useReactTable({
    data: places,
    columns: placesTableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (places.length === 0) {
    return <p className="place-table-empty">Ничего не найдено</p>
  }

  return (
    <div className="place-table-wrapper">
      <table className="place-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
