import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(watchFetchTasks);
    yield fork(watchSomethingElse);
}

function* watchFetchTasks() {
    console.log('watching!');
}

function* watchSomethingElse() {
    console.log('watching something else!');
}