import { channel, delay } from 'redux-saga';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import * as api from "./api";

export default function* rootSaga() {
    yield takeLatest('FETCH_TASKS_STARTED', fetchTasks);
    yield takeLatestById(['TIMER_STARTED', 'TIMER_STOPPED'], handleProgressTimer);
}

function* handleProgressTimer({ payload, type }) {
    if (type === 'TIMER_STARTED') {
        while (true) {
            yield call(delay, 1000);
            yield put({
                type: 'TIMER_INCREMENT',
                payload: {taskId: payload.taskId},
            });
        }
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

function* takeLatestById(actionType, saga) {
    const channelsMap = {};

    while (true) {
        const action = yield take(actionType);
        const { taskId } = action.payload;

        if (!channelsMap[taskId]) {
            channelsMap[taskId] = channel();
            yield takeLatest(channelsMap[taskId], saga);
        }

        yield put(channelsMap[taskId], action);
    }
}