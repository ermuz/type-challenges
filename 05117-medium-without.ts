// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

type Include<S extends any[], T extends any> = S extends [infer F, ...infer R]
  ? Equal<F, T> extends true
    ? true
    : Include<R, T>
  : false;

// ============= Your Code Here =============
type Without<T extends any[], U extends any[] | any> = U extends any[]
  ? T extends [infer F, ...infer R]
    ? Include<U, F> extends true
      ? Without<R, U>
      : [F, ...Without<R, U>]
    : T
  : Without<T, [U]>;
