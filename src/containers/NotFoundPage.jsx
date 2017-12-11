import React from 'react';

import styles from './styles.scss';

const NotFoundPage = ({ history }) => {
    return (
        <div className={styles.notFound}>
            <a className={styles.back} onClick={history.goBack}>Back</a>
            <h3>NotFoundPage</h3>
        </div>
    )
}

export default NotFoundPage;