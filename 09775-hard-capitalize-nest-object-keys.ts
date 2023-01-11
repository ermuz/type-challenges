// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
    foo: string
    bars: [{ foo: string }]
}

type Foo = {
    Foo: string
    Bars: [{
        Foo: string
    }]
}

type cases = [
    Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]

type DeepArrayToCapitalizeNestObjectKeys<T extends Array<any>> =
    T extends [infer A, ...infer B] ?
    [A extends Record<PropertyKey, any> ? CapitalizeNestObjectKeys<A> : A, ...DeepArrayToCapitalizeNestObjectKeys<B>] : [];



// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T extends Record<PropertyKey, any>> = {
    [P in keyof T as Capitalize<P & string>]: T[P] extends object ? T[P] extends any[] ? DeepArrayToCapitalizeNestObjectKeys<T[P]> : CapitalizeNestObjectKeys<T[P]> : T[P]
}
