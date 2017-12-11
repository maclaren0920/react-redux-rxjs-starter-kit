import { INCREMENT, DECREMENT, FETCH_USER, INCREMENT_IF_ODD, FETCH_USER_FULFILLED } from '../constants/actionTypes';

export const increment = () => {
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT
    }
}

export const incrementIfOdd = () => {
    return {
        type: INCREMENT_IF_ODD
    }
};

export const incrementAsync = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment());
        }, 1000);
    }
}

export const fetchUser = username => {
    return {
        type: FETCH_USER, payload: username
    }
};
export const fetchUserFulfilled = payload => {
    return {
        type: FETCH_USER_FULFILLED, payload
    }
};

