import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {delay} from "redux-saga";
import * as api from "./api";

export default function* rootSaga() {
    yield takeLatest('FETCH_TASKS_STARTED', fetchTasks);
    yield takeEvery('TIMER_STARTED', handleProgressTimer);
}

function* handleProgressTimer({ payload }) {
    while (true) {
        yield call(delay, 1000);
        yield put({
            type: 'TIMER_INCREMENT',
            payload: { taskId: payload.taskId },
        });
    }
}

function* fetchTasks() {
    try {
        const { data } = yield call(api.fetchTasks);
        yield put({
            type: 'FETCH_TASKS_SUCCEEDED',
            payload: { tasks: data },
        });
    } catch (e) {
        yield put({
            type: 'FETCH_TASKS_FAILED',
            payload: { error: e.message },
        });
    }
}