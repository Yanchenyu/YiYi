import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './containers/App';
import Login from './containers/Login/Login';

render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/app" component={App} />
                <Redirect to="/" />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
