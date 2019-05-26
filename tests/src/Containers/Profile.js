import React from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import database from '../Firebase';
import { getUser } from '../Actions/UserActions';
import { connect } from 'react-redux';
import Edit from '@material-ui/icons/Edit';
import Loading from '../Components/Loading';


const style = {
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    paperContainer: {
        width: '100%',
        padding: 40,
        maxWidth: 800,
        margin: 4,
        marginTop: 40,
        flexGrow: 1,
    }

}


class Profile extends React.Component {
    state = {
        groupList: [],
        name: '',
        group: '',
        themes: [],
        marks: [],
        loading: true,
    }
    componentWillMount() {
        this.props.getUser();
    }
    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.user.uid);
    }
    getData(userID) {
        let name, group, themes, marks, groupList = null;
        database.collection('users').doc(userID).get().then(doc => {
            name = doc.data().name;
            group = doc.data().group;
            marks = [];
            for (let key in doc.data().marks) {
                marks.push({ id: key, value: doc.data().marks[key] })
            }
        })
        database.collection('themes').get().then(list => {

            themes = list.docs.map(item => {
                return { id: item.id, data: item.data() }
            });
        })
        database.collection('groups').doc('groupList').get().then(doc => {
            groupList = doc.data().list;
            this.setState({
                groupList,
                name,
                group,
                themes,
                marks,
                loading: false,
            });
        });
    }
    _renderElements() {
        return (
            <div style={style.container}>
                <Paper style={style.paperContainer}>
                    <Typography style={{ marginBottom: 20 }} variant="title" color="default">Профиль студента</Typography>
                    <List>
                        <ListItem>
                            <ListItemText style={{ maxWidth: 80 }} primary="Имя:" />
                            <ListItemText primary={this.state.name} />
                        </ListItem><Divider />
                        <ListItem>
                            <ListItemText style={{ maxWidth: 80 }} primary="Email:" />
                            <ListItemText primary={this.props.user.email} />
                        </ListItem><Divider />
                        <ListItem>
                            <ListItemText style={{ maxWidth: 80 }} primary="Группа:" />
                            <ListItemText primary={this.state.groupList[this.state.group]} />
                        </ListItem>
                    </List>
                </Paper>
                <Paper style={style.paperContainer}>
                    <Typography style={{ marginBottom: 20 }} variant="title" color="default">Оценки по темам</Typography>
                    <List>
                        {
                            this.state.marks.map((item, index) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemText
                                            style={{ width: '80%' }}
                                            primary={
                                                this.state.themes.map(itemTheme => {
                                                    if (itemTheme.id === item.id) return itemTheme.data.name
                                                })} />
                                        <ListItemText primary={item.value} />
                                    </ListItem>
                                )
                            })}
                    </List>
                </Paper>
            </div>
        );
    };
    render() {
        return (
            this.state.loading
                ? <Loading />
                : this._renderElements()
        )
    }
}
function mapStateToProps(state) {
    return { user: state.user };
}
export default connect(mapStateToProps, { getUser })(Profile)
