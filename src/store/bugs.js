import { createAction } from "@reduxjs/toolkit"

export const bugAdded = createAction("bugAdded")
export const bugResolved = createAction("bugResolved")
export const bugRemoved= createAction("bugRemoved")


/**
 * Reducers
 */
 let lastId = 0
 export default function (state = [], action){
     switch (action.type) {
         case bugAdded.type:
             return [
                 ...state,
                 {
                     id: ++lastId,
                     description: action.payload.description,
                     resolved: false
                 }
             ];
 
         case bugRemoved.type:
             return state.filter(bug => bug.id !== action.payload.id)
 
         case bugResolved.type:
             return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
 
         default:
             return state
     }
 }




 /**
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