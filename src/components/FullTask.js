import React from 'react';

const FullTask = props=> {
    
    if(!props.task) return;

    const {title, date, content} = props.task;
    return (
        <div className="fullTask__box">
            <p>{date}</p>
            <p>{title}</p>
            <p>{content}</p>
            <div className="fullTask__btns">

            </div>
        </div>
    );
};

export default FullTask;