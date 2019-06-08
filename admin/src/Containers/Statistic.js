import React from 'react';
import { logout, getUser, getUsers } from '../Actions/UserActions';
import { getGroups } from '../Actions/GroupsActions';
import { getThemes } from '../Actions/ThemesActions';
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
        this.props.user.loading && this.props.getUser();
        this.props.users.loading && this.props.getUsers();
        this.props.groups.loading && this.props.getGroups();
        this.props.themes.loading && this.props.getThemes();


        let listUsers, groupData, groupList, listUsersWithGroup = null;
        const { users, themes, groups, user } = this.props;


        listUsersWithGroup = [];
        groups.list.forEach((item, index) => { listUsersWithGroup[index] = [] })
        users.users.forEach(item => {
            listUsersWithGroup[+item.doc.group].push({
                id: item.id,
                groupId: +item.doc.group,
                group: groups.list[+item.doc.group],
                name: item.doc.name,
                marks: item.doc.marks,
            })
        })
        console.log(listUsersWithGroup);
        let preThemeListId = themes.data.map(item => {
            return { id: item.id, name: item.name, access: item.access }
        });
        console.log('preThemeListId',preThemeListId)
        // })
        //                         .then(() => {
        // database.collection('themes').get()
        //     .then(list => {
        //         
        const themeListId = [];
        groups.list.forEach((item, index) => { return themeListId[+index] = [null] })
        console.log('themeListId',themeListId)
        // })
        preThemeListId.forEach(item => {
            item.access.forEach(accessItem => {
                themeListId[+accessItem]=[...themeListId[+accessItem],{ id: item.id, name: item.name }]
            })
        })
        const tabs = groups.list.map((item, index) => {
            return <Tab label={item} key={index} />
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
        this.setState({
            listUsersWithGroup,
            groupList,
            themeListId,
            loading: false,
            tabs,
        })
        // })
        // })
        //                     })
        // }



        // this.props.groups
        // groupList.forEach((item, index) => { listUsersWithGroup[index] = [] })
        // listUsers.forEach(item => {
        //     listUsersWithGroup[+item.doc.group].push({
        //         id: item.id,
        //         groupId: +item.doc.group,
        //         group: groupList[+item.doc.group],
        //         name: item.doc.name,
        //         marks: item.doc.marks,
        //     })
        // })

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
                            scrollButtons="auto">
                            {tabs}
                        </Tabs>
                    </AppBar>
                    <Paper style={{ overflowX: 'auto', maxWidth: 800, width: '100%', margin: 4, marginTop: 40, }}>
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
    return {
        user: state.user,
        users: state.users,
        groups: state.groups,
        themes: state.themes,
    };
}

export default connect(mapStateToProps, { logout, getUser, getUsers, getGroups, getThemes})(Statistic)