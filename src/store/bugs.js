import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from 'reselect'
import { apiCallBegan } from './api'
import moment from 'moment'

const slice = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        // action => action handler
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },

        bugsRequestFailed: (bugs, aciton) => {
            bugs.loading = false
        },

        bugsReceived: (bugs, action) => {
            bugs.list = action.payload
            bugs.loading = false
            bugs.lastFetch = Date.now()
        },

        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload)
        },

        // resolveBug (command) - bugResolved (event)
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list[index].resolved = true
        },

        bugAssignedToUser: (bugs, action) => {
            console.log(action.payload)
            const { id: bugId, userId } = action.payload
            const index = bugs.list.findIndex(bug => bug.id === bugId)
            console.log(index)
            bugs.list[index].assigned_to = userId
        }

    }
})
console.log(slice)


const { 
    bugAdded, 
    bugResolved, 
    bugAssignedToUser, 
    bugsReceived,
    bugsRequested,
    bugsRequestFailed
} = slice.actions 
export default slice.reducer;

// Action Creators
const url = "/bugs"

export const loadBugs = () => (dispatch, getState) =>  {
    const { lastFetch } = getState().entities.bugs

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

    if (diffInMinutes < 10) return

    return dispatch (
        apiCallBegan({
            url: url,
            onStart: bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestFailed.type
        })
    )
}

export const addBug = bug => apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
    onError: bugsRequestFailed.type
})

export const resolveBug = bugId => apiCallBegan({
    url: url + '/' + bugId,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
    onError: bugsRequestFailed.type
})

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + '/' + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
    onError: bugsRequestFailed.type
})



// Memoization
// bugs => get unresolved bugs from the cache
// if the states (bugs and projects) remain the same, that the function will not be executed again
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.list.filter(bug => !bug.resolved)
)

export const getBugsByUser = (userId) => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)


// Selector function (But this one does not cache/ memoize)
// export const getUnresolvedBugs = state => 
//     state.entities.bugs.filter(bug => !bug.resolved)


// export const bugAdded = createAction("bugAdded")
// export const bugResolved = createAction("bugResolved")
// export const bugRemoved= createAction("bugRemoved")


/**
 * Reducers
 */
// let lastId = 0
// export default createReducer([], {
//     bugAdded: (bugs, action) => {
//         bugs.push({
//             id: ++lastId,
//             description: action.payload.description,
//             resolved: false
//         })
//     },

//     bugResolved: (bugs, action) => {
//         const index = bugs.findIndex(bug => bug.id === action.payload.id)
//         bugs[index].resolved = true;
//     },

//     bugRemoved: (bugs, action) => {

//     }
// })


/**
 * Creating actions without redux toolkit
 * Reducers
 */
//  let lastId = 0
//  export default function reducer(state = [], action) {
//      switch (action.type) {
//          case bugAdded.type:
//              return [
//                  ...state,
//                  {
//                      id: ++lastId,
//                      description: action.payload.description,
//                      resolved: false
//                  }
//              ];
 
//          case bugRemoved.type:
//              return state.filter(bug => bug.id !== action.payload.id)
 
//          case bugResolved.type:
//              return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
 
//          default:
//              return state
//      }
//  }




 /**
 * Creating actions without redux toolkit
 * Action types (After using redux toolkit, we no need this standardization anymore. Names are only declared once.)
 */
// const BUG_ADDED = "bugAdded"
// const BUG_REMOVED = "bugRemoved"
// const BUG_RESOLVED = "bugResolved"

/**
 * Action creators
 */
//  export const bugAdded = description => ({
//     type: BUG_ADDED,
//     payload: {
//         description
//     }
// })

// export const bugResolved = id => ({
//     type: BUG_RESOLVED,
//     payload: {
//         id
//     }
// })

// export const bugRemoved = id => ({
//     type: BUG_REMOVED,
//     payload: {
//         id
//     }
// })