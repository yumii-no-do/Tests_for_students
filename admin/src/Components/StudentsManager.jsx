import React from 'react';
import { Typography, Collapse, ListItem, Tooltip, List, ListItemText, Divider, ListSubheader, ListItemSecondaryAction, TextField, FormControl, Paper, Radio, Button, } from '@material-ui/core';
import { connect } from 'react-redux';
import { userUpdate } from '../Actions/UserActions';
import moment from 'moment';
import firebase from 'firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';

moment().format();
const HtmlTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);
class StudentsManager extends React.Component {

    userVerification = uid => e => {
        this.props.userUpdate(uid, { teacherVerified: true })

    }
    render() {

        let reg = [], unreg = [];

        this.props.users.users.forEach((item, index) => {
            if (item.doc.teacherVerified) {
                reg.push(item)
            } else {
                unreg.push(item)
            }
        })


        const regElements = reg.map(item => {
            const registrationTime = Object(item.doc.registrationTime).seconds;
            return (
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            {item.doc.registrationTime && <Typography color="inherit">Время и дата регистрирации: {moment.unix(registrationTime).format('hh:mm - DD.MM.YYYY')}</Typography>}
                            <Typography color="inherit">Группа: {this.props.groups.list[item.doc.group]}</Typography>
                        </React.Fragment>
                    }
                    aria-label="more"
                    placement="top-start">
                    <ListItem button key={item.id}>
                        <ListItemText primary={item.doc.name} secondary={
                            item.doc.email != undefined ? "email: " + item.doc.email : `id: ${item.id}`
                        } />
                    </ListItem>
                </HtmlTooltip>
            )
        })
        const unregElements = unreg.map(item => {
            const registrationTime = Object(item.doc.registrationTime).seconds;
            moment.unix(registrationTime).format('hh:mm - DD.MM.YYYY')

            return (
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            {item.doc.registrationTime && <Typography color="inherit">Время и дата регистрирации: {moment.unix(registrationTime).format('hh:mm - DD.MM.YYYY')}</Typography>}
                            <Typography color="inherit">Группа: {this.props.groups.list[item.doc.group]}</Typography>
                        </React.Fragment>
                    }
                    aria-label="more"
                    placement="top-start">
                    <ListItem button key={item.id}>
                        <ListItemText primary={item.doc.name} secondary={(item.doc.email != undefined ? "email: " + item.doc.email : 'id: ' + item.id)} />
                        <ListItemSecondaryAction>
                            <Button color='secondary' onClick={this.userVerification(item.id).bind(this)}>
                                Разрешить доступ
                        </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </HtmlTooltip>
            )
        })
        return (
            <Paper style={{ width: '100%', margin: '48px 24px 24px', padding: '20px', marginTop: 48, maxWidth: 800, }}>
                <List>
                    <ListSubheader>Незарегистрированные студенты</ListSubheader>
                    {unregElements}
                    <Divider />
                    <ListSubheader>Зарегистрированные студенты</ListSubheader>
                    {regElements}
                </List>

            </Paper>
        )
    }

}

function mapStateToProps(state) {
    return {
        users: state.users,
        groups: state.groups
    };
}
export default connect(mapStateToProps, { userUpdate })(StudentsManager)