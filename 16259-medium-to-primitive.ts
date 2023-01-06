// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type PersonInfo = {
    name: 'Tom'
    age: 30
    married: false
    addr: {
        home: '123456'
        phone: '13111111111'
    }
    hobbies: ['sing', 'dance']
}

type ExpectedResult = {
    name: string
    age: number
    married: boolean
    addr: {
        home: string
        phone: string
    }
    hobbies: [string, string]
}

type cases = [
    Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]


// ============= Your Code Here =============
type ToPrimitive<T extends Record<PropertyKey, any>> = {
    [P in keyof T]: T[P] extends Record<PropertyKey, any> ? ToPrimitive<T[P]> : (T[P] extends any[] ? [ToPrimitive<T[P][number]>] : T[P] extends string ? string : T[P] extends number ? number : T[P] extends boolean ? boolean : never)
}
