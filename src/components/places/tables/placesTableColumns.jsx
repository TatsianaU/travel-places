import { createColumnHelper } from '@tanstack/react-table'

const statusLabelMap = {
  visited: 'Посещено',
  planned: 'Планируется',
  wishlist: 'В список желаний',
}

const columnHelper = createColumnHelper()

export const placesTableColumns = [
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
]
