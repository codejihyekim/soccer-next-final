import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from './basic/counter'
import register, { registerSaga } from './auth/register'
import login, { loginSaga } from './auth/login'
import {HYDRATE} from "next-redux-wrapper"

const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log("HYDRATE", action);
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
    counter,
    register,
    login
    
})

export function* rootSaga(){
    yield all([ counterSaga(), registerSaga(), loginSaga()])
}

export default rootReducer