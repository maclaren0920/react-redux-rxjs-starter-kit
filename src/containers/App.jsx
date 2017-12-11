import React from 'react';
import logo from '../static/images/logo.png';
import styles from './styles.scss';

const App = () => (
    <div className={styles.home}>
        <h4>Welcome to React-Redux-Rxjs-Generator</h4>
        <img src={logo} alt="" width='150' height='150'/>
    </div>
);

export default App;
