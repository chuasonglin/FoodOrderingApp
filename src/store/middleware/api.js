import axios from 'axios'
import * as actions from "../api";

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next (action)
    
    const {url, method, data, onStart, onSuccess, onError } = action.payload
    
    if (onStart) dispatch ({ type: onStart })
    next(action)

    try {
        console.log('helllo')
        const response = await axios.request({
            baseURL: "http://localhost:9001/api",
            url,
            method,
            data
        });
        // General
        dispatch(actions.apiCallSuccess(response.data))
        // Specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
        // General
        dispatch(actions.apiCallFailed(error.message))
        // Specific
        if (onError) dispatch({ type: onError, payload: error.message})
    }
}

export default api

/**
 * Model answer
 */


// import axios from "axios";
// import * as actions from "../api";

// const api = ({ dispatch }) => next => async action => {
//   if (action.type !== actions.apiCallBegan.type) return next(action);

//   const { url, method, data, onStart, onSuccess, onError } = action.payload;

//   if (onStart) dispatch({ type: onStart });

//   next(action);

//   try {
//     const response = await axios.request({
//       baseURL: "http://localhost:9001/api",
//       url,
//       method,
//       data
//     });
//     // General
//     dispatch(actions.apiCallSuccess(response.data));
//     // Specific
//     if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
//   } catch (error) {
//     // General
//     dispatch(actions.apiCallFailed(error.message));
//     // Specific
//     if (onError) dispatch({ type: onError, payload: error.message });
//   }
// };

// export default api;



// Just an example
// const action = {
//     type: "apiCallBegan",
//     payload: {
//         url: "/bugs",
//         method: "get",
//         data: {},
//         onSuccess: "bugsReceived", // Use string. Because this needs to be serialisation. Need to be stored. Functions cannot be stored. 
//         onError: "apiRequestFailed"
//     }
// }