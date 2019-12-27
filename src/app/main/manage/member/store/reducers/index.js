import {combineReducers} from 'redux';
import member from './member.reducer';

const memberReducers = combineReducers({
    member
});

export default memberReducers;