import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.scss';

const Header = () => {
    return (
        <div className={styles.header}>
            <h1>React Rotuer Redux Rxjs Starter Kit</h1>
            <NavLink to="/" activeClassName={styles.active}>Home</NavLink>
            {' · '}
            <NavLink to="/counter" activeClassName={styles.active}>Counter</NavLink>
            {' · '}
            <NavLink to="/time" activeClassName={styles.active}>Time</NavLink>
            {' · '}
            <NavLink to="/route" activeClassName={styles.active}>Route</NavLink>
            {' · '}
            <NavLink to="/404" activeClassName={styles.active}>404</NavLink>
        </div>
    )
}

export default Header;
