import React from 'react';

// import '../Style.css';
var isError='App';

const textInput = ( props ) => {
    // console.log(props.isError);
    if (props.isError==null){
        isError='App'
    } else {
        isError='Error'
    }
    return (
        <div>
            <input 
                type="text" 
                onChange={props.changed} 
                value={props.value} 
                className={isError}
                autoFocus = {true}
            />
        </div>
    )
};

export default textInput;