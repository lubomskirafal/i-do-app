import React from 'react';
const Day = (props)=> {
    const {date,classes} = props;
    return (
        <div 
            className={classes}
            id={date}
        >
            {date}
        </div>
    )
};

export default Day;