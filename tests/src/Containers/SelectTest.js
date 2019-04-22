import React from 'react';
import { Typography, Grid, FormHelperText, Button, } from '@material-ui/core';
import { logout, getUser } from '../Actions/UserActions';
import { connect } from 'react-redux';
import SelectionComp from '../Components/SelectionComp';
import Loading from '../Components/Loading';
import database from '../Firebase';


class SelectTest extends React.Component {
    state = {
        themesList: [],
        themeId: '',
        error: false,
        loading: true,
    }
    componentWillMount() {
        this.props.getUser();
    }
    componentWillReceiveProps(nextProps) {
        let groupData, userGroup, groupList, listUsersWithGroup, themeListId, themesList = null;
        database.collection('users').doc(nextProps.user.uid).get()
            .then(doc => {
                userGroup = doc.data().group;
            })
            .then(() => {
                database.collection('groups').doc('groupList').get()
                    .then(list => {
                        groupData = list.data();
                        groupList = groupData.list;
                    })
                    .then(() => {
                        database.collection('themes').get()
                            .then(list => {
                                let preThemeListId = list.docs.map(item => {
                                    return { id: item.id, name: item.data().name, access: item.data().access }
                                });
                                themeListId = [];
                                groupList.forEach((item, index) => { themeListId[index] = [] })
                                preThemeListId.forEach(item => {
                                    item.access.forEach(acc => {
                                        themeListId[+acc].push({ id: item.id, name: item.name })
                                    })
                                })
                                themesList = themeListId[userGroup].map(item => { return { id: item.id, title: item.name } })
                                themesList = themesList.length===0?null:themesList;
                                this.setState({
                                    listUsersWithGroup,
                                    userGroup,
                                    themesList,
                                    loading: false,
                                })
                            })
                    })
            })

    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        return (
            this.state.loading
            ?<Loading/>
            :<Grid container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ flexGrow: 1, marginTop: 40 }} spacing={40}>
                <Grid item md={12}>
                    <Typography align="center" variant="display2" color="secondary">Тест</Typography>
                </Grid>
                {
                this.state.themesList===null
                ?<Typography align="center" variant="title" color="secondary">Для вас нет тестов на данный момент</Typography>
                :<div style={{ maxWidth: 500, width: '100%' }}>
                        <SelectionComp error={(this.state.error)} title="Выберите тему" handle={this.handleChange('themeId')} style={{width: '100%' }} items={this.state.themesList} />
                {!this.state.error ? null : <FormHelperText error>{this.state.error}</FormHelperText>}
                    </div>
                    }
                    {this.state.themesList===null
                    ?null
                :<Grid item md={12}>
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
                            this.props.history.replace('/Test/' + this.state.themeId);
                        }
                    }} size="large" color="primary" >Начать</Button>
                </Grid> </Grid>
            }
           
            </Grid>
        );
    }

}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, { logout, getUser })(SelectTest)


