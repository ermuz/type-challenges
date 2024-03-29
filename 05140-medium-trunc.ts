// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Trunc<0.1>, "0">>,
  Expect<Equal<Trunc<1.234>, "1">>,
  Expect<Equal<Trunc<12.345>, "12">>,
  Expect<Equal<Trunc<-5.1>, "-5">>,
  Expect<Equal<Trunc<"1.234">, "1">>,
  Expect<Equal<Trunc<"-10.234">, "-10">>,
  Expect<Equal<Trunc<10>, "10">>
];

// ============= Your Code Here =============
type Trunc<N extends string | number> =
  `${N}` extends `${infer T extends number}.${infer D}`
    ? `${T}`
    : `${N}` extends `${infer T1 extends number}`
    ? `${T1}`
    : N;
