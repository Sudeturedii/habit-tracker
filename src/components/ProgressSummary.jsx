export default function ProgressSummary({ total, done }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between text-sm">
        <p className="font-medium">
          {total === 0 ? 'Henüz alışkanlık yok' : `${done} / ${total} tamamlandı`}
        </p>
        {total > 0 && <p className="text-muted">%{percent}</p>}
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label="Bugünkü ilerleme"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
