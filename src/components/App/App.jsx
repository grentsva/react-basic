import React, { Component } from 'react';
import './App.css';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import PostStatusFilter from '../PostStatusFilter';
import PostList from '../PostList/PostList';
import PostAddForm from '../PostAddForm';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    label: 'Going to learn React',
                    important: true,
                    like: false
                },
                {
                    id: 2,
                    label: 'That is so good',
                    important: false,
                    like: false
                },
                {
                    id: 3,
                    label: 'I need a break...',
                    important: false,
                    like: false
                }
            ]
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);

        this.maxId = 4;
    }
    deleteItem(id) {
        this.setState(({ data }) => {
            const index = data.findIndex((elem) => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            };
        });
    }
    addItem(body) {
        const newItem = {
            id: this.maxId++,
            label: body,
            important: false
        };
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            };
        });
    }
    // Need refactor, DRY
    onToggleImportant(id) {
        this.setState(({ data }) => {
            const index = data.findIndex((elem) => elem.id === id);
            const old = data[index];
            const newItem = { ...old, important: !old.important };
            const newArr = [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index + 1)
            ];
            return {
                data: newArr
            };
        });
    }
    onToggleLiked(id) {
        this.setState(({ data }) => {
            const index = data.findIndex((elem) => elem.id === id);
            const old = data[index];
            const newItem = { ...old, like: !old.like };
            const newArr = [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index + 1)
            ];
            return {
                data: newArr
            };
        });
    }

    render() {
        const { data } = this.state;
        const likeTotal = data.filter((item) => item.like).length;
        const postsTotal = data.length;
        return (
            <div className='app'>
                <AppHeader likeTotal={likeTotal} postsTotal={postsTotal} />
                <div className='search-panel d-flex'>
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <PostList
                    posts={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm onAdd={this.addItem} />
            </div>
        );
    }
}
