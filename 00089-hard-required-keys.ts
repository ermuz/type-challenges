// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, "a">>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, "a">>,
  Expect<
    Equal<
      RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>,
      "a" | "c" | "d"
    >
  >,
  Expect<Equal<RequiredKeys<{}>, never>>
];

// ============= Your Code Here =============

type IsRequiredKey<T extends object, K extends keyof T> = T extends Record<
  K,
  T[K]
>
  ? true
  : false;

type RequiredKeys<T extends object> = keyof {
  [P in keyof T as IsRequiredKey<T, P> extends true ? P : never]: T[P];
};
