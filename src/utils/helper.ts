export function formatDate(timeString: string): string {
  const date = new Date(timeString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

export function trimStringToArray(str: string): string[] {
  const arr = str.split(',')

  const trimmedArr = arr.map(element => element.trim())

  return trimmedArr
}
