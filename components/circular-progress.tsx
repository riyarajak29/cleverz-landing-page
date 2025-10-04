"use client"

type CircularProgressProps = {
  value: number
  size?: number
  strokeWidth?: number
  trackClassName?: string
  progressClassName?: string
  label?: string
}

export function CircularProgress({
  value,
  size = 96,
  strokeWidth = 8,
  trackClassName = "stroke-(--border)",
  progressClassName = "stroke-(--primary)",
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, value))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={trackClassName}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.25}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={progressClassName}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div className="text-sm font-medium">
          {Math.round(clamped)}%{label ? <div className="text-xs text-muted-foreground">{label}</div> : null}
        </div>
      </div>
    </div>
  )
}
