import {createAction, handleActions} from 'redux-actions';
import {call, delay, put, takeLatest, select, throttle} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'
import {SERVER, headers} from "@/modules/auth/server"


export const initialState = {
    loginUser: {},
    isLoggined: false,
    token: '',
    loginError: null,
}

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_CANCELLED = 'auth/LOGIN_CANCELLED';
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";
const SAVE_TOKEN = 'auth/SAVE_TOKEN';
const DELETE_TOKEN = 'auth/DELETE_TOKEN';

export const loginRequest = createAction(LOGIN_REQUEST, data => data)
export const logoutRequest = createAction(LOGOUT_REQUEST, e => e)
export const loginCancelled = createAction(LOGIN_CANCELLED, e => e)

export function* loginSaga(){
    yield takeLatest(LOGIN_REQUEST, loging)
    yield takeLatest(LOGOUT_REQUEST, logout)
}

function* loging(action){
    try{
        const response = yield call(loginAPI, action.payload)
        console.log(" 로그인 서버 다녀옴 "+JSON.stringify(response.data))
        const result = response.data
        const loginUser = JSON.stringify(result)
        localStorage.setItem("loginUser",loginUser)
        yield put({type:LOGIN_SUCCESS, payload: result})
        yield put({type:SAVE_TOKEN, payload: result.token})
        yield put(window.location.href="/")
    }catch(error){
        yield put({type:LOGIN_FAILURE, payload: error.message })
    }
}

const loginAPI = payload => axios.post(
    `${SERVER}/user/login`,
    payload,
    {headers},
)

function* logout(){
    try{
        const response = yield call(logoutAPI)
        yield put({type:LOGOUT_SUCCESS})
        yield put({type: DELETE_TOKEN})
        localStorage.clear()
        yield put(window.location.href = "/")
    }catch(error){
        yield put({type: LOGOUT_FAILURE});
    }
}
const logoutAPI = () => axios.get(
    `${SERVER}/user/logout`,
    {},
    {headers}
)
    
const login = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        loginUser: action.payload,
        isLoggined: true
    }),
    [LOGIN_FAILURE]: (state, action) => ({
        ...state,
        loginError: action.payload // result
    }),
    [LOGOUT_SUCCESS]: (state, _action) => ({
        ...state,
        loginUser: null,
        isLoggined: false
    }),
    [LOGOUT_FAILURE]: (state, action) => ({
        ...state,
        loginError: action.payload // result
    }),
    [SAVE_TOKEN]: (state, action) => ({
        ...state,
        token: action.payload // result.token
    }),
    [DELETE_TOKEN]: (state, action) => ({
        ...state,
        token: ''
    })
}, initialState)

export default login