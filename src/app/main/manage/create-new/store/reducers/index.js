import {combineReducers} from 'redux';
import create from './create.reducer';

const createNewReducers = combineReducers({
    create
});

export default createNewReducers;