import React from 'react';
const Day = (props)=> {
    const {date,classes, handleClick, id, tasks} = props;
    return (
        <div 
            className={classes}
            id={id}
            tasks={tasks}
            onClick={(e)=> handleClick(e,tasks)}
        >
            {date}
        </div>
    )
};

export default Day;