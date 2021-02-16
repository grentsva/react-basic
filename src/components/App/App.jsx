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
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

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

    propertySelector(id, property) {
        this.setState(({ data }) => {
            const index = data.findIndex((elem) => elem.id === id);
            const old = data[index];
            let newItem;
            if (property === 'important') {
                newItem = { ...old, important: !old.important };
            } else if (property === 'like') {
                newItem = { ...old, like: !old.like };
            } else {
                console.log('Error');
            }
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

    onToggleImportant(id) {
        this.propertySelector(id, 'important');
    }

    onToggleLiked(id) {
        this.propertySelector(id, 'like');
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter((item) => item.like);
        } else {
            return items;
        }
    }

    onUpdateSearch(term) {
        this.setState({ term });
    }

    onFilterSelect(filter) {
        this.setState({ filter });
    }

    render() {
        const { data, term, filter } = this.state;
        const visiblePosts = this.filterPost(
            this.searchPost(data, term),
            filter
        );
        const likeTotal = data.filter((item) => item.like).length;
        const postsTotal = data.length;
        return (
            <div className='app'>
                <AppHeader likeTotal={likeTotal} postsTotal={postsTotal} />
                <div className='search-panel d-flex'>
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm onAdd={this.addItem} />
            </div>
        );
    }
}
