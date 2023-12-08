import React from 'react';
import loadingFile from '../assets/loading.svg';

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '150px',
};

function Loading() {
    return (
        <div style={style}>
            <img src={loadingFile} alt="" />
        </div>
    );
}

export default Loading;
