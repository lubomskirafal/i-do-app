import React from 'react';
import Button from './Button';

const DayTasks = props=> {
    const {tasks} = props;

    if(tasks.length<1) return[];

    const classes = {
        list: 'dayTasks__list',
        listItem: 'dayTasks__list-item',
        taskDoneBtn:'button__task--done',
        taskDeleteBtn: 'button__task--delete'
    };

    const {
        list,
        taskDoneBtn,
        taskDeleteBtn,
        listItem
    } = classes;

    const dayTasks = tasks.map(task=> {
        const {title, content, date, category, priority, id} = task;
        const ID = `${id.date}-${id.title}`;

        return (
            <li
                className={listItem}
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
        
        <ul className={list}>
            {dayTasks}
        </ul>
        
    )
};

export default DayTasks;