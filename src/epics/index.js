import { combineEpics } from 'redux-observable';
import fetchAsyncData from './fetchData';
import { incrementIfOddEpic } from './incrementIfOdd';

export default combineEpics(
    fetchAsyncData,
    incrementIfOddEpic
);
