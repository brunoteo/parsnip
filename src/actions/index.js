import * as api from '../api';

export function createTask({title, description, status = 'Unstarted'}) {
    return dispatch => {
        api.createTask({title, description, status}).then(resp => {
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

        api.fetchTasks()
            .then(resp => {
                setTimeout(() => {
                    dispatch(fetchTasksSucceeded(resp.data));
                }, 2000);
                // throw new Error('Oh noes! Unable to fetch tasks!');
            })
            .catch(err => {
                dispatch(fetchTasksFailed(err.message));
            })
    };
}

//Try with async/await
// export function fetchTasks() {
//     return async dispatch => {
//         dispatch(fetchTasksStarted());
//         try {
//             const { data } = await api.fetchTasks();
//             dispatch(fetchTasksSucceeded(data));
//         } catch (e) {
//             dispatch(fetchTasksFailed(e));
//         }
//     };
// }

export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }
}

function fetchTasksFailed(error) {
    return {
        type: 'FETCH_TASKS_FAILED',
        payload: {
            error,
        },
    };
}

export function filterTasks(searchTerm) {
    return {
        type: 'FILTER_TASKS',
        payload: {searchTerm}
    };
}

function getTaskById(tasks, id) {
    console.log(tasks)
    return tasks.find(task => task.id === id);
}
