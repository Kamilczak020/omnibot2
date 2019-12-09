export function isNil(value: unknown) {
  if (value === undefined || value === null) {
    return true;
  }
  return false;
}
