// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    // Raw string -> encoded string
    Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,
    // Encoded string -> decoded string
    Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


// ============= Your Code Here =============

type BuildLengthString<S extends number, T extends string = '', R extends string = '', I extends unknown[] = []> = I['length'] extends S ? R : BuildLengthString<S, T, `${R}${T}`, [...I, unknown]>

namespace RLE {
    export type Encode<S extends string, T extends unknown[] = [], P extends string = '', R extends string = ''> = S extends `${infer F}${infer Rest}` ? (T['length'] extends 0 ? RLE.Encode<Rest, [F], F, R> : (P extends F ? RLE.Encode<Rest, [...T, F], F, R> : RLE.Encode<Rest, [F], F, `${R}${T['length'] extends 1 ? '' : T['length']}${P}`>)) : `${R}${T['length'] extends 1 | 0 ? '' : T['length']}${P}`
    export type Decode<S extends string, R extends string = ''> = S extends `${infer F extends number}${infer Rest}` ? (Rest extends `${infer C}${infer Rest1}` ? RLE.Decode<Rest1, BuildLengthString<F, C, R>> : R) : S extends `${infer F}${infer Rest}` ? RLE.Decode<Rest, `${R}${F}`> : R
}




