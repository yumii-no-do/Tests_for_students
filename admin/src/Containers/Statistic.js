import React from 'react';
import { logout, getUser } from '../Actions/UserActions';
import { connect } from 'react-redux';
import database from '../Firebase';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AutoTable from '../Components/AutoTable';
import Loading from '../Components/Loading';



class Statistic extends React.Component {
    state = {
        mark: '',
        value: 0,
        loading: true,
        table: [[]],
    }
    componentWillMount() {
        this.props.getUser();
    }
    componentWillReceiveProps(nextProps) {
        let listUsers, groupData, groupList, listUsersWithGroup = null;
        database.collection('users').get()
            .then(list => {
                listUsers = list.docs.map(doc => {
                    return { id: doc.id, doc: doc.data() }
                })
            })
            .then(() => {
                database.collection('groups').doc('groupList').get()
                    .then(list => {
                        groupData = list.data();
                        groupList = groupData.list;
                        listUsersWithGroup = [];
                        groupList.forEach((item, index) => { listUsersWithGroup[index] = [] })
                        listUsers.forEach(item => {
                            if(item.doc.teacherVerified){
                                 listUsersWithGroup[+item.doc.group].push({
                                id: item.id,
                                groupId: +item.doc.group,
                                group: groupList[+item.doc.group],
                                name: item.doc.name,
                                marks: item.doc.marks,
                            })
                            }
                           
                        })
                    })
                    .then(() => {
                        database.collection('themes').get()
                            .then(list => {
                                let preThemeListId = list.docs.map(item => {
                                    return { id: item.id, name: item.data().name, access: item.data().access }
                                });
                                let themeListId = [];
                                groupList.forEach((item, index) => { themeListId[index] = [] })
                                preThemeListId.forEach(item => {
                                    item.access.forEach(acc => {
                                        themeListId[+acc].push({ id: item.id, name: item.name })
                                    })
                                })
                                
                                listUsersWithGroup[this.state.value].sort(function (a, b) {
                                    if (a.name > b.name) {
                                        return 1;
                                    }
                                    if (a.name < b.name) {
                                        return -1;
                                    }
                                    // a должно быть равным b
                                    return 0;
                                });
                                const tabs = groupList.map((item, index) => {
                                    return listUsersWithGroup[index].length>0 ? <Tab label={item} key={index} />: null;
                                })
                                
                                this.setState({
                                    listUsersWithGroup,
                                    groupList,
                                    themeListId,
                                    loading: false,
                                    tabs,
                                })
                            })
                    })
            })

    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { value, listUsersWithGroup, themeListId, tabs } = this.state;
        
        return (
            this.state.loading
                ? <Loading />
                : <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {
                                tabs
                            }
                        </Tabs>
                    </AppBar>
                    <Paper style={{ overflowX: 'auto', width: '100%', margin: 4, marginTop: 40, }}>
                        <AutoTable rows={
                            listUsersWithGroup[value].map(item => {
                                let sr = 0;
                                var counter = 0;
                                for (var key in item.marks) {
                                    counter++;
                                    sr = sr + (+item.marks[key]);
                                }
                                if (item.marks) {
                                    // item.marks.forEach(mark=>{sr+=mark})
                                }
                                return [
                                    item.name, ...themeListId[value].map(a => {
                                        return item.marks[a.id] === undefined ? "-" : item.marks[a.id]
                                    }),
                                    sr === 0 ? '-' : (sr / counter).toFixed(1),
                                ]
                            })


                        }
                            hederRows={themeListId[value].map(item => { return item.name })} />
                    </Paper>
                </div>
        );
    }

}


function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, { logout, getUser })(Statistic)