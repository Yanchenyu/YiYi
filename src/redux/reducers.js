import { combineReducers } from 'redux';
import userInfo from '../containers/Login/reducer';

const reducers = combineReducers({
    userInfo
});

export default reducers;