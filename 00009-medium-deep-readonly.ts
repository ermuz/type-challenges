// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
    a: () => 22
    b: string
    c: {
        d: boolean
        e: {
            g: {
                h: {
                    i: true
                    j: 'string'
                }
                k: 'hello'
            }
            l: [
                'hi',
                {
                    m: ['hey']
                },
            ]
        }
    }
}

type bb = X['a'] extends object ? true : false

type Expected = {
    readonly a: () => 22
    readonly b: string
    readonly c: {
        readonly d: boolean
        readonly e: {
            readonly g: {
                readonly h: {
                    readonly i: true
                    readonly j: 'string'
                }
                readonly k: 'hello'
            }
            readonly l: readonly [
                'hi',
                {
                    readonly m: readonly ['hey']
                },
            ]
        }
    }
}


// ============= Your Code Here =============

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends (Record<PropertyKey, unknown> | unknown[]) // {} || []
    ? DeepReadonly<T[P]> // 对象或者数组才继续深度
    : T[P]
}
