import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import { Provider } from 'react-redux';
import {Switch, Route,HashRouter as Router } from 'react-router-dom';
import Home from './Containers/Home';
import Login from './Containers/Login';
import './App.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <Router>
            <Switch>
                <Route path="/Login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));