import {createAction, handleActions} from 'redux-actions';
import {call, delay, put, takeLatest, select, throttle} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'

const SERVER = 'http://127.0.0.1:8080'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}
export const initialState = {
    isRegistered: false
}

const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const UNREGISTER_REQUEST = 'auth/UNREGISTER_REQUEST';
const UNREGISTER_SUCCESS = 'auth/UNREGISTER_SUCCESS';
const UNREGISTER_FAILURE = 'auth/UNREGISTER_FAILURE';

export const registerRequest = createAction(REGISTER_REQUEST, data => data)
export const unregisterRequest = createAction(UNREGISTER_REQUEST, data => data)
//위 아래 동일한 코드임.
// export const registerRequest = data => (
//     {type: REGISTER_REQUEST, payload: data}
// )
export function* registerSaga() {
    yield takeLatest(REGISTER_REQUEST, signup);
    yield takeLatest(UNREGISTER_REQUEST, membershipWithdrawal);
}
function* signup(action) {
    try {
        const response = yield call(registerAPI, action.payload)
        console.log(" 회원가입 서버다녀옴: " + JSON.stringify(response.data))
        yield put({type: REGISTER_SUCCESS, payload: response.data})
        //put이니까 리덕스에 데이터 보내라.
        yield put(window.location.href = "/auth/login")
    } catch (error) {
        yield put({type: REGISTER_FAILURE, payload: error.message})
    }
}
const registerAPI = payload => axios.post(`${SERVER}/users/join`, payload, {headers})

function* membershipWithdrawal(action) {
    try {
        console.log(`회원탈퇴`)
        // const response = yield call(userRegisterAPI, action.payload)
        // console.log(" 회원탈퇴 서버다녀옴: " + JSON.stringify(response.data))
        // yield put({type: REGISTER_SUCCESS, payload: response.data})
    } catch (error) {
        // yield put({type: REGISTER_FAILURE, payload: error.message})
    }
}

const register = handleActions({
    [HYDRATE]: (state, action) => 
    ({...state, ...action.payload})}, 
    initialState
)
export default register
    //[name] 과 같은거임 (동적 키 할당)


/* handleActions 를 사용하기 전 학습용 백업
const auth = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log(' ### HYDRATE Issue 발생 ### ')
            return {
                ...state,
                ...action.payload
            }
        case REGISTER_SUCCESS:
            console.log(' ### 회원가입 성공 ### ' + JSON.stringify(action.payload))
            return {
                ...state,
                user: action.payload
            }
        case REGISTER_FAILURE:
            console.log(' ### 회원가입 실패 ### ' + action.payload)
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default auth*/