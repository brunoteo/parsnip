import * as api from '../api';

export function createTask({ title, description, status = 'Unstarted' }) {
    return dispatch => {
        api.createTask({ title, description, status }).then(resp => {
            dispatch(createTaskSucceeded(resp.data))
        })
    }
}

function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        }
    }
}

export function editTask(id, params = {}) {
    return (dispatch, getState) => {
        const task = getTaskById(getState().tasks.tasks, id);
        const updatedTask = Object.assign({}, task, params);

        api.editTask(id, updatedTask).then(resp => {
            dispatch(editTaskSucceeded(resp.data));
        });
    };
}

export function editTaskSucceeded(task) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {
            task
        }
    }
}

function fetchTasksStarted() {
    return {
        type: 'FETCH_TASKS_STARTED',
    };
}

export function fetchTasks() {
    return dispatch => {
        dispatch(fetchTasksStarted());

        api.fetchTasks().then(resp => {
            setTimeout(() => {
                dispatch(fetchTasksSucceeded(resp.data));
            }, 2000);
        });
    };
}

export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }
}

function getTaskById(tasks, id) {
    console.log(tasks)
    return tasks.find(task => task.id === id);
}
