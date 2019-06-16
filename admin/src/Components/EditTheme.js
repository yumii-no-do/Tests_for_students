import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
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

class EditTheme extends React.Component {
    state = {
        single: null,
        multi: null,
        loading: true,
        groups: [],
        error: false,
        name: '',
        timer: 30,
        size: 10,
    };
    componentWillUnmount() {
        this.setState({
            single: null,
            multi: null,
            loading: true,
            groups: [],
            error: false,
            name: '',
            timer: 30,
            size: 10,
        })
    }
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
            timer: this.state.timer,
            size: this.state.size,
            groupsSelected,
        }

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

            this.props.defaultData &&  <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Добавление новой темы</DialogTitle>
                <DialogContent>
                    <DialogContentText>В дальнейшем данное название можно будет изменить</DialogContentText>
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

                        <div style={{display:'flex'}}>
                            <TextField
                                value={this.state.timer}
                                margin="dense"
                                id="timer"
                                label="Количество минут"
                                type="number"
                                fullWidth
                                onChange={this.handleChange('timer')}
                            />
                            <TextField
                                value={this.state.size}
                                margin="dense"
                                id="timer"
                                label="Количество вопросов"
                                type="number"
                                fullWidth
                                onChange={this.handleChange('size')}
                            />
                        </div>

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


export default (withStyles(styles)(EditTheme))