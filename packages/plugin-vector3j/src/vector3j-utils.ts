export function parseDate(date: string, locale: string) {
  return new Date(date)
}

export function formatDate(date: Date, locale?: string) {
  return date.toLocaleDateString(locale)
}
