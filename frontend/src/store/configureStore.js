import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import iteamsReducer from '../reducers/iteams-reducer'
//import cartIteamsReducer from '../reducers/cartIteams-reducer'
import userReducer from '../reducers/user-reducer'


export function configureStore(){
    const store= createStore(combineReducers({
        // user : userReducer,
        allIteams : iteamsReducer,
        //cartIteams : cartIteamsReducer,
        user : userReducer

    }),applyMiddleware(thunk))
    return store
}