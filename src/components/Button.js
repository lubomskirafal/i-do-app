import React from 'react';

const Button = (props)=> {
    const {classes, content, setMonthIndex, setYear} = props;
    return (
        <button 
            className={classes}
            onClick={setMonthIndex?setMonthIndex:setYear}
        >
        {content}
        </button>
    )
};

export default Button;