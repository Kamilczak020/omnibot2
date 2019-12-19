export function trimString(value: string, length: number): string {
  return value.length > length ? value.substring(0, length) + '…' : value;
}
