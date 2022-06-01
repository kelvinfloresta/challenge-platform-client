export function formatDateTime(value: string) {
  const date = new Date(value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export function formatDate(value: string) {
  const date = new Date(value);
  return `${date.toLocaleDateString()}`;
}
