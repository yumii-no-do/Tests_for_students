import React from 'react';
import { logout, getUser, userVerification } from '../Actions/UserActions';
import { getUsers } from '../Actions/UsersActions';
import { connect } from 'react-redux';
import { Switch, Router, Route, BrowserRouter } from 'react-router-dom';
import Profile from './Profile';
import Header from './Header';
import Test from './Test';
import SelectTest from './SelectTest';
import Mark from './Mark';
import Statistic from './Statistic';
import Loading from '../Components/Loading';
import { Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { getAllData } from '../Actions/InitAction';

class Home extends React.Component {

    componentWillMount() {
        console.log('Home','componentWillMount');
        
        const { user, usersLoading, themesLoading, groupsLoading, getUser } = this.props;
        const loadedAll = usersLoading || user.loading || themesLoading || groupsLoading;
        getUser();

        this.props.getAllData();
        const { signedIn, history } = this.props;
        if (signedIn === false) {
            history.replace('/login');
        }
    }
componentWillUnmount(){
    console.log('Home','componentWillUnmount');
        
}

    render() {
        const { user, usersLoading, themesLoading, groupsLoading } = this.props;
        const verified = user.emailVerified && user.teacherVerified;
        const loadedAll = usersLoading || user.loading || themesLoading || groupsLoading;
        return (
            loadedAll
                ? <Loading />
                : <div>
                    <Header history={this.props.history} />
                    {verified ?
                        <Switch>
                            <Route path="/home/profile" component={Profile} />
                            <Route path="/home/test" component={Test} />
                            <Route path="/home/mark" component={Mark} />
                            <Route path="/home/statistic" component={Statistic} />
                            <Route component={SelectTest} />
                        </Switch>
                        :
                        <div>
                            {!user.emailVerified && <EmailVerified emailVerifiedFun={this.props.userVerification} updateData={this.props.getAllData}/>}
                            {!user.teacherVerified && <TeacherVerified />}
                        </div>
                    }
                </div>
        );
    }
}


function EmailVerified({ emailVerifiedFun,updateData }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '40px' }}>
            <Card style={{ maxWidth: 500, width: '100%', padding: 10, margin: 10 }}>
                <CardContent>
                    <Typography variant="h5" component="h5"> Подтвердите свой e-mail!</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={emailVerifiedFun} variant="contained" color="primary">Отправить подтверждение</Button>
                    <Button onClick={()=>{window.location.reload()}} variant="contained" color="default">Обновить</Button>
                </CardActions>
            </Card>
        </div>

    )
}

function TeacherVerified() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '40px' }}>
            <Card style={{ maxWidth: 500, width: '100%', padding: 10, margin: 10 }}>
                <CardContent>
                    <Typography variant="h5" component="h5"> Обратитесь к преподавателю для подтверждения аккаунта!</Typography>
                </CardContent>
            </Card>
        </div>

    )
}

function mapStateToProps(state) {

    return {
        user: {
            name: state.user.displayName,
            email: state.user.email,
            photoUrl: state.user.photoURL,
            emailVerified: state.user.emailVerified,
            teacherVerified: state.user.teacherVerified,
            uid: state.user.uid,
            signedIn: state.user.isSignedIn,
            loading: state.user.loading,
        },
        signedIn: state.user.isSignedIn,
        usersLoading: state.users.loading,
        themesLoading: state.themes.loading,
        groupsLoading: state.groups.loading,

    };
}
export default connect(mapStateToProps, { logout, getUser, userVerification, getAllData,getUsers })(Home)

