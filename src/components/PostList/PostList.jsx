import React from 'react';
import './PostList.css';
import PostListItem from '../PostListItem';

const PostList = ({ posts, onDelete, onToggleImportant, onToggleLiked }) => {
    return (
        <div>
            <ul className='app-list list-group'>
                {posts.map((item) => {
                    return (
                        <li className='list-group-item' key={item.id}>
                            <PostListItem
                                {...item}
                                onDelete={() => {
                                    onDelete(item.id);
                                }}
                                onToggleImportant={() => {
                                    onToggleImportant(item.id);
                                }}
                                onToggleLiked={() => {
                                    onToggleLiked(item.id);
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PostList;
