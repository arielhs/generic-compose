// suppose you had a gigantic generic function (i.e. imported from a library) with several type parameters all with huge constraints
// e.g. https://github.com/stitchesjs/stitches/blob/canary/packages/react/types/stitches.d.ts 

export function giganticGenericFunction<
    T extends boolean | number,
    U extends { value: string },
    V extends 'a' | 'b' | 'c' | 'd' | 'e'
>(t: T, u: U, v: V): { someGiantReturnType: T | U | V } {
    // just imagine this function is huge and does a lot of stuff with all its type parameters and produces a huge return type that has no other definition other than in this function
    return { someGiantReturnType: t }
}