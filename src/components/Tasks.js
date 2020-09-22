import React from 'react';
import Button from './Button';

const Tasks = props=> {
    const {tasks, handleClick, setTaskAsDone, removeTask} = props;
    
    if(tasks.length<1) return[]; //if state.tasks contains no task a empty array returned;

    const classes = {
        //css classes
        list: 'dayTasks__list',
        taskDoneBtn:'button button__task button__task--done',
        taskDeleteBtn: 'button button__task button__task--delete',
        taskEditBtn: 'button button__task button__task--edit',
        buttonsBox: 'button__task-box'
    };

    const {
        list,
        taskDoneBtn,
        taskDeleteBtn,
        buttonsBox
    } = classes;

   tasks.sort((a,b)=> {

       // sort tasks by date 
       const dateA = a.id.date.replace(/[-]/g,'');
       const dateB = b.id.date.replace(/[-]/g,'');

       return (
           dateA - dateB
       );

   });

    const tasksList = tasks.map(task=> {

        const {title, priority, id, classList, done} = task;
        const ID = `${id.date}-${id.title}`;
        let classes = classList;

        if(priority) classes = `${classList} priority`;
        if(done) classes = `${classes} done`;

        return (
            
            <li
                className={classes}
                key={ID}
                id={ID}
                onClick={(e)=> handleClick(e,task)}
            >
            <p>{title}</p>
            
            <div className={buttonsBox}>

                <Button
                    classes={taskDoneBtn}
                    spanClassName={'fas fa-check'}
                    handleClick={(e)=> setTaskAsDone(e, id)}
                />

                <Button
                    classes={taskDeleteBtn}
                    spanClassName={'fas fa-times'}
                    handleClick={(e)=> removeTask(e, id)}
                />

            </div>
            
            </li>
        );

    });

    return (
        
        //return task main list or day tasks according of handed tasks array
        <ul className={list}>

            {tasksList}

        </ul>
        
    )
};

export default Tasks;