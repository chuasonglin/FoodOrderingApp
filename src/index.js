import configureStore from "./store/configureStore"
import * as actions from "./store/bugs";


const store = configureStore()

store.subscribe(() => {
    console.log("Store changed")
})

store.dispatch(actions.bugAdded({ description: "Bug 1" }))
store.dispatch(actions.bugAdded({ description: "Bug 2" }))
store.dispatch(actions.bugResolved({ id: 1 }))

console.log(store.getState())

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