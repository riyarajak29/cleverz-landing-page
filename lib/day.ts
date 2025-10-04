export function getDayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 0)
  const diff = d.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function getMonthMatrix(d: Date) {
  const year = d.getFullYear()
  const month = d.getMonth()
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const matrix: (Date | null)[][] = []
  let week: (Date | null)[] = new Array(first.getDay()).fill(null)

  for (let day = 1; day <= last.getDate(); day++) {
    week.push(new Date(year, month, day))
    if (week.length === 7) {
      matrix.push(week)
      week = []
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null)
    matrix.push(week)
  }
  return matrix
}

export function prettyDate(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
}
