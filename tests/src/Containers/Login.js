import React from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button, TextField, FormHelperText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { login, getUser } from '../Actions/UserActions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

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


class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorEmail: false,
        errorPassword: false,
        errorAll: false,
        error: false,
    }
    componentWillMount() {
        const { signedIn,history } = this.props;
        if(signedIn === true){
            history.replace('/');
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.email !== undefined) {
            this.props.history.push('/');
        }
    }
    isValide() {
        const { email, password } = this.state;
        this.setState({
            errorEmail: (email === '') ? 'Введите email' : false,
            errorPassword: (password === '') ? 'Введите пароль' : false,
            errorAll: (email !== '' && password !== '') ? false : true,

        })
    }
    submitLogin = (event) => {
        event.preventDefault();
        this.isValide();

        if (this.state.errorAll === false) {
            this.props.login(this.state.email, this.state.password)
        }
        console.log(this.state)
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
                <Card style={{ maxWidth: 400 }}>
                    <CardContent>
                        <Grid container spacing={24}>
                            <Grid item>
                                <Typography variant="h5" component="h2">Вход</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-email-input"
                                        label="Email"
                                        error={this.state.errorEmail !== false}
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange('email')}
                                    />
                                    {!this.state.errorEmail ? null : <FormHelperText error>{this.state.errorEmail}</FormHelperText>}
                                    <TextField
                                        id="outlined-password-input"
                                        label="Пароль"
                                        className={classes.textField}
                                        type="password"
                                        error={this.state.errorPassword !== false}
                                        name="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange('password')}
                                    />
                                    {this.state.errorPassword && <FormHelperText error>{this.state.errorPassword}</FormHelperText>}
                                    {this.state.error && <FormHelperText style={{ width: '100%' }} error>{this.state.error}</FormHelperText>}
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{padding:'0 16px 16px'}}>
                        <Grid container justify="space-between"  style={{margin:'0 8px'}}>
                            <Link to='/create-account'>
                                <Button color="primary">Создать аккаунт</Button>
                            </Link>
                            <Button onClick={this.submitLogin} variant="contained" color="primary">Войти</Button>
                        </Grid>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { 
        user: state.user,
        signedIn:state.user.isSignedIn,
     };
}
export default connect(mapStateToProps, { login, getUser })(withStyles(styles)(Login))


