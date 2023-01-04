// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
];

// ============= Your Code Here =============
type IsRequiredKey<T extends object, K extends keyof T> = T extends Record<
  K,
  T[K]
>
  ? true
  : false;

type GetRequired<T extends object> = {
  [P in keyof T as IsRequiredKey<T, P> extends true ? P : never]: T[P];
};
