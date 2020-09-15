import React from 'react';
import Button from './Button';

const DayTasks = props=> {
    const {tasks} = props;

    if(tasks.length<1) return[];

    const classes = {
        dayTasksBox: 'dayTasks',
        list: 'dayTasks__list',
        taskDoneBtn:'',
        taskDeleteBtn: ''
    };

    const {
        dayTasksBox,
        list,
        taskDoneBtn,
        taskDeleteBtn,
    } = classes;

    const dayTasks = tasks.map(task=> {
        const {title, content, date, category, priority, id} = task;
        const ID = `${id.date}-${id.title}`;

        return (
            <li
                key={ID}
                id={ID}
            >
            <Button
                classes={taskDoneBtn}
            />
            <p>{title}</p>
            <Button
                classes={taskDeleteBtn}
            />
            </li>
        );
    });

    return (
        <div className={dayTasksBox}>
            <ul className={list}>
                {dayTasks}
            </ul>
        </div>
    )
};

export default DayTasks;