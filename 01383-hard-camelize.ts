// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string }
        ];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string }
        ];
      }
    >
  >
];

// ============= Your Code Here =============

type CamelizeArray<T extends any[]> = T extends [infer F, ...infer R]
  ? [F extends Record<PropertyKey, any> ? Camelize<F> : F, ...CamelizeArray<R>]
  : T;

type CamelizeString<P extends string> =
  P extends `${infer F}_${infer S}${infer R}`
    ? `${F}${Uppercase<S>}${CamelizeString<R>}`
    : P;

type Camelize<T extends Record<PropertyKey, any>> = {
  [P in keyof T as CamelizeString<P & string>]: T[P] extends any[]
    ? CamelizeArray<T[P]>
    : T[P] extends object
    ? Camelize<T[P]>
    : T[P];
};
