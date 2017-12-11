import React from 'react';
import styles from './styles.scss';

const RouteBack = ({ match, history }) => {
    const handleGoToHome = () => {
        history.push('/');
    };
    return (
        <div className={styles.route}>
            <h3>path: {match.path}</h3>
            <button onClick={handleGoToHome}>go to Home</button>
        </div>
    )
};

export default RouteBack;