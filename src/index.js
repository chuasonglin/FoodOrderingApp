import configureStore from "./store/configureStore"
import { bugAdded, bugResolved, bugAssigned, getUnresolvedBugs, getBugsByUser } from "./store/bugs"; 
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users"
import { loadBugs, addBug, resolveBug, assignBugToUser } from "./store/bugs"



const store = configureStore()

store.subscribe(() => {
    console.log("Store changed")
})

store.dispatch(loadBugs())

store.dispatch(addBug({ description: "a" }))

// setTimeout(() => {
//     store.dispatch(loadBugs()) 
// }, 2000);


store.dispatch({
    type: "error",
    payload: { message: "An error occurred." }
})

store.dispatch(userAdded({ name: "Kelvin" }))

store.dispatch(assignBugToUser(1, 4))

// setTimeout(() => {
//     store.dispatch(resolveBug(1))
// }, 2000);

// store.dispatch(bugResolved({ id: 1 }))

// store.dispatch(userAdded({ name: "Lebron" }))
// store.dispatch(projectAdded({ name: "project 1" }))
// store.dispatch(bugAdded({ description: "Bug 1" }))
// store.dispatch(bugAdded({ description: "Bug 2" }))
// store.dispatch(bugAssigned({ bugId: 1, userId: 1 }))

// store.dispatch(bugResolved({ id: 1 }))

// console.log(store.getState())

// const unresolved_bugs = getUnresolvedBugs(store.getState())
// console.log(unresolved_bugs)

// const bugsByUser = getBugsByUser(1)(store.getState())
// console.log(bugsByUser)

/**
 * Previous codes
 */


// If you are not using redux toolkit
// import { createStore, applyMiddleware } from 'redux'
// import reducer from './store/reducer'

// const store = createStore(reducer, applyMiddleware(logger))

/*
import { bugAdded, bugRemoved, bugResolved } from "./actions";

import store from "./store";

const unsubscribe = store.subscribe(() => {
    console.log("Store changed", store.getState())
})

store.dispatch(bugAdded("Bug 1"))
store.dispatch(bugResolved(1))

unsubscribe()

console.log(store.getState())
*/