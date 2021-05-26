/* eslint-disable react/prop-types */
import React from 'react';

const TasksList = ({ tasks, removeTask }) => (
    <ul className="list-group">
        {tasks.map(task => (
            <li
                className="list-group-item task"
                key={task.id}
            >
                <span>{task.name}</span>
                <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeTask(task.id)}
                >
                    &times;
                </button>
            </li>
        ))}
    </ul>
);

export default TasksList;
