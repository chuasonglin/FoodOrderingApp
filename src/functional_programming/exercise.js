/**
 * Exercise 1
 */

const { pipe } = require ("lodash/fp")

// input = { tag: “JAVASCRIPT” } 
// output = “(javascript)”

const objectTagValue = (obj) => obj.tag
const toLowerCase = (string) => string.toLowerCase()
const bracketify = (string) => `(${string})`

const transform = pipe(objectTagValue, toLowerCase, bracketify)

console.log (transform({ tag: "JAVASCRIPT" }))


/**
 * Exercise 2
 */

 const recipe = { 
    name: "Spaghetti Bolognese", 
    ingredients: ["egg", "salt"] 
} 

// -Add a new ingredient (“cream”) 
// -Replace “egg” with “egg white” 
// -Remove an ingredient (“egg”)


const addIngredient = (recipe, ingredient) => {
    return {
        ...recipe,
        ingredients: [...recipe.ingredients, ingredient]
    }
}

const removeIngredient = (recipe, ingredient) => {
    return {
        ...recipe,
        ingredients: recipe.ingredients.filter((i) => i !== ingredient)
    }
}

const replaceIngredient = (recipe, ingredient_removed, ingredient_added) => {
    return {
        ...recipe,
        ingredients: recipe.ingredients.map((i) => i === ingredient_removed ? ingredient_added : i)
    }
}


console.log(addIngredient(recipe, "cream"))
console.log(removeIngredient(recipe, "egg"))
console.log(replaceIngredient(recipe, "egg", "cum"))

/**
 * Exercise 3 (Own, accessing nested objects)
 */

const user = {
    id: 101,
    email: 'jack@dev.com',
    personalInfo: {
        name: 'Jack',
        address: {
            line1: 'westwish st',
            line2: 'washmasher',
            city: 'wallas',
            state: 'WX'
        },
        addresses: [{
            line1: 'westwish st',
            line2: 'washmasher',
            city: 'wallas',
            state: 'WX'
        }]
    }
}

const state = (((user || {}).personalInfo || {}).addresses[0] || {}).state;
console.log(state)

// get nested arrays
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((nestedObj,path) => {
        return (nestedObj || {})[path]
    }, nestedObj)
        
        // (obj && obj[path] !== 'undefined') ? obj[path] : undefined, nestedObj);
}

// pass in your object structure as array elements
const name = getNestedObject(user, ['personalInfo', 'name']);
console.log(name)

// to access nested array, just pass in array index as an element the path array.
const city = getNestedObject(user, ['personalInfo', 'addresses', 0, 'city']);
console.log(city)
// this will return the city from the first address item.