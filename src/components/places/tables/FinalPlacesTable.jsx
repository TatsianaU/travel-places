import '../../PlaceTable/PlaceTable.css'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

import { placesTableColumns } from './placesTableColumns'

export default function FinalPlacesTable({ places }) {
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: places,
    columns: placesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (place) => place.id,
  })

  if (places.length === 0) {
    return <p className="place-table-empty">Ничего не найдено</p>
  }

  const selectedCount = table.getSelectedRowModel().rows.length

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

      <div className="places-table-footer">
        <span>Выбрано строк: {selectedCount}</span>
        {selectedCount > 0 && (
          <button
            type="button"
            className="places-table-reset"
            onClick={() => table.resetRowSelection()}
          >
            Сбросить выбор
          </button>
        )}
      </div>
    </div>
  )
}
