import React from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button, TextField, FormHelperText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getUser, createAccount } from '../Actions/UserActions';
import { connect } from 'react-redux';
import SelectionComp from '../Components/SelectionComp';
import database from '../Firebase';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
});


class CreateAccount extends React.Component {
    state = {
        email: '',
        password: '',
        name: '',
        group: '',
        groupList: [],
        error: {
            email: false,
            password: false,
            name: false,
            group: false,
            all: true,
        },
        labelWidth: 0,
    }
    componentWillMount() {
        this.props.getUser();
        database.collection('groups').doc('groupList').get()
            .then(doc => {
                const list = doc.data().list.map((item, index) => {
                    return { id: index, title: item }
                });
                this.setState({
                    groupList: list
                })
            })
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }
    componentDidUpdate(nextProps) {
        if (nextProps.user.email !== undefined) {
            this.props.history.push('/');
        }
    }
    isValide() {
        const { name, email, password, group } = this.state;
        this.setState({
            error: {
                ...this.state.error,
                name: (name === '') ? 'Введите имя' : false,
                email: (email === '') ? 'Введите email' : false,
                password: (password === '') ? 'Введите пароль' : false,
                group: (group === '') ? 'Выберите группу' : false,
                all: (name !== '' && email !== '' && password !== '' && group !== '') ? false : true,
            }
        });



    }
    submitAccount(event) {
        event.preventDefault();
        const { email, password, name, group } = this.state;
        this.isValide();
        if (this.state.error.all === false) {
            console.log(email, password, name, group)
            this.props.createAccount(email, password, name, group);
        }

    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: 4,
                paddingTop: 40,
            }}>
                <Card style={{ maxWidth: 500 }}>
                    <CardContent>
                        <Grid container spacing={24}>
                            <Grid item>
                                <Typography variant="h5" component="h2">Создайте аккаунт</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        required
                                        error={this.state.error.name !== false}
                                        id="outlined-name"
                                        label="Ф.И.О."
                                        className={classes.textField}
                                        value={this.state.name}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                        variant="outlined"
                                        helperText={this.state.error.name}
                                    />

                                    <TextField
                                        required
                                        id="outlined-email-input"
                                        label="Email"
                                        className={classes.textField}
                                        type="email"
                                        error={this.state.error.email !== false}
                                        value={this.state.email}
                                        name="email"
                                        autoComplete="email"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange('email')}
                                        helperText={this.state.error.email}
                                    />
                                    <TextField
                                        required
                                        id="outlined-password-input"
                                        label="Пароль"
                                        error={this.state.error.password !== false}
                                        value={this.state.password}
                                        className={classes.textField}
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange('password')}
                                        helperText={this.state.error.password}
                                    />
                                    <SelectionComp style={{ marginTop: 10 }} className={classes.textField} items={this.state.groupList}
                                        error={this.state.error.group !== false}
                                        title={'Выберите группу'}
                                        handle={this.handleChange('group')}
                                        helperText={this.state.error.group}
                                    />
                                    <FormHelperText error>{this.props.user.error}</FormHelperText>

                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="space-between" >
                            <Button onClick={() => { this.props.history.push('/Login') }} color="primary">Назад</Button>
                            <Button onClick={this.submitAccount.bind(this)} variant="contained" color="primary">Создать</Button>
                        </Grid>
                    </CardActions>
                </Card>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return { user: state.user };
}
export default connect(mapStateToProps, { createAccount, getUser })(withStyles(styles)(CreateAccount))