// This is essentially what redux thunk is doing. Giving you a way to dispatch functions

const func = ({ dispatch, getState }) => next => action => {
    if (typeof action === "function")
        action (dispatch, getState);
    else 
        next(action)
}