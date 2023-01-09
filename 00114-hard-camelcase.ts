// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
    Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
    Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
    Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
    Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
    Expect<Equal<CamelCase<'-'>, '-'>>,
    Expect<Equal<CamelCase<''>, ''>>,
    Expect<Equal<CamelCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============
type CamelCase<S extends string, R extends string = ''> = S extends `${infer F}_${infer Rest}` ? `${R}${CamelCase<Rest, R extends '' ? Lowercase<F> : `${Capitalize<Lowercase<F>>}`>}` : R extends '' ? Lowercase<S> : `${R}${Capitalize<Lowercase<S>>}`

