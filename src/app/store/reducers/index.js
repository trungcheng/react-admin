import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';

import formula from 'app/main/manage/formula/store/reducers';
import member from 'app/main/manage/member/store/reducers';
import account from 'app/main/manage/account/store/reducers';

import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        formula,
        member,
        account,
        quickPanel,
        ...asyncReducers
    });

export default createReducer;
