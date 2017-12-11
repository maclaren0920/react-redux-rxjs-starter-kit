import { FETCH_USER_FULFILLED } from '../constants/actionTypes';

export default function users(state = {}, action) {
    switch (action.type) {
        case FETCH_USER_FULFILLED:
            return {
                ...state,
                [action.payload.login]: action.payload
            };
        default:
            return state;
    }
};
