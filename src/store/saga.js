import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects';

function* testSaga() {
  yield take('test');
  console.log('test action');

  // while (true) {
  //   yield put(tickClock(false))
  //   yield delay(1000)
  // }
}

// function* loadDataSaga() {
//   try {
//     const res = yield fetch('https://jsonplaceholder.typicode.com/users')
//     const data = yield res.json()
//     yield put(loadDataSuccess(data))
//   } catch (err) {
//     yield put(failure(err))
//   }
// }

function* rootSaga() {
  yield all([
    call(testSaga),
    // takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
  ]);
}

export default rootSaga;
