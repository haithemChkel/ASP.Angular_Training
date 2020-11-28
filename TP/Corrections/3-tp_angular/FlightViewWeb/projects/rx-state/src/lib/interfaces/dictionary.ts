export interface DictionaryNbr<TValue> {
  [name: number]: TValue;
}

export interface DictionaryStr<T> {
  [name: string]: T;
}

export type Dictionary<T> = DictionaryStr<T> | DictionaryNbr<T>;
