"use client"

type HeatmapProps = {
  data: number[] // values 0..5
  weeks?: number // default 8
}

function intensityClass(v: number) {
  if (v <= 0) return "bg-(--muted)"
  if (v === 1) return "bg-[color-mix(in_oklab,var(--primary)_20%,transparent)]"
  if (v === 2) return "bg-[color-mix(in_oklab,var(--primary)_35%,transparent)]"
  if (v === 3) return "bg-[color-mix(in_oklab,var(--primary)_50%,transparent)]"
  if (v === 4) return "bg-[color-mix(in_oklab,var(--primary)_70%,transparent)]"
  return "bg-(--primary)"
}

export function Heatmap({ data, weeks = 8 }: HeatmapProps) {
  const days = weeks * 7
  const arr = data.slice(-days)
  const cols: number[][] = []
  for (let w = 0; w < weeks; w++) {
    const start = w * 7
    cols.push(arr.slice(start, start + 7))
  }

  return (
    <div className="flex gap-1" role="grid" aria-label="Study activity heatmap">
      {cols.map((col, i) => (
        <div key={i} className="flex flex-col gap-1" role="row">
          {col.map((v, j) => (
            <div key={j} className={`h-3 w-3 rounded ${intensityClass(v)}`} aria-label={`Day ${i * 7 + j + 1}: ${v}`} />
          ))}
        </div>
      ))}
    </div>
  )
}
