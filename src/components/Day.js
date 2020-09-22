import React from 'react';

//represents each day in calendar
const Day = (props)=> {

    //attr of each day object
    const {date,classes, handleClick, id, tasks} = props;

    return (

        <div 
            className={classes}
            id={id}
            tasks={tasks}
            onClick={(e)=> handleClick(e,tasks)} // show tasks list for each day
        >
            {date}
        </div>
    )
    
};

export default Day;