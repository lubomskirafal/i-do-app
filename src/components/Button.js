import React from 'react';

const Button = (props)=> {
    
    //attr for each button
    const {classes, content, handleClick, spanClassName} = props;

    return (
        /*Button component require classes for css, 
        handleClick, content for display button text , 
         or spanClassName for font awsome  */
        <button 
            className={classes}
            onClick={handleClick}
        >
        <span
        className={spanClassName}>
            {content}
        </span>
        </button>

    );
};

export default Button;