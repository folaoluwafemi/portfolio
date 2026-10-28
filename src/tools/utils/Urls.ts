export function isExternalUrl(value: string): boolean {
  return /^https?:\/\/.+/.test(value);
}

export function isMailtoUrl(value: string): boolean {
  return /^mailto:.+/.test(value);
}
