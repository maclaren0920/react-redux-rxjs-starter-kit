import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';

import { fetchUserFulfilled } from '../actions';
import { FETCH_USER } from '../constants/actionTypes';



export default function fetchAsyncData (action$, store) {
    console.log(store);
    return action$.ofType(FETCH_USER)
        .mergeMap(action =>
            ajax.getJSON(`https://api.github.com/users/${action.payload}`)
                .map(response => fetchUserFulfilled(response))
        );

}


