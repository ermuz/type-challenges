// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
    Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]


// ============= Your Code Here =============
type UnionToIntersection<U> =
    (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
    ? R
    : never

type UnionToIntersection1<U> = (U extends any ? (x: U) => void : never) extends (
    x: infer R
) => void
    ? R
    : never


type a = UnionToIntersection1<'foo' | 42 | true>
