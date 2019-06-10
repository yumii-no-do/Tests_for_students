import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import Add from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
const styles = theme => ({
    cssUnderLine: {
        '&:before': {
            borderBottom: 0,
        },
    },
    radioItem: {
        display: 'flex',
        alignItems: 'center'
    }

});




class CreateQuestion extends React.Component {
    state = {
        loading: true,
        questions: [{ title: '',error:false, }],
        error: true,
        name: '',
        answer: '',
        errorQuestions:false,
        errorName:false,
        errorAnswer:false,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleQuestion = index => event => {
        const arr = this.state.questions.slice();
        arr[index].title = event.target.value;
        this.setState({
            groups: arr,
        });
    };
    valid(resolve, reject){
        this.state.questions.forEach((item, index) => {
            if (item.title === undefined || item.title === '') {
                const arr = this.state.questions.slice();
                arr[index].error = 'Введите текст вопроса';
                this.setState({
                    questions: arr,
                    errorQuestions: true,
                })
            } else {
                const arr = this.state.questions.slice();
                arr[index].error = false;
                this.setState({
                    questions: arr,
                    errorQuestions: false,
                })
            }
        })
const {errorQuestions,errorName,errorAnswer} = this.state;
       

        if (this.state.name === undefined || this.state.name === '') {
            this.setState({
                errorName: 'Ведите название вопроса'
            })
        } else {
            this.setState({
                errorName: false
            })
        }
        if (this.state.answer === undefined || this.state.answer === '') {
            this.setState({
                errorAnswer: 'Выберите верный вариант ответа'
            })
        } else {
            this.setState({
                errorAnswer: false,
            })
            resolve("result");
        }
        this.setState({
                error: (errorQuestions === false && errorName === false && errorAnswer === false) ? false : true
            })
    }
    handleAdd() {

        new Promise(this.valid.bind(this))
        .then(()=>{
            const answers = this.state.questions.map((item, index) => {
                return item.title
            })
            const {errorQuestions,errorName,errorAnswer} = this.state;
            const res = {
                title: this.state.name,
                answers: answers,
                answer: this.state.answer,
            }
            console.log(res);
            if ((errorQuestions === false && errorName === false && errorAnswer === false)) {
                this.props.handelData(res);
                this.props.handleClose();
                this.reset();
            }
        })
        

    }
    reset(){
        this.setState({
            questions: [{ title: '',error:false, }],
        error: true,
        name: '',
        answer: '',
        errorQuestions:false,
        errorName:false,
        errorAnswer:false,
        })
    }
    handleAddQuestion() {
        let arr = this.state.questions.slice();
        arr.push({ title: '',error:false, })
        this.setState({
            questions: arr,
        })
    }
    handleDeleteQuestion = index => event => {
        let arr = this.state.questions.slice();
        arr.splice(index, 1);
        this.setState({
            questions: arr,
        })
    }
    render() {
        const { classes, theme } = this.props;
        return (

            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Добавление вопроса по теме:</DialogTitle>
                <DialogContent>
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
                            error={this.state.errorName !== false}
                        />
                    {!this.state.errorName ? null : <FormHelperText error>{this.state.errorName}</FormHelperText>}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingTop: 10,
                            paddingBottom: 10,
                            flexWrap: 'wrap',
                        }}>
                            <Typography style={{ marginRight: 10, }} variant="subtitle2" component="span" color="textPrimary">Варианты ответа:</Typography>
                            <FormControl component="fieldset" style={{ flexGrow: 1, width: '100%' }}>

                                {

                                    this.state.questions.map((item, index) => {
                                        return (
                                            <div>

                                            
                                            <div key={index} className={classes.radioItem}>
                                                <Radio
                                                    // name={'dd'} value={this.state.questions[index].answer} 
                                                    value={index}
                                                    checked={this.state.answer === index + ''}
                                                    onChange={this.handleChange('answer')}
                                                    name="radio-button-questions"
                                                    aria-label={this.state.questions[index].title}
                                                    error={this.state.errorAnswer !== false}
                                                />
                                                <TextField
                                                    id="standard-name"
                                                    value={this.state.questions[index].title}
                                                    onChange={this.handleQuestion(index)}
                                                    margin="none"
                                                    className={classes.radioSelect}
                                                    InputProps={{
                                                        classes: {
                                                            underline: classes.cssUnderLine,
                                                        }
                                                    }}
                                                    error={this.state.questions[index].error !== false}
                                                    fullWidth
                                                    placeholder='Вариант ответа'
                                                />
                                                <IconButton onClick={this.handleDeleteQuestion(index)} aria-label="Delete">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </div>
                                    {!this.state.questions[index].error ? null : <FormHelperText error>{this.state.questions[index].error}</FormHelperText>}

                                            </div>
                                        )
                                    })
                                }
                                <Button color="primary" fullWidth style={{justifyContent: 'flex-start',textAlign: 'start'}} onClick={this.handleAddQuestion.bind(this)} className={classNames(classes.add)}><Add /> Добавить вариант ответа</Button>

                            </FormControl>
                        </div>
                    </FormControl>
                    {!this.state.errorAnswer ? null : <FormHelperText error>{this.state.errorAnswer}</FormHelperText>}

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


export default (withStyles(styles)(CreateQuestion))