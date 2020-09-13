import React from 'react';

const Error = (props)=> {
    const {content} = props;
    return (
        <div
            className={'error'}
        >
        {content}
        </div>
    );
};

export default Error;