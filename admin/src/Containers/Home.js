import React from 'react';
import { logout, getUser, getUsers } from '../Actions/UserActions';
import { getGroups } from '../Actions/GroupsActions';
import { getThemes } from '../Actions/ThemesActions';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import database from '../Firebase';
import Statistic from './Statistic';
import Loading from '../Components/Loading';
import Settings from './Settings';


class Home extends React.Component {

    componentWillMount() {
        this.props.getUser();
        this.props.getUsers();
        this.props.getGroups();
        this.props.getThemes();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace('/Login');
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace('/Login');
        }
    }
    render() {
        const loaders = this.props.user.loading &&
                        this.props.users.loading &&
                        this.props.groups.loading &&
                        this.props.themes.loading;
        return (

            loaders ? <Loading />
                : <div>
                    <Header history={this.props.history} />

                    <Switch>
                        <Route path="/Statistic" component={Statistic} />
                        <Route path="/" component={Settings} />
                    </Switch>
                </div>

        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        users: state.users,
        groups: state.groups,
        themes: state.themes,
    };
}

export default connect(mapStateToProps, { logout, getUser, getUsers, getGroups, getThemes })(Home)


