import React from 'react';
import './PostList.css';
import PostListItem from '../PostListItem';

const PostList = () => {
    return (
        <div>
            <ul className='app-list list-group'>
                <PostListItem />
                <PostListItem />
                <PostListItem />
            </ul>
        </div>
    );
};

export default PostList;
