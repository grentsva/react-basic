import React from 'react';
import './PostList.css';
import PostListItem from '../PostListItem';

const PostList = ({ posts }) => {
    return (
        <div>
            <ul className='app-list list-group'>
                {posts.map((item) => {
                    return (
                        <li className='list-group-item' key={item.id}>
                            <PostListItem {...item} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PostList;
