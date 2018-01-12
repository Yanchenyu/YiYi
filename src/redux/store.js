import { createStore } from 'redux';
import reducers from './reducers';

const initState = {
    userInfo: {
        username: ''
    }
};

export const store = createStore(
    reducers,
    initState
);
