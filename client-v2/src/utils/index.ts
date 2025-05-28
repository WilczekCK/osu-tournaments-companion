export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function shortenString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

export const API_URL = 'http://api.otc.glad.vision'