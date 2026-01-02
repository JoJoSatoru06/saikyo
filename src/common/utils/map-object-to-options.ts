export const mapObjectToOptions = <T extends Record<string, { label: string; value: string }>>(
  obj: T
): {
  [K in keyof T]: {
    label: T[K]['label']
    value: T[K]['value']
  }
}[keyof T][] => {
  return Object.values(obj)
}
