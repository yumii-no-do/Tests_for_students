import React from 'react';
import { logout, getUser } from '../Actions/UserActions';
import { connect } from 'react-redux';
import { Switch, Route,HashRouter } from 'react-router-dom';
import Profile from './Profile';
import Header from './Header';
import Test from './Test';
import database from '../Firebase';
import SelectTest from './SelectTest';
import Mark from './Mark';
import Statistic from './Statistic';
import Loading from '../Components/Loading';

class Home extends React.Component {
    state = {
        themesList: []
    }
    componentWillMount() {
        this.props.getUser();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace('/Login');
        }
        database.collection('themes').get()
            .then(list => {
                const themesList = list.docs.map(doc => {
                    return { id: doc.id, title: doc.data().name }
                })
                this.setState({ themesList })
            })
            
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace('/Login');
        }
    }
    componentWillUnmount(){
      this.setState({
          
      })
    }
    render() {
        return (
            this.props.user.loading
            ?<Loading/>
            :<div>
                <Header history={this.props.history} />
                <Switch>
                    <Route path="/Profile" component={Profile} />
                    <Route path="/Test/:string" component={Test} />
                    <Route path="/Mark/:string" component={Mark} />
                    <Route path="/Statistic" component={Statistic} />
                    <Route path="/" component={SelectTest} />
                </Switch>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { user: state.user };
}
export default connect(mapStateToProps, { logout, getUser })(Home)

