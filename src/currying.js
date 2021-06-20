import { compose, pipe } from "lodash"
import { ContextExclusionPlugin } from "webpack"

const add2 = a => b => a + b

const trim = str => str.trim()
const wrap = type => str => `<div>${str}</div>`
const toLowerCase = str => str.toLowerCase()

const transform = pipe(trim, toLowerCase, wrap('div'))
console.log(transform(input))


/* Working with arrays */
const numbers = [1,2,3]

// adding to specific location
const index = numbers.indexOf(2)
const added = [
    ...numbers.slice(0, index),
    4,
    ...numbers.slice(index)
]

// removing
const removed = numbers.filter(n => n !== 2)

// updating
const update = numbers.map(n => n === 2? 20 : n)