import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './basic/counser';


const rootReducer = combineReducers({
  counter,
 
});

export function* rootSaga() {
  yield all([counterSaga()]);
}

export default rootReducer;