const initialState = {
    tasks: [],
    isLoading: false,
};

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_TASKS_STARTED': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'FETCH_TASKS_SUCCEEDED': {
            return {
                ...state,
                isLoading: false,
                tasks: action.payload.tasks,
            };
        }
        case 'CREATE_TASK_SUCCEEDED': {
            return {
                ...state,
                tasks: state.tasks.concat(action.payload.task),
            };
        }
        case 'EDIT_TASK_SUCCEEDED': {
            const {payload} = action;
            const nextTasks = state.tasks.map(task => {
                if (task.id === payload.task.id) {
                    return payload.task;
                }

                return task;
            });
            return {
                ...state,
                tasks: nextTasks,
            };
        }
        default: {
            return state;
        }
    }
}