import { useState } from 'react'
import { CATEGORIES } from '../interfaces/habit'

// Hem EKLE hem GÜNCELLE işlemi için kullanılır.
// editingHabit doluysa düzenleme modundadır.
export default function HabitForm({ editingHabit, onSubmit, onCancel }) {
  const isEditing = Boolean(editingHabit)
  const [name, setName] = useState(editingHabit?.name ?? '')
  const [category, setCategory] = useState(
    editingHabit?.category ?? CATEGORIES[0].id,
  )
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanName = name.trim()

    if (!cleanName) {
      setError('Alışkanlık adı boş olamaz.')
      return
    }

    onSubmit({ name: cleanName, category })
    setError('')
    if (!isEditing) setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10" noValidate>
      <h2 className="font-display text-lg font-semibold">
        {isEditing ? 'Alışkanlığı düzenle' : 'Yeni alışkanlık'}
      </h2>

      <label htmlFor="habit-name" className="sr-only">
        Alışkanlık adı
      </label>
      <input
        id="habit-name"
        type="text"
        value={name}
        maxLength={60}
        onChange={(event) => {
          setName(event.target.value)
          if (error) setError('')
        }}
        placeholder="Örn. Günde 2 litre su iç"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'habit-name-error' : undefined}
        className="mt-3 w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 placeholder:text-muted/70"
      />
      {error && (
        <p id="habit-name-error" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="habit-category" className="sr-only">
          Kategori
        </label>
        <select
          id="habit-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-line bg-surface px-3.5 py-2.5 sm:w-44"
        >
          {CATEGORIES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>

        <div className="flex flex-1 gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-accent px-4 py-2.5 font-medium text-white transition-colors hover:bg-accent/90"
          >
            {isEditing ? 'Değişiklikleri kaydet' : 'Alışkanlık ekle'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-line bg-surface px-4 py-2.5 font-medium transition-colors hover:bg-line/50"
            >
              Vazgeç
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
