import '../../PlaceTable/PlaceTable.css'
import './FinalPlacesTable.css'

import * as Popover from '@radix-ui/react-popover'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

import { placesTableColumns } from './placesTableColumns'
import { useColumnVisibilityStorage } from './placesTableStorage'

export default function FinalPlacesTable({ places }) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useColumnVisibilityStorage()

  const table = useReactTable({
    data: places,
    columns: placesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      columnVisibility,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    getRowId: (place) => place.id,
  })

  if (places.length === 0) {
    return <p className="place-table-empty">Ничего не найдено</p>
  }

  const selectedCount = table.getSelectedRowModel().rows.length

  const hiddenColumns = table.getAllLeafColumns().filter((column) => column.getCanHide() && !column.getIsVisible())

  const hiddenCount = hiddenColumns.length

  const hiddenLabels = hiddenColumns.map((column) => column.columnDef.meta?.label ?? column.id).join(', ')

  return (
    <div className="place-table-wrapper">
      <div className="places-table-toolbar">
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              type="button"
              className="places-table-columns-trigger"
            >
              Колонки
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="places-table-columns-content"
              aria-label="Настройки колонок"
              align="end"
              sideOffset={6}
              collisionPadding={8}
            >
              <Popover.Arrow className="places-table-columns-arrow" />
              <div className="places-table-columns-list">
                {table.getAllLeafColumns().map((column) => {
                  if (!column.getCanHide()) {
                    return null
                  }

                  return (
                    <label
                      key={column.id}
                      className="places-table-columns-item"
                    >
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                      {column.columnDef.meta?.label ?? column.id}
                    </label>
                  )
                })}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {hiddenCount > 0 && (
          <div className="places-table-hidden-hint">
            <span>Скрыто колонок: {hiddenCount}</span>
            {hiddenLabels && <span>Скрыто: {hiddenLabels}</span>}
          </div>
        )}
      </div>

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
