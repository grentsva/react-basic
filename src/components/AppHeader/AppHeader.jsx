import React from 'react';
import './AppHeader.css';

const AppHeader = ({ postsTotal, likeTotal }) => {
    return (
        <div className='app-header d-flex'>
            <h1>Vladislav Grents</h1>
            <h2>
                {postsTotal} записей, из них понравилось {likeTotal}
            </h2>
        </div>
    );
};

export default AppHeader;
