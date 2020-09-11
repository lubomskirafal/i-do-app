import React from 'react';
import Button from './Button';

const NewTask = (props)=> {
    const classes = {
        buttonClose:'button button--close',
        buttonAdd: 'button button--add-task button--add-task--newTask',
        newTask: 'newTask',
        form: 'newTask__form',
    };

    const {buttonClose, buttonAdd, newTask, form} = classes;
    const {handleNewTaskModal} = props;
    
    return(
        <div className={newTask}>
        <Button
            classes={buttonClose}
            handleClick={handleNewTaskModal}
        />
            <form className={form}>
                <label htmlFor="date">Set date</label>
                <input type="date" id="date"/>
                <label htmlFor="celect">Category</label>
                <select name="category" id="category">
                    <option value="work">Work</option>
                    <option value="home">Home</option>
                    <option value="finance">Finance</option>
                    <option value="school">School</option>
                    <option value="other">Other</option>
                </select>
                <label htmlFor="priority">Priority</label>
                <input type="checkbox" id="priority"/>
                <label htmlFor="title">Title</label>
                <input type="text" id="title"/>
                <textarea name="content" id="content" cols="30" rows="10"></textarea>
                <Button
                    classes={buttonAdd}
                    content={'Add task'}
                />
            </form>
        </div>
    )
};

export default NewTask;