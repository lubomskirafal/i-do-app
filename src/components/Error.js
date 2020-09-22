import React from 'react';

const Error = (props)=> {

    const {content} = props;

    //display error msg
    return (

        <div
            className={'error'}
        >
        {content}
        </div>

    );
    
};

export default Error;