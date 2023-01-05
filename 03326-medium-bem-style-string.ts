// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
    Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success'>>,
    Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large'>>,
]


// ============= Your Code Here =============
type Helper<A extends string[], J extends string = '__'> = A['length'] extends 0 ? '' : `${J}${A[number]}`

type BEM<B extends string, E extends string[], M extends string[]> = `${B}${Helper<E, '__'>}${Helper<M, '--'>}`
