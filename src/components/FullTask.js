import React from 'react';
import Button from './Button';

const FullTask = props => {
    
    if(!props.task) return;

    const {title, date, content, priority, id, done} = props.task;
    
    const classes = {
        spanBtnOk: 'fas fa-check',
        spanBtnDelete: 'fas fa-times',
        spanBtnEdit: 'fas fa-edit',
        buttonsBox: 'button__task-box button__task-box--full',
        taskDeleteBtn: 'button button__task button__task--delete',
        taskEditBtn: 'button button__task button__task--edit',
        taskDoneBtn:'button button__task button__task--done',
        titleStyle: 'fullTask__title',
        mainBox: 'fullTask__box',
        fullTaskDate: 'fullTask__date',
        contentBox: 'fullTask__content-box',
        contentCss: 'fullTask__content'
    };

    const {
        spanBtnOk,
        spanBtnDelete,
        buttonsBox,
        spanBtnEdit,
        taskDeleteBtn,
        taskEditBtn,
        taskDoneBtn,
        titleStyle,
        fullTaskDate,
        mainBox,
        contentBox,
        contentCss
    } = classes;

    return (
        <div className={!done? mainBox: `${mainBox} done`}>
            <div>
                <div className={buttonsBox}>
                    <Button
                        classes={taskDoneBtn}
                        spanClassName={spanBtnOk}
                        handleClick={(e)=> props.setTaskAsDone(e,id)}
                     />
                    <Button
                        classes={taskEditBtn}
                        spanClassName={spanBtnEdit}
                    />
                    <Button
                        classes={taskDeleteBtn}
                        spanClassName={spanBtnDelete}
                    />
                </div>

                <div>
                    <p className={priority?`${titleStyle} priority`: titleStyle}>{title}</p>
                    <p className={fullTaskDate}>{date}</p>
                </div>
            </div>
            <div className={contentBox}>
                <p className={contentCss}>{content}</p>
            </div>
        </div>
    );
};

export default FullTask;