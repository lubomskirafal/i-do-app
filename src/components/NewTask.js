import React from 'react';
import Button from './Button';
import Error from './Error';

const NewTask = (props)=> {
    const classes = {
        buttonClose:'button button--close',
        buttonAdd: 'button button--add-task button--add-task--newTask',
        newTask: 'newTask',
        form: 'newTask__form',
    };

    const {
        buttonClose, 
        buttonAdd, 
        newTask, 
        form
    } = classes;

    const {
        handleNewTaskModal, 
        handleAddNewTask, 
        handleFormChange, 
        newTaskDate, 
        newTaskPriority, 
        newTaskTitle, 
        newTaskContent,
        noTaskTitle,
        noTaskContent
    } = props;
    
    return(

        <div className={newTask}>
        <Button
            classes={buttonClose}
            handleClick={handleNewTaskModal}
        />
            <form className={form}>
                <input 
                    type="date" 
                    id="date" 
                    value={newTaskDate}
                    onChange={(e)=> handleFormChange(e.target.value, 'newTaskDate')}
                />

                <label 
                    htmlFor="priority">Priority
                    <input 
                        type="checkbox" 
                        id="priority" 
                        checked={newTaskPriority}
                        onChange={(e)=> handleFormChange(e.target.checked, 'newTaskPriority')}
                    />
                </label>
                
                <input 
                    type="text" 
                    id="title"
                    placeholder="Title"
                    value={newTaskTitle}
                    onChange={(e)=> handleFormChange(e.target.value, 'newTaskTitle')}
                />

                {noTaskTitle&&<Error content={"Title required"}/>}

                <textarea 
                    onChange={(e)=> handleFormChange(e.target.value, 'newTaskContent')}
                    value={newTaskContent}
                    placeholder="Message"
                    name="content" 
                    id="content" 
                    cols="30" 
                    rows="10"
                >
                
                </textarea>

                {noTaskContent&&<Error content={"Content required"}/>}

                <Button
                    classes={buttonAdd}
                    content={'Add task'}
                    handleClick={handleAddNewTask}
                />
            </form>
        </div>
    )
};

export default NewTask;