import store from "./customStore"
import * as actions from "./actions";

store.subscribe(() => {
    console.log("Store changed")
})

store.dispatch(actions.bugAdded("Bug 1"))

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