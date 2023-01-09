// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
    Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
    Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
    Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
    Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
    Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
    Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
    Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
    Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
    Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,
]


// ============= Your Code Here =============
enum Comparison {
    Greater,
    Equal,
    Lower,
}

type GetPositive<A extends number> = `${A}` extends `-${infer PA}` ? PA : never;
type IsPositive<A extends number> = `${A}` extends `-${infer PA}` ? false : true;

type EasyEqual<A extends number | string, B extends number | string> = A extends B
    ? B extends A
    ? true
    : false
    : false;

type Compare<
    A extends number | string,
    B extends number | string,
    R extends any[] = []
> = EasyEqual<`${A}`, `${R['length']}`> extends true
    ? true
    : EasyEqual<`${B}`, `${R['length']}`> extends true
    ? false
    : Compare<A, B, [...R, 1]>;

type Comparator<A extends number, B extends number> =
    EasyEqual<A, B> extends true ?
    Comparison.Equal :
    IsPositive<A> extends true ?
    (IsPositive<B> extends true ? (Compare<A, B> extends true ?
        Comparison.Lower :
        Comparison.Greater) : Comparison.Greater) :
    IsPositive<B> extends true ? Comparison.Lower : (Compare<GetPositive<A>, GetPositive<B>> extends true ? Comparison.Greater : Comparison.Lower)

