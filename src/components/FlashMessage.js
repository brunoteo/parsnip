import React from 'react';

export default function FlashMessage({message}) {
    return (
        <div className="flash-error">
            {message}
        </div>
    );
}

Error.defaultProps = {
    message: 'An error occurred',
};