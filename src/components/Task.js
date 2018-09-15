import React from 'react'
import {TASK_STATUSES} from '../constants';

const Task = ({task, onStatusChange}) => {

    function onChangeStatus(e) {
        onStatusChange(task.id, e.target.value)
    }

    return (
        <div className="task">
            <div className="task-header">
                <div>{task.title}</div>
                <select value={task.status} onChange={onChangeStatus}>
                    {TASK_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>
            <hr />
            <div className="task-body">{task.description}</div>
        </div>
    );
}

export default Task;