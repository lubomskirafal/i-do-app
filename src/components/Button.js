import React from 'react';

const Button = (props)=> {
    const {classes, content, handleClick, spanClassName} = props;
    return (
        <button 
            className={classes}
            onClick={handleClick}
        >
        <span
        className={spanClassName}>
            {content}
        </span>
        </button>
    )
};

export default Button;