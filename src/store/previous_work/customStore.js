import reducer from './reducer'

const createStore = (reducer) => {
    let state
    let listeners = []

    const subscribe = (listener) => {
        listeners.push(listener)
    }
    const dispatch = (action) => {
        state = reducer(state, action)

        // when you disatch an action, you want to notify your subsribers
        for (let i=0; i < listeners.length; i++)
            listeners[i]()
    }

    const getState = () => {
       return state
    }

    return {
        dispatch,
        getState,
        subscribe
    }
}

export default createStore(reducer)