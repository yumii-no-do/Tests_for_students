import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getThemes, createTheme } from '../Actions/ThemesActions';
import { getGroups } from '../Actions/GroupsActions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
// import { Select } from 'react-select';
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

class CreateTheme extends React.Component {
    state = {
        single: null,
        multi: null,
        loading: true,
        groups: [],
        error: false,
        name: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleCheckbox = name => event => {
        const arr = this.state.groups.slice();
        arr[name] = event.target.checked;
        this.setState({
            groups: arr,
        });
    };
    handleAdd() {


        let groupsSelected = [];
        this.state.groups.forEach((item, index) => {
            if (item === true) groupsSelected.push(index);
        })

        const res = {
            name: this.state.name,
            groupsSelected,
        }
        console.log(res);

        if (this.state.name === undefined || this.state.name === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false
            })
            if (this.state.error !== true) {
                this.props.handelData(res);
                this.props.handleClose();
            }
        }
        




    }
    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (

            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Добавление новой темы</DialogTitle>
                <DialogContent>
                    <DialogContentText>В дальнейшем данное назване можно будет изменить</DialogContentText>
                    <FormControl fullWidth component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend"></FormLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Название"
                            type="email"
                            fullWidth
                            onChange={this.handleChange('name')}
                        />
                        <FormLabel style={{ marginTop: 40 }} component="legend">Группы которые будут иметь к ней доступ</FormLabel>
                        <FormGroup>
                            {
                                this.props.groups.map((item, index) => {
                                    return (
                                        <FormControlLabel
                                            control={
                                                <Checkbox key={index} checked={this.state.groups[index]} onChange={this.handleCheckbox(index)} />
                                            }
                                            label={item}
                                        />
                                    )
                                })
                            }
                        </FormGroup>
                    </FormControl>
                    <DialogContentText>

                    </DialogContentText>
                    {}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Отмена
            </Button>
                    <Button onClick={this.handleAdd.bind(this)} color="primary" variant="contained">
                        Добавить
            </Button>
                </DialogActions>
            </Dialog>

        );
    }
}


export default (withStyles(styles)(CreateTheme))