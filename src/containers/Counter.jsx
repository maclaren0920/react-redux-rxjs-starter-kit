import React from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions';
import Counter from '../components/Counter';

const mapStateToProps = state => {
    return {
        counter: state.counter,
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    users: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);




