import React from 'react';

const Button = (props)=> {
    return (
        <button 
            className={props.classes}
        >
        {props.content}
        </button>
    )
};

export default Button;