import './Pagination.css'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, pages, items, onPageChange }) {
  if (pages <= 1) {
    return null
  }

  const isFirstPage = page <= 1
  const isLastPage = page >= pages

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(page - 1)}
        disabled={isFirstPage}
        aria-label="Назад"
      >
        <ChevronLeft size={16} />
        Назад
      </button>

      <span className="pagination-info">
        Страница {page} из {pages} — всего {items}
      </span>

      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(page + 1)}
        disabled={isLastPage}
        aria-label="Вперёд"
      >
        Вперёд
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
