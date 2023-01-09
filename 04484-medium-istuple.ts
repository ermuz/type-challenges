// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<IsTuple<[]>, true>>,
    Expect<Equal<IsTuple<[number]>, true>>,
    Expect<Equal<IsTuple<readonly [1]>, true>>,
    Expect<Equal<IsTuple<{ length: 1 }>, false>>,
    Expect<Equal<IsTuple<number[]>, false>>,
    Expect<Equal<IsTuple<never>, false>>,
]


// ============= Your Code Here =============
// never 处理
// readonly 处理
// Array['length'] extends number
type IsTuple<T> = [T] extends [never] ? false : T extends readonly [...params: infer Ele] ? Equal<Ele['length'], number> extends false ? true : false : T extends [...params: infer Ele] ? Equal<Ele['length'], number> extends false ? true : false : false

