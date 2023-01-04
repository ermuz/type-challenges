// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >
];

type IsRequiredKey<T extends object, K extends keyof T> = T extends Record<
  K,
  T[K]
>
  ? true
  : false;

// ============= Your Code Here =============
type GetOptional<T extends object> = {
  [P in keyof T as IsRequiredKey<T, P> extends true ? never : P]: T[P];
};
