// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, "b">>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, "b">>,
  Expect<
    Equal<
      OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>,
      "b" | "c" | "d"
    >
  >,
  Expect<Equal<OptionalKeys<{}>, never>>
];

// ============= Your Code Here =============

type IsRequiredKey<T extends object, K extends keyof T> = T extends Record<
  K,
  T[K]
>
  ? true
  : false;

type OptionalKeys<T extends object> = keyof {
  [P in keyof T as IsRequiredKey<T, P> extends false ? P : never]: T[P];
};
