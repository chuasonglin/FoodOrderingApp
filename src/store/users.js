import { createSlice } from "@reduxjs/toolkit"

let lastId = 0

const slice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        // action => action handler
        userAdded: (users, action) => {
            users.push({
                id: ++lastId,
                name: action.payload.name
            })
        },
    }
})
console.log(slice)

export const { userAdded } = slice.actions 
export default slice.reducer;