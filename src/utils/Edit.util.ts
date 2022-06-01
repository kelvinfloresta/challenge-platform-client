type IEdit<T> = T & { readonly id: string };

export function isEdit<T extends { readonly id?: string }>(
  value: T
): value is IEdit<T> {
  return typeof (value as IEdit<T>).id === 'string';
}
