import React from 'react';
import Button from './Button';

const Tasks = props=> {
    const {tasks, handleClick} = props;
    
    if(tasks.length<1) return[];

    const classes = {
        list: 'dayTasks__list',
        taskDoneBtn:'button button__task button__task--done',
        taskDeleteBtn: 'button button__task button__task--delete',
        taskEditBtn: 'button button__task button__task--edit'
    };

    const {
        list,
        taskDoneBtn,
        taskDeleteBtn,
        taskEditBtn
    } = classes;

    const tasksList = tasks.map(task=> {
        const {title, content, date, category, priority, id, classList} = task;
        const ID = `${id.date}-${id.title}`;
        
        return (
            <li
                className={classList}
                key={ID}
                id={ID}
                onClick={()=> handleClick(task)}
            >
            <p>{title}</p>
            
            <div>
                <Button
                    classes={taskDoneBtn}
                    spanClassName={'fas fa-check'}
                />
                <Button
                    classes={taskDeleteBtn}
                    spanClassName={'fas fa-times'}
                />
            </div>
            
            </li>
        );
    });

    return (
        
        <ul className={list}>
            {tasksList}
        </ul>
        
    )
};

export default Tasks;