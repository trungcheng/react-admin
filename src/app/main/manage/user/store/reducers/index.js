import {combineReducers} from 'redux';
import user from './user.reducer';

const userReducers = combineReducers({
    user
});

export default userReducers;