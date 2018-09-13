import React from 'react';
import Task from './Task';

const TaskList = ({status, tasks}) => {
    return (
        <div className="task-list">
            <div className="task-list-title">
                <strong>{status}</strong>
            </div>
            {tasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;