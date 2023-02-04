// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<ParseQueryString<''>, {}>>,
    Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
    Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
    Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
    Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2']; k2: 'v1' }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
    Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]


// ============= Your Code Here =============
type SplitParams<S extends string, A extends string[] = []> = S extends `${infer F}&${infer R}` ? SplitParams<R, [...A, F]> : [...A, S];
type SetProperty<T extends object, K extends PropertyKey, V extends any = true> = {
    [P in keyof T | K as P extends '' ? never : P]:
    P extends K ?
    (P extends keyof T ?
        T[P] extends V ?
        V : T[P] extends any[] ?
        V extends T[P][number] ? T[P] : [...T[P], V] :
        [T[P], V] :
        V) :
    P extends keyof T ? T[P] : never
}

type MergeParams<S extends string[], R extends object = {}> = S extends [infer F, ...infer Rest extends string[]] ? F extends `${infer K}=${infer V}` ? MergeParams<Rest, SetProperty<R, K, V>> : F extends `${infer K}=` ? MergeParams<Rest, SetProperty<R, K>> : MergeParams<Rest, SetProperty<R, F & string>> : R

type ParseQueryString<S extends string> = MergeParams<SplitParams<S>>



