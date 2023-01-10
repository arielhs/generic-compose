import { giganticGenericFunction } from './giganticGenericFunction'

/*
Our goal here would be to create a function that has the same interface as giganticGenericFunction,
but lets us modify its return type.

This defines a function that lets us pass some giganticGenericFunction (e.g. a function imported from a library) in, 
so that we can use typescript's function type inference to capture:

A = all the types of the arguments of the given giganticGenericFunction (which in this case are dependent on it's generic type parameters)
R = the return type of given giganticGenericFunction (similar to A)
U = the return type of our function (which we will use to define our modification R in terms of A and R)

The 2nd argument is our modification function. It takes A and R and returns some U that we can define as whatever we want.
Since we have reference A and R here, this is the magic that is holding onto the generic type information of the *type parameters* of giganticGenericFunction.

Notice what this GenericCompose function is returning:

(...a: A) => U

This is a function that takes the same arguments as giganticGenericFunction, but returns our U instead of giganticGenericFunction's R.

*/
type GenericCompose = <A extends any[], R, U>(theirFunction: (...a: A) => R, ourModifyingFunction: (a: A, r: R) => U) => (
    (...a: A) => U
)

/*
As far as i know, there's no way to do this just in type land, we need to rely on the magic of function type inference so this must be done in value land.
*/
const genericCompose: GenericCompose = (left, right) => (...args) => right(args, left(...args))

function verySimpleGeneric<S extends string>(s: S): number {
    return Number(s)
}


// <S extends string>(s: S) => boolean
const simpleComposedFunction = genericCompose(verySimpleGeneric, ([s], r) => {
    // hover here and see the type of s
    // this is really the important aspect, without ever re-defining the type parameters, we have access to the type information - most importantly the constraints!)
    const lookAtS = s

    return r === 1 ? true : false
})

// more complex example
const composedFunction = genericCompose(giganticGenericFunction, ([t, u, v], r) => {
    // hover here and see the type of t, u, v
    // see how the constaints are captured, but we never had to redefine them
    const lookAtT = t
    const lookAtU = u
    const lookAtV = v
    const lookAtR = r

    return {
        aCleanerReturnType: t,
    }
})


// sometimes you dont even want to do any actual runtime changes. Sadly we still need to write some code that does technically run
// even though all we want to do is make type level changes to its definition:
const giganticGenericFunctionWithOnlyReturnTypeSlightlyChanged = genericCompose(giganticGenericFunction, (_, r) => r as Partial<typeof r>)

// calling this new function is identical to calling the original, except we've modified the return type
