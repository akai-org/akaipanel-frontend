import React from 'react';
// import Login component

export const Guard = (component) => {
    return true ? component : AuthError;
};

const AuthError = () => {
    return (
        // render login component
        <>
            <h1>You failed...</h1>
        </>
    );
};

export default Guard;