import React from 'react';

const Button = (props)=> {
    const {classes, content, handleClick} = props;
    return (
        <button 
            className={classes}
            onClick={handleClick}
        >
        {content}
        </button>
    )
};

export default Button;