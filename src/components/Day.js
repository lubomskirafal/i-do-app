import React from 'react';
const Day = (props)=> {
    const {date,} = props;
    return (
        <div 
            className={"day"}
            id={date}
        >
            {date}
        </div>
    )
};

export default Day;