// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<
        Camelize<{
            some_prop: string
            prop: { another_prop: string }
            array: [
                { snake_case: string },
                { another_element: { yet_another_prop: string } },
                { yet_another_element: string },
            ]
        }>,
        {
            someProp: string
            prop: { anotherProp: string }
            array: [
                { snakeCase: string },
                { anotherElement: { yetAnotherProp: string } },
                { yetAnotherElement: string },
            ]
        }
    >>,
]


// ============= Your Code Here =============

type CamelizeArray<T extends any[]> = T extends [infer F, ...infer R] ? [F extends Record<PropertyKey, any> ? Camelize<F> : F, ...CamelizeArray<R>] : T

type Camelize<T extends Record<PropertyKey, any>> = {
    [P in keyof T as P extends `${infer F}_${infer S}${infer R}` ? `${F}${Uppercase<S>}${R}` : P]: T[P] extends any[] ? CamelizeArray<T[P]> : T[P] extends Record<PropertyKey, any> ? Camelize<T[P]> : T[P]
}

type A = Camelize<{
    some_prop: string
    prop: { another_prop: string }
    array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
    ]
}>
type b = CamelizeArray<[
    { snake_case: string },
    { another_element: { yet_another_prop: string } },
    { yet_another_element: string },
]
>
