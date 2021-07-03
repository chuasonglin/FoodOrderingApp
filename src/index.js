import configureStore from "./store/configureStore"
import { bugAdded, bugResolved, bugAssigned, getUnresolvedBugs, getBugsByUser } from "./store/bugs"; 
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users"



const store = configureStore()

store.subscribe(() => {
    console.log("Store changed")
})

store.dispatch(userAdded({ name: "Kelvin" }))
store.dispatch(userAdded({ name: "Lebron" }))
store.dispatch(projectAdded({ name: "project 1" }))
store.dispatch(bugAdded({ description: "Bug 1" }))
store.dispatch(bugAdded({ description: "Bug 2" }))
store.dispatch(bugAssigned({ bugId: 1, userId: 1 }))

store.dispatch(bugResolved({ id: 1 }))

console.log(store.getState())

const unresolved_bugs = getUnresolvedBugs(store.getState())
console.log(unresolved_bugs)

const bugsByUser = getBugsByUser(1)(store.getState())
console.log(bugsByUser)

/**
 * Previous codes
 */

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