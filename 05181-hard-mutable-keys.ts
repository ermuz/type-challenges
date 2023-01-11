// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, "a">>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, "a">>,
  Expect<
    Equal<
      MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>,
      "a" | "c" | "d"
    >
  >,
  Expect<Equal<MutableKeys<{}>, never>>
];

// ============= Your Code Here =============

type isReadonly<T extends object, K extends keyof T> = Equal<
  { [P in K]: T[P] },
  { -readonly [P in K]: T[P] }
> extends true
  ? false
  : true;

type MutableKeys<T extends object> = keyof {
  [P in keyof T as isReadonly<T, P> extends true ? never : P]: T[P];
};
