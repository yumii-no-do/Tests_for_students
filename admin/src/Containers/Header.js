import React from 'react';
import { Typography, AppBar, Toolbar, Dialog, DialogTitle, DialogActions, Button, } from '@material-ui/core';
import { logout, getUser } from '../Actions/UserActions';
import { connect } from 'react-redux';



class Header extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        open: false,
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handleClickOpenDialog = () => {
        this.handleClose();
        this.setState({ open: true });

    };

    handleCloseDialog = () => {
        this.setState({ open: false });
    };
    render() {
        const { history } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Button color="default" style={{
                            color: '#fff',
                        }}
                            onClick={() => {
                                history.replace('/');
                            }}
                        >
                            Главная
                        </Button>
                        <Button color="default" style={{
                            color: '#fff',
                        }}
                            onClick={() => {
                                history.replace('/Statistic');
                            }}>
                            Статистика
                        </Button>
                        <Typography style={{ flexGrow: 1, }} variant="h6" color="inherit">{this.props.title}</Typography>
                        <div>
                            <Button color="default" style={{
                                color: '#fff',
                            }}
                                onClick={this.handleClickOpenDialog}>
                                Выйти
                        </Button>

                        </div>
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Вы точно хотите выйти?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Нет
                    </Button>
                        <Button onClick={() => {
                            this.handleCloseDialog();
                            this.props.logout();
                        }} color="primary" autoFocus>
                            Да
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}
function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, { logout, getUser })(Header)


