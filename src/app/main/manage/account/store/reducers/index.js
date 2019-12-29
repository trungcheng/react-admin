import {combineReducers} from 'redux';
import account from './account.reducer';

const accountReducers = combineReducers({
    account
});

export default accountReducers;