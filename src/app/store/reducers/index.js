import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';

import member from 'app/main/manage/member/store/reducers';

import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        member,
        quickPanel,
        ...asyncReducers
    });

export default createReducer;
