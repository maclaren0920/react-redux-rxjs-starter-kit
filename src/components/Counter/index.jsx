import React from 'react';
import { Button } from 'antd';
import styles from './style.scss';
import Immutable from 'immutable';


const Counter = props => {
    const { counter, users, increment, decrement, incrementIfOdd, incrementAsync, fetchUser } = props;
    const asyncFetch = () => {
        fetchUser('torvalds');
    }

    const fetchData = () => {
        let set = new Set();
    }

    return (
        <div id={styles.counter}>
            <span> counter: { counter }</span>
            {' '}
            <button type="primary" onClick={increment}>increment</button>
            {' '}
            <button type="primary" onClick={decrement}>decrement</button>
            {' '}
            <button type="primary" onClick={incrementIfOdd}>incrementIfOdd</button>
            {' '}
            <button type="primary" onClick={incrementAsync}>incrementAsync</button>
            {' '}
            <button type="primary" onClick={asyncFetch}>request_user_repos</button>
            <div>{users && JSON.stringify(users)}</div>
        </div>
    )
};

export default Counter;