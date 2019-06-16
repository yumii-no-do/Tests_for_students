import React from 'react';
import { Typography, Grid, FormHelperText, Button, } from '@material-ui/core';
import { logout, getUser } from '../Actions/UserActions';
import { getUsers } from '../Actions/UsersActions';
import { setThemesList } from '../Actions/ThemesActions';
import { connect } from 'react-redux';
import SelectionComp from '../Components/SelectionComp';
import Loading from '../Components/Loading';
import { setSelectedThemeId } from '../Actions/ThemesActions';


class SelectTest extends React.Component {
    state = {
        themesList: [],
        themeId: '',
        error: false,
        loading: true,
    }
    componentWillMount() {
        

        this.props.getUsers();
        let  userGroup, groupList, listUsersWithGroup, themesList = null;
        const { user, themes, groups,setThemesList } = this.props;
        userGroup = user.group;
        groupList = groups.list;
        let preThemeListId = themes.data.map(item => {
            return { id: item.id, name: item.name, access: item.access }
        });
        const themeListId = [];
        groupList.forEach((item, index) => { themeListId[index] = [] })
        preThemeListId.forEach(item => {
            item.access.forEach(accessItem => {
                themeListId[parseInt(accessItem)].push({ id: item.id, name: item.name })
            })
        })
        themesList = themeListId[userGroup].map(item => { return { id: item.id, title: item.name } })
        
        for (const key in user.marks) {
            if (user.marks.hasOwnProperty(key)) {
                themesList = themesList.filter(item=>{
                    return item.id !== key
                })
            }
        }
        themesList = themesList.length === 0 ? null : themesList;
        setThemesList(themesList);

        this.setState({
            listUsersWithGroup,
            userGroup,
            themesList,
            loading: false,
        })

    }
    componentWillUnmount(){
        

        this.setState({
            listUsersWithGroup:null,
            userGroup:null,
            themesList:null,
            loading: true,
        })
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        
        const themesList = this.props.themesList || this.state.themesList;
        return (
            this.state.loading
                ? <Loading />
                : <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ flexGrow: 1, marginTop: 40 }} spacing={40}>
                    <Grid item md={12}>
                        <Typography align="center" variant="display2" color="secondary">Тест</Typography>
                    </Grid>
                    {
                        themesList === null
                            ? <Typography align="center" variant="title" color="secondary">Для вас нет тестов на данный момент</Typography>
                            : <div style={{ maxWidth: 500, width: '100%' }}>
                                <SelectionComp error={(this.state.error)} title="Выберите тему" handle={this.handleChange('themeId')} style={{ width: '100%' }} items={themesList} />
                                {!this.state.error ? null : <FormHelperText error>{this.state.error}</FormHelperText>}
                            </div>
                    }
                    {themesList === null
                        ? null
                        : <Grid item md={12}>
                            <Grid container md={12} justify="center">
                                <Button variant="contained" onClick={() => {
                                    if (this.state.themeId === '') {
                                        this.setState({
                                            error: 'Необходимо выбрать тему'
                                        })
                                    } else {
                                        this.setState({
                                            error: false
                                        })

                                        this.props.setSelectedThemeId(this.state.themeId)
                                        this.props.history.replace('/home/test');

                                    }
                                }} size="large" color="primary" >Начать</Button>
                            </Grid> </Grid>
                    }

                </Grid>
        );
    }

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
            ...state.user,
        },
        themes: state.themes,
        groups: state.groups,
        themesList:state.themes.themesList,
    };
}

export default connect(mapStateToProps, { logout, getUser,setSelectedThemeId,setThemesList,getUsers })(SelectTest)


