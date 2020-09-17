import React from 'react';

const FullTask = props=> {
    
    if(!props.task) return;

    const {title, date, content} = props.task;
    return (
        <div className="fullTask__box">
            <p className="fullTask__title">{title}</p>
            <p className="fullTask__date">{date}</p>
            <div className="fullTask__content-box">
                <p className="fullTask__content">{content}</p>
            </div>
            <div className="fullTask__btns">

            </div>
        </div>
    );
};

export default FullTask;