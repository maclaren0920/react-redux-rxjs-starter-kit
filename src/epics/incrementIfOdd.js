import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { INCREMENT_IF_ODD } from '../constants/actionTypes';
import { increment } from '../actions'

export const incrementIfOddEpic = (action$, store) => {
    return action$.ofType(INCREMENT_IF_ODD)
        .filter(() => store.getState().counter % 2 === 1)
        .map(() => increment());
}
    