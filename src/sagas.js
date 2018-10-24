import { fork, take, call, put } from 'redux-saga/effects';
import * as api from "./api";

export default function* rootSaga() {
    yield fork(watchFetchTasks);
    yield fork(watchSomethingElse);
}

function* watchFetchTasks() {
    while (true) {
        yield take('FETCH_TASKS_STARTED');
        try {
            const { data } = yield call(api.fetchTasks);
            yield put({
                type: 'FETCH_TASKS_SUCCEEDED',
                payload: { tasks: data }
        });
        } catch (e) {
            yield put({
                type: 'FETCH_TASKS_FAILED',
                payload: { error: e.message }
            });
        }
    }
}

function* watchSomethingElse() {
    console.log('watching something else!');
}