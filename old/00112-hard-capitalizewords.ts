// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<
    Equal<
      CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">,
      "Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq"
    >
  >,
  Expect<Equal<CapitalizeWords<"">, "">>,
];

// ============= Your Code Here =============
type CapitalizeWords<
  S extends string,
  R extends string = "",
> = S extends `${infer F}${infer Rest}`
  ? Uppercase<F> extends Lowercase<F> // 非字母
    ? // 采用截断的策略，碰到非字母就就进行截断
      `${Capitalize<`${R}${F}`>}${CapitalizeWords<Rest>}`
    : CapitalizeWords<Rest, `${R}${F}`>
  : Capitalize<R>;

type a = CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">;
