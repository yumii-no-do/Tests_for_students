// подключение модулей
import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Containers/Home';
import CreateAccount from './Containers/CreateAccount';
import Login from './Containers/Login';
import './App.css';
import { connect } from 'react-redux';
import { getUser, isSignedIn } from './Actions/UserActions';

import { createHashHistory } from 'history'

const history = createHashHistory();

class App extends React.Component {

    componentWillMount() {
        this.props.getUser();
        this.props.isSignedIn();
    }
    render() {
        const { signedIn } = this.props;
        if(signedIn){
            history.push('/home');
        }else{
            history.push('/login');
        }
        
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={Home} />
                    <Route path="/create-account" component={CreateAccount} />
                    
                    <Route exact path="/" render={() => (
                        signedIn ? (
                            <Redirect to="/home" />
                        ) : (
                                <Redirect to="/login" />
                            )
                    )} />
                    
                </Switch>
            </Router>
        )
    }
}
export default connect(state => ({ signedIn: state.user.isSignedIn }), { getUser, isSignedIn })(App)