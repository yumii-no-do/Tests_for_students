import React from 'react';
import { Typography, ListItem,Tooltip, List, ListItemText, Divider, ListSubheader, ListItemSecondaryAction, TextField, FormControl, Paper, Radio, Button, } from '@material-ui/core';
import { connect } from 'react-redux';
import { userUpdate } from '../Actions/UserActions';
import moment from 'moment';
import firebase from 'firebase';

moment().format();

class StudentsManager extends React.Component {
    
     userVerification = uid => e =>{
        this.props.userUpdate(uid,{teacherVerified:true})
       
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
                <Tooltip disableHoverListener={item.doc.registrationTime == undefined} title={"Время и дата регистрирации: "+moment.unix(registrationTime).format('hh:mm - DD.MM.YYYY')} aria-label="Add" placement="left" leaveDelay={200}>
                <ListItem key={item.id}>
                    <ListItemText primary={item.doc.name} secondary={item.doc.email!= undefined? "email: "+item.doc.email:'id: ' + item.id} />
                </ListItem>
                </Tooltip>
            )
        })
        const unregElements = unreg.map(item => {
            const registrationTime = Object(item.doc.registrationTime).seconds;
            moment.unix(registrationTime).format('hh:mm - DD.MM.YYYY')
            
            return (
                <Tooltip  disableHoverListener={item.doc.registrationTime == undefined}  title={"Время и дата регистрирации: "+moment.unix(registrationTime).format('hh:mm - DD.MM.YYYY')} aria-label="Add" placement="left" leaveDelay={200}>
                <ListItem key={item.id}>
                    <ListItemText primary={item.doc.name} secondary={(item.doc.email!= undefined? "email: "+item.doc.email:'id: ' + item.id)} />
                    <ListItemSecondaryAction>
                        <Button color='secondary' onClick={this.userVerification(item.id).bind(this)}>
                            Разрешить доступ
                        </Button>
                    </ListItemSecondaryAction>
                </ListItem> 
                </Tooltip>
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
    };
}
export default connect(mapStateToProps, { userUpdate })(StudentsManager)