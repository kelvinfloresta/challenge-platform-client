export type IEmpty<T> = T & {
  readonly isEmpty: true;
};

export function isEmpty<T>(value: IEmpty<T> | T): value is IEmpty<T> {
  return (value as IEmpty<T>).isEmpty;
}
