// подключение модулей
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Home from './Containers/Home';
import CreateAccount from './Containers/CreateAccount';
import Login from './Containers/Login';
import './App.css';

// создание хранилища состояний
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// рендер приложения
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/Login" component={Login} />
                <Route path="/" component={Home} />
                <Redirect from='/Login' to='/'/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));