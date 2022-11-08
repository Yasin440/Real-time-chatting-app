import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({

})
const middleWare = [reduxThunk]

const store = createStore(rootReducer, compose(applyMiddleware(...middleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store