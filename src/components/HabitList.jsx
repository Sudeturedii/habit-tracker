import HabitCard from './HabitCard'

// LİSTELE işlemi: alışkanlıkları sırayla gösterir.
export default function HabitList({
  habits,
  today,
  editingId,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (habits.length === 0) {
    return (
      <p className="mt-10 max-w-sm text-muted">
        Henüz alışkanlık eklemedin. Yukarıdaki formdan ilkini ekle, örneğin
        “Her gün 20 dakika kitap oku”.
      </p>
    )
  }

  return (
    <ul className="mt-10 divide-y divide-line border-y border-line">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isDoneToday={habit.completedDates.includes(today)}
          isEditing={habit.id === editingId}
          onToggle={() => onToggle(habit.id)}
          onEdit={() => onEdit(habit.id)}
          onDelete={() => onDelete(habit.id)}
        />
      ))}
    </ul>
  )
}
