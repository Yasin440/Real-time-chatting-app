import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import reduxThunk from 'redux-thunk';
import { authReducer } from "./reducers/authReducer";

const middleWare = [reduxThunk]
const rootReducer = combineReducers({
    authReducer
})


const store = createStore(rootReducer, compose(applyMiddleware(...middleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store