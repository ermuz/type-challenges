// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<"title", GetReadonlyKeys<Todo1>>>,
  Expect<Equal<"title" | "description", GetReadonlyKeys<Todo2>>>
];

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  readonly description: string;
  completed?: boolean;
}

// ============= Your Code Here =============
type IsReadonlyKey<T extends object, K extends keyof T> = Equal<
  { [P in K]: T[P] },
  { -readonly [P in K]: T[P] }
> extends false
  ? true
  : false;

type GetReadonlyKeys<T extends object> = keyof {
  [P in keyof T as IsReadonlyKey<T, P> extends true ? P : never]: T[P];
};
