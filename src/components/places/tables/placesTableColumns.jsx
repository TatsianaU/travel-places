import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useRef } from 'react'

const statusLabelMap = {
  visited: 'Посещено',
  planned: 'Планируется',
  wishlist: 'В список желаний',
}

function SelectionCheckbox({ indeterminate, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [indeterminate, rest.checked])

  return (
    <input
      ref={ref}
      type="checkbox"
      {...rest}
    />
  )
}

const columnHelper = createColumnHelper()

export const placesTableColumns = [
  columnHelper.display({
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <SelectionCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <SelectionCheckbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.accessor('title', {
    header: 'Название',
    meta: { label: 'Название' },
    enableSorting: false,
  }),
  columnHelper.accessor('country', {
    header: 'Страна',
    meta: { label: 'Страна' },
    enableSorting: false,
  }),
  columnHelper.accessor('city', {
    header: 'Город',
    meta: { label: 'Город' },
    enableSorting: false,
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('status', {
    header: 'Статус',
    meta: { label: 'Статус' },
    enableSorting: false,
    cell: (info) => {
      const value = info.getValue()
      return value ? (statusLabelMap[value] ?? value) : '-'
    },
  }),
  columnHelper.accessor('visitedYear', {
    header: 'Год',
    meta: { label: 'Год' },
    enableSorting: false,
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('description', {
    header: 'Описание',
    meta: { label: 'Описание' },
    enableSorting: false,
    cell: (info) => {
      const value = info.getValue() ?? ''
      return value.length > 60 ? `${value.slice(0, 60)}...` : value
    },
  }),
]
