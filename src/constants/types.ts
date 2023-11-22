export type LeafValues<T> = T extends object
  ? { [K in keyof T]: LeafValues<T[K]> }[keyof T]
  : T;
