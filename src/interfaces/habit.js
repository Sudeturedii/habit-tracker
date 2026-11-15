/**
 * Bir alışkanlığın veri şeması.
 *
 * @typedef {Object} Habit
 * @property {string}   id              Benzersiz kimlik
 * @property {string}   name            Alışkanlık adı
 * @property {string}   category        CATEGORIES içindeki bir id
 * @property {string[]} completedDates  Tamamlanan günler ('YYYY-MM-DD')
 * @property {string}   createdAt       Oluşturulma günü ('YYYY-MM-DD')
 */

// Tailwind sınıfları tam yazılmalı ki derleme sırasında bulunabilsin.
export const CATEGORIES = [
  { id: 'saglik', label: 'Sağlık', dot: 'bg-emerald-600' },
  { id: 'ogrenme', label: 'Öğrenme', dot: 'bg-sky-600' },
  { id: 'is', label: 'İş', dot: 'bg-amber-500' },
  { id: 'kisisel', label: 'Kişisel', dot: 'bg-violet-600' },
]

export const getCategory = (id) =>
  CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[0]
