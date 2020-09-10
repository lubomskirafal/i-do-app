import React from 'react';

const Button = (props)=> {
    const {classes, content, setIndex} = props;
    return (
        <button 
            className={classes}
            onClick={setIndex}
        >
        {content}
        </button>
    )
};

export default Button;