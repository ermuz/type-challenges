// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type cases = [
    Expect<Equal<typeof noCharsOutput, ''>>,
    Expect<Equal<typeof oneCharOutput, 'a'>>,
    Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
    Expect<Equal<typeof twoCharOutput, 'a-b'>>,
    Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
    Expect<Equal<typeof hashOutput, 'a#b#c'>>,
    Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>,
]


// ============= Your Code Here =============
type Join<T extends string = '', U extends string[] = [], R extends string = ''> = U extends [infer F, ...infer Rest] ? Join<T, Rest extends string[] ? Rest : [], R extends '' ? `${F & string}` : `${R}${T}${F & string}`> : R


declare function join<T extends string>(delimiter: T): <P extends string[] = []>(...parts: P) => Join<T, P>
