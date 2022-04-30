import {createAction, handleActions} from 'redux-actions';
import {call, delay, put, takeLatest, select, throttle} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'
import { actions } from 'react-table/dist/react-table.development';

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}

export const initialState = {
    loginUser: null,
    isLoggined: false,
    token: '',
    loginError: null,
    logoutUser: null,
    logoutError: null,
    isLogouted: false
}

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_CANCELLED = 'auth/LOGIN_CANCELLED';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
const SAVE_TOKEN = 'auth/SAVE_TOKEN';
const DELETE_TOKEN = 'auth/DELETE_TOKEN';

export const loginRequest = createAction(LOGIN_REQUEST, data => data)
export const logoutRequest = createAction(LOGOUT_REQUEST, data => data)
export const loginCancelled = createAction(LOGIN_CANCELLED, data => data)

export function* loginSaga(){
    yield takeLatest(LOGIN_REQUEST, loging)
    yield takeLatest(LOGOUT_REQUEST, logout)
}

function* loging(action){
    try{
        const response = yield call(loginAPI, action.payload)
        console.log(" 로그인 서버 다녀옴 "+JSON.stringify(response.data))
        const result = response.data
        yield put({type:LOGIN_SUCCESS, payload: result})
        yield put({type:SAVE_TOKEN, payload: result.token})
    }catch(error){
        yield put({type:LOGIN_FAILURE, payload: error.message })
    }
}

const loginAPI = payload => axios.post(
    `${SERVER}/user/login`,
    payload,
    {headers}
)

export function* logoutSaga(){
    yield takeLatest(LOGOUT_REQUEST)
}
function* logout(action){
    try{
        const response = yield call(logoutApi, action.payload)
        console.log("로그아웃 서버 다녀옴")
        const result = response.data
        yield put({type:LOGOUT_SUCCESS, payload:result})
    }catch(error){
        console.log(error)
    }
}
const logoutApi = payload => axios.post(
    `${SERVER}/user/logout`,
    payload,
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
        isLoggined: true,
    }),
    [LOGIN_FAILURE]: (state, action) => ({
        ...state, loginError: action.payload,
    }),
    [SAVE_TOKEN]: (state, action) => ({
        ...state, token: action.payload
    }),
    [DELETE_TOKEN]: (state, action) => ({
        ...state, token: ''
    }),
    [LOGOUT_SUCCESS]: (state, action) => ({
        ...state,
        loginUser: action.payload,
        isLogouted: true,
    }),
}, initialState)

export default login