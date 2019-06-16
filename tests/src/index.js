// подключение модулей
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import { Provider } from 'react-redux';
import './Firebase';
import './App.css';
import App from './App';

// создание хранилища состояний
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// рендер приложения
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <App/>
    </Provider>,
    document.getElementById('root'));