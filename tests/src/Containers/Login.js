import React from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button, TextField, FormHelperText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { login, getUser } from '../Actions/UserActions';
import { connect } from 'react-redux';

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
        errorAll:false,
        error: false,
    }
    componentWillMount() {
        this.props.getUser();
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
            errorAll: (email !== '' &&  password !== '' ) ? false : true,
        
        })
    }


    submitLogin = (event) => {
        event.preventDefault();
        this.isValide();
        
        if(this.state.errorAll===false){
            this.props.login(this.state.email, this.state.password).catch(err => {
                console.log(err);
                let error = {};
                switch (err.code) {
                    case "auth/invalid-email":error={error:'Не верный формат email'};break;
                    case "auth/user-not-found":error={error:'Нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален.'};break;
                    case "auth/wrong-password":error={error:'Не верный пароль'};break;
                
                    default:error= {error:false}; break;
                }
                this.setState(error);
            });
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
                                        // name="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange('password')}
                                    />
                                    {!this.state.errorPassword ? null : <FormHelperText error>{this.state.errorPassword}</FormHelperText>}
                                    {!this.state.error ? null : <FormHelperText style={{width:'100%'}} error>{this.state.error}</FormHelperText>}
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="space-between" >

                            <Button onClick={() => { this.props.history.push('/CreateAccount') }} color="primary">
                                Создать аккаунт
                    </Button>
                            <Button onClick={this.submitLogin} variant="contained" color="primary">
                                Войти
                    </Button>
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

export default connect(mapStateToProps, { login, getUser })(withStyles(styles)(Login))


