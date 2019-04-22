import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Containers/Home';
import CreateAccount from './Containers/CreateAccount';
import Login from './Containers/Login';
import './App.css';
// import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';

// const theme = createMuiTheme({
//     palette: {
//       primary: {
//         light: '#757ce8',
//         main: '#3f50b5',
//         dark: '#002884',
//         contrastText: '#fff',
//       },
//       secondary: {
//         light: '#ff7961',
//         main: '#f44336',
//         dark: '#ba000d',
//         contrastText: '#000',
//       },
//     },
//   });

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/CreateAccount" component={CreateAccount} />
                <Route path="/Login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));