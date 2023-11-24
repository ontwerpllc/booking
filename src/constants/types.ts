export type LeafValues<T> = T extends object
  ? { [K in keyof T]: LeafValues<T[K]> }[keyof T]
  : T;

export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends K ? '' : '.'}${P}`
    : never
  : never;

export type Paths<T, K extends string | number = ''> = {
  [P in keyof T]-?: T[P] extends object
    ? P extends string | number
      ? `${K}${'' extends K ? '' : '.'}${P}` | Paths<T[P], Join<K, P>>
      : never
    : never;
}[keyof T];

export type ObjectPaths<T, K extends string | number = ''> = {
  [P in keyof T]-?: T[P] extends Record<string, string>
    ? never
    : P extends string | number
      ? `${K}${'' extends K ? '' : '.'}${P}` | ObjectPaths<T[P], Join<K, P>>
      : never;
}[keyof T];
