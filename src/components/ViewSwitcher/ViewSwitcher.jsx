import './ViewSwitcher.css'

import { LayoutGrid, TableIcon } from 'lucide-react'

export default function ViewSwitcher({ value, onChange }) {
  return (
    <div className="view-switcher">
      <button
        type="button"
        className={`view-switcher-button ${value === 'cards' ? 'view-switcher-button--active' : ''}`}
        onClick={() => onChange('cards')}
        aria-label="Показать карточки"
      >
        <LayoutGrid size={16} />
      </button>

      <button
        type="button"
        className={`view-switcher-button ${value === 'table' ? 'view-switcher-button--active' : ''}`}
        onClick={() => onChange('table')}
        aria-label="Показать таблицу"
      >
        <TableIcon size={16} />
      </button>
    </div>
  )
}
