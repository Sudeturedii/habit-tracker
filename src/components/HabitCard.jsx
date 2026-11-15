import { getCategory } from '../interfaces/habit'

// Tek bir alışkanlık satırı: tamamlama, düzenleme (GÜNCELLE) ve SİL butonları burada.
export default function HabitCard({
  habit,
  isDoneToday,
  isEditing,
  onToggle,
  onEdit,
  onDelete,
}) {
  const category = getCategory(habit.category)

  return (
    <li
      className={`flex items-center gap-4 py-4 ${
        isEditing ? '-mx-3 rounded-lg bg-accent-soft px-3' : ''
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isDoneToday}
        aria-label={`${habit.name}: ${
          isDoneToday ? 'bugün yapıldı, geri al' : 'bugün yapıldı olarak işaretle'
        }`}
        className={`grid size-9 shrink-0 place-items-center rounded-full border-2 transition-colors ${
          isDoneToday
            ? 'border-accent bg-accent text-white'
            : 'border-line bg-surface text-transparent hover:border-accent'
        }`}
      >
        <svg
          viewBox="0 0 20 20"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4.5 10.5l3.5 3.5 7.5-8" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`break-words font-medium ${
            isDoneToday ? 'text-muted line-through' : ''
          }`}
        >
          {habit.name}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
          <span
            className={`size-2 rounded-full ${category.dot}`}
            aria-hidden="true"
          />
          {category.label}
        </p>
      </div>

      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-line/60 hover:text-ink"
        >
          Düzenle
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-line/60 hover:text-danger"
        >
          Sil
        </button>
      </div>
    </li>
  )
}
