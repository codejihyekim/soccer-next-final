import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { watchCounter } from './basic/counter';
import register, { registerSaga } from './auth/register';
import login, { loginSaga, logoutSaga } from './auth/login'

const rootReducer = combineReducers({
  counter, register, login
 
});

export function* rootSaga() {
  yield all([watchCounter(),  registerSaga(), loginSaga(), logoutSaga()]);
}

export default rootReducer;