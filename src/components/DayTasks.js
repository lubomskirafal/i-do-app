import React from 'react';
import Button from './Button';


const DayTasks = props=> {
    const {tasks} = props;

    if(tasks.length<1) return[];

    const classes = {
        list: 'dayTasks__list',
        listItem: 'dayTasks__list-item',
        taskDoneBtn:'button button__task button__task--done',
        taskDeleteBtn: 'button button__task button__task--delete',
        taskEditBtn: 'button button__task button__task--edit'
    };

    const {
        list,
        taskDoneBtn,
        taskDeleteBtn,
        taskEditBtn,
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
            <p>{title}</p>
            
            <div>
                <Button
                    classes={taskDoneBtn}
                    
                /><Button
                    classes={taskEditBtn}
                />
                <Button
                    classes={taskDeleteBtn}
                />
            </div>
            
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