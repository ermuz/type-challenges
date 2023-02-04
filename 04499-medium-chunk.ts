// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<Chunk<[], 1>, []>>,
    Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
    Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
    Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
    Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
    Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]


// ============= Your Code Here =============
type Chunk<T extends unknown[], L extends number, C extends unknown[] = [], R extends unknown[] = []> = T extends [infer F, ...infer Rest] ?
    C['length'] extends L ? Chunk<Rest, L, [F], [...R, C]> : Chunk<Rest, L, [...C, F], R>
    // T = [],C = [] ,C=[XX]
    : C['length'] extends 0 ? [...R] : [...R, C]
