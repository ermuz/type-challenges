// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

let x = 1
let y = 1 as const

type cases1 = [
    Expect<Equal<Integer<1>, 1>>,
    Expect<Equal<Integer<1.1>, never>>,
    Expect<Equal<Integer<1.0>, 1>>,
    Expect<Equal<Integer<typeof x>, never>>,
    Expect<Equal<Integer<typeof y>, 1>>,
]

// ============= Your Code Here =============
type Integer<T extends number> = Equal<T, number> extends true ? never : `${T}` extends `${infer I extends number}.${infer F}` ? (F extends 0 ? I : never) : `${T}` extends `${infer I1 extends number}` ? I1 : never
