import { useState } from 'react'
import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'
import ProgressSummary from '../components/ProgressSummary'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { createId, formatLongDate, getToday } from '../utils/date'

export default function Home() {
  const [habits, setHabits] = useLocalStorage('habit-tracker:habits', [])
  const [editingId, setEditingId] = useState(null)

  const today = getToday()
  const editingHabit = habits.find((habit) => habit.id === editingId) ?? null
  const doneCount = habits.filter((habit) =>
    habit.completedDates.includes(today),
  ).length

  // EKLE
  const addHabit = ({ name, category }) => {
    const newHabit = {
      id: createId(),
      name,
      category,
      completedDates: [],
      createdAt: today,
    }
    setHabits((previous) => [...previous, newHabit])
  }

  // GÜNCELLE (ad / kategori)
  const updateHabit = (id, changes) => {
    setHabits((previous) =>
      previous.map((habit) => (habit.id === id ? { ...habit, ...changes } : habit)),
    )
  }

  // GÜNCELLE (bugün yapıldı / geri al)
  const toggleToday = (id) => {
    setHabits((previous) =>
      previous.map((habit) => {
        if (habit.id !== id) return habit
        const isDone = habit.completedDates.includes(today)
        return {
          ...habit,
          completedDates: isDone
            ? habit.completedDates.filter((date) => date !== today)
            : [...habit.completedDates, today],
        }
      }),
    )
  }

  // SİL
  const deleteHabit = (id) => {
    const habit = habits.find((item) => item.id === id)
    if (!window.confirm(`“${habit?.name}” silinsin mi?`)) return
    setHabits((previous) => previous.filter((item) => item.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const handleSubmit = (data) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, data)
      setEditingId(null)
    } else {
      addHabit(data)
    }
  }

  const startEditing = (id) => {
    setEditingId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-12 sm:py-16">
      <header>
        <p className="text-muted first-letter:uppercase">{formatLongDate()}</p>
        <h1 className="mt-1 font-display text-5xl font-semibold tracking-tight">
          Bugün
        </h1>
        <ProgressSummary total={habits.length} done={doneCount} />
      </header>

      <HabitForm
        key={editingHabit?.id ?? 'new'}
        editingHabit={editingHabit}
        onSubmit={handleSubmit}
        onCancel={() => setEditingId(null)}
      />

      <HabitList
        habits={habits}
        today={today}
        editingId={editingId}
        onToggle={toggleToday}
        onEdit={startEditing}
        onDelete={deleteHabit}
      />
    </main>
  )
}
