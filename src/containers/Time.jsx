import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles.scss';

class Time extends Component {
    state = {
      date: new Date()
    };
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            });
        }, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className={styles.time}>
                <h2>
                    {moment(this.state.date).format('YYYY-MM-DD HH:mm:ss')}
                </h2>
            </div>
        )
    }
}

export default Time;