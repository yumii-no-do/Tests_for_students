import React from 'react';
import { getUser } from '../Actions/UserActions';
import { getThemes, createTheme, updateTheme } from '../Actions/ThemesActions';
import { getGroups,updateGroups } from '../Actions/GroupsActions';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Loading from '../Components/Loading';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton,RadioGroup, TextField, FormControl, Radio, Button, } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import CreateTheme from '../Components/CreateTheme';
import CreateQuestion from '../Components/CreateQuestion';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVert from '@material-ui/icons/MoreVert';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    tableHeader: {
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: "8px 8px 0 0",
        boxShadow: "0 -1px 0 rgba(0, 0, 0, .12) inset",
        boxSizing: "border-box",
        cursor: "pointer",
        display: "inline-block",
        height: 56,
        padding: 16,
        width: "100%",
    },
    add: {
        padding: 8,
        borderRadius: 0,
        width: '100%',
        textTransform: 'none',
        justifyContent: 'flex-start',
        textAlign: 'start'
    },
    panelItem: {
        padding: 8,
        borderRadius: 0,
        width: '100%',
        textTransform: 'none',
        justifyContent: 'flex-start',
        textAlign: 'start'
    },
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


class Settings extends React.Component {
    state = {
        mark: '',
        value: 0,
        loading: true,
        table: [[]],
        questionTitle: '2+2',
        selectTheme: '',
        selectQuestionId: null,
        selectQuestion: '',
        isOpenCteateTheme: false,
        isOpenCreateQuestion: false,
        themes: [],
        groups: {
            list: ["1", "2"],
            loading: true,
        }
    }
    render() {
        return (
            this.state.loading
                ? <Loading />
                : this._renderElements()
        );
    }


    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.themes.loading === false) {
            this.setState({
                loading: false,
                themes: nextProps.themes.data,
                groups: nextProps.groups
            })
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };
    selectTheme = name => event => {

        let res = null;
        this.props.themes.data.forEach(item => {
            if (item.id === name) {
                res = item
            }
        });
        this.setState({ selectTheme: res, selectQuestionId: null });
    };
    selectQuestion = (name) => event => {
        this.setState({
            selectQuestionId: name,
            selectQuestion: this.state.selectTheme.questions[+name],
            questionTitle: this.state.selectTheme.questions[+name].title,
            answer: this.state.selectTheme.questions[+name].answer,
        });
    };
    handleClickOpenCreateTheme = () => {
        this.setState({ isOpenCteateTheme: true });
    };
    handleCloseCreateTheme = () => {
        this.setState({ isOpenCteateTheme: false });
    };
    handelCreateTheme = (object) => {
        console.log('home', object);
        this.props.createTheme(object.name, [], object.groupsSelected,object.timer,object.size);
        this.props.getThemes();
    };
    handleClickOpenCreateQuestion = () => {
        this.setState({ isOpenCreateQuestion: true });
    };
    handleCloseCreateQuestion = () => {
        this.setState({ isOpenCreateQuestion: false });
    };
    handelCreateQuestion = (object) => {
        console.log('home-CreateQuestion', object)
        const obj = this.state.selectTheme;
        obj.questions.push(object);
        this.setState({
            selectTheme: obj,
        })
        this.props.updateTheme(this.state.selectTheme.id, {
            name: this.state.selectTheme.name,
            access: this.state.selectTheme.access,
            questions: this.state.selectTheme.questions,
        })
        this.props.getThemes();
    };
    handleQuestion = index => event => {
        const questions = this.state.selectQuestion.answers.slice();
        questions[index] = event.target.value;
        this.setState({
            selectQuestion: {
                ...this.state.selectQuestion,
                answers: questions
            },
        })
    };

    handleGroup = index => event => {
        const groups = this.state.groups.list.slice();
        groups[index] = event.target.value;
        this.setState({
            groups: {
                ...this.state.groups,
                list: groups
            },
        })
    };
    handleAddQuestion() {
        let questions = this.state.selectQuestion.answers.slice();
        questions.push('')
        this.setState({
            selectQuestion: {
                ...this.state.selectQuestion,
                answers: questions
            },
        })
    }
    handleAddGroup = ()=> {
        let groups = this.state.groups.list.slice();
        groups.push('')
        this.setState({
            groups: {
                ...this.state.groups,
                list: groups
            },
        })
    }
    handleChangeAnswer = index => event => {

        this.setState({
            selectQuestion: {
                ...this.state.selectQuestion,
                answer: index + ''
            },
        })
    };
    
    handleDeleteQuestion = index => event => {
        let questions = this.state.selectQuestion.answers.slice();
        questions.splice(index, 1);
        this.setState({
            selectQuestion: {
                ...this.state.selectQuestion,
                answers: questions
            },
        })
    }
    handleDeleteGroup = index => event => {
        let groups = this.state.groups.list.slice();
        groups.splice(index, 1);
        this.setState({
            groups: {
                ...this.state.groups,
                list: groups
            },
        })
    }
    handleUpdate() {
        console.log('home-CreateQuestion', this.state.selectQuestion)
        const obj = this.state.selectTheme;
        obj.questions[this.state.selectQuestionId] = this.state.selectQuestion;
        obj.questions[this.state.selectQuestionId].title = this.state.questionTitle;
        this.setState({
            selectTheme: obj,
        })
        this.props.updateTheme(this.state.selectTheme.id, {
            name: this.state.selectTheme.name,
            access: this.state.selectTheme.access,
            questions: this.state.selectTheme.questions,
        })
        this.props.getThemes();
        alert('Сохранено')
    }
    _renderThemes = () => {
        const { classes } = this.props;
        return (
            <div className='border-rigth' style={{ flexGrow: 1, maxWidth: '20%', overflow: 'auto', }}>
                <div className='panel-header border-bottom' style={{ padding: 4, display: 'flex', justifyContent: 'space-between', }}>
                    <Typography style={{ margin: 6 }} variant="subtitle1" component="span" color="textSecondary">Темы тестов</Typography>
                    <Tooltip title="Параметры тем" aria-label="Add" enterDelay={500} leaveDelay={200}>
                        <IconButton style={{ padding: 8 }} aria-label="More">
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className='panel-container'>
                    <Button color="primary" onClick={this.handleClickOpenCreateTheme} className={classNames(classes.add)}>
                        <Add /> Добавить новую тему
                                </Button>
                    {
                        this.state.themes.map(theme => {
                            return (
                                <Button
                                    key={theme.id}
                                    style={this.state.selectTheme.id === theme.id ? { background: 'rgb(247, 247, 247)' } : {}}
                                    color={this.state.selectTheme.id === theme.id ? "secondary" : "default"}
                                    onClick={this.selectTheme(theme.id)}
                                    className={classes.panelItem}>
                                    {theme.name}
                                </Button>
                            )
                        })
                    }
                </div>
            </div>

        )
    }
    _renderQuestion = () => {
        const { classes } = this.props;
        return (
            <div className='border-rigth' style={{ flexGrow: 1, maxWidth: '20%', overflow: 'auto', }}>
                <div className='panel-header border-bottom'>
                    <Typography variant="subtitle1" component="span" color="textSecondary">Вопросы по данной теме</Typography>
                </div>
                {
                    this.state.selectTheme === '' ? null :
                        <div className='panel-container'>
                            <Button color="primary" className={classNames(classes.add)} onClick={this.handleClickOpenCreateQuestion}>
                                <Add /> Добавить новый вопрос
                                            </Button>
                            {
                                this.state.selectTheme.questions.map((question, index) => {
                                    return (
                                        <Button
                                            color="default"
                                            key={index}
                                            className={classes.panelItem}
                                            onClick={this.selectQuestion(index)}
                                            style={this.state.selectQuestionId === index ? { background: 'rgb(247, 247, 247)' } : {}}
                                            color={this.state.selectQuestionId === index ? "secondary" : "default"}
                                        >
                                            {question.title.substr(0, 33)}
                                        </Button>
                                    )
                                })
                            }
                        </div>
                }
            </div>

        )
    }
    _renderSetting = () => {
        const { classes } = this.props;
        return (
            <div style={{ flexGrow: 3, maxWidth: '60%', overflow: 'auto', }}>
                <div className='panel-header border-bottom' style={{ padding: 4, display: 'flex', justifyContent: 'space-between', }}>
                    <Typography style={{ margin: 6 }} variant="subtitle1" component="span" color="textSecondary">Настройки вопроса</Typography>
                    <Button disabled={this.state.selectQuestionId === null} onClick={this.handleUpdate.bind(this)} variant="text" color="primary">Сохранить изменения</Button>
                </div>
                {this.state.selectQuestionId === null ? null :
                    <div className='panel-container'>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: 10,
                        }}>
                            <Typography style={{ marginRight: 10, }} variant="subtitle2" component="span" color="textPrimary">Вопрос:</Typography>
                            <TextField
                                id="standard-name"
                                value={this.state.questionTitle}
                                onChange={this.handleChange('questionTitle')}
                                margin="none"
                                style={{ flexGrow: 1, }}
                                multiline
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: 10,
                            flexWrap: 'wrap',
                        }}>
                            <Typography style={{ marginRight: 10, }} variant="subtitle2" component="span" color="textPrimary">Варианты ответа:</Typography>
                            <FormControl component="fieldset" style={{ flexGrow: 1, width: '100%' }}>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                >
                                    {
                                        this.state.selectQuestion.answers.map((item, index) => {
                                            return (
                                                <div>
                                                    <div key={index} className={classes.radioItem}>
                                                        <Radio
                                                            value={index}
                                                            checked={this.state.selectQuestion.answer + '' === index + ''}
                                                            onChange={this.handleChangeAnswer(index)}
                                                            name="radio-button-questions"
                                                            aria-label={item}
                                                        />
                                                        <TextField
                                                            multiline
                                                            id="standard-name"
                                                            value={this.state.selectQuestion.answers[index]}
                                                            onChange={this.handleQuestion(index)}
                                                            margin="none"
                                                            className={classes.radioSelect}
                                                            InputProps={{
                                                                classes: {
                                                                    underline: classes.cssUnderLine,
                                                                }
                                                            }}
                                                            // error={this.state.questions[index].error !== false}
                                                            fullWidth
                                                            placeholder='Вариант ответа'
                                                        />
                                                        <Tooltip title="Удалить данный вариант ответа" aria-label="Add" enterDelay={500} leaveDelay={200}>
                                                            <IconButton onClick={this.handleDeleteQuestion(index)} aria-label="Delete">
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    {/* {!this.state.questions[index].error ? null : <FormHelperText error>{this.state.questions[index].error}</FormHelperText>} */}

                                                </div>
                                            )
                                        })

                                    }

                                    {/* <Button color="primary" fullWidth style={{justifyContent: 'flex-start',textAlign: 'start'}} onClick={this.handleAddQuestion.bind(this)} className={classNames(classes.add)}><Add /> Добавить вариант ответа</Button> */}

                                    <Button color="primary" onClick={this.handleAddQuestion.bind(this)} className={classNames(classes.add)}><Add /> Добавить вариант ответа</Button>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                }
            </div>

        )
    }
    _renderElements = () => {
        const { value } = this.state;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <AppBar style={{ display: 'flex', justifyContent: 'center', }} position="static" color="default">
                    <div style={{ display: 'flex', justifyContent: 'center', }}></div>
                    <Tabs
                        value={value}
                        onChange={this.handleChangeTabs}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Темы" />
                        <Tab label="Группы" />
                        <Tab label="Настройка приложения" />
                    </Tabs>
                </AppBar>
                {value === 0 &&
                    <React.Fragment>
                        <Paper style={{ overflowX: 'auto', width: '100%', margin: 24, marginTop: 48, maxWidth: 1500, height: 'calc(100vh - 168px )', }}>
                            <div style={{ display: 'flex', height: '100%', height: '100%', }}>
                                {this._renderThemes()}
                                {this._renderQuestion()}
                                {this._renderSetting()}
                            </div>
                        </Paper>
                        {(this.state.groups.loading === false) ?
                            <CreateTheme
                                open={this.state.isOpenCteateTheme}
                                handleClose={this.handleCloseCreateTheme}
                                handelData={this.handelCreateTheme}
                                groups={this.state.groups.list}
                            /> : null
                        }
                        {console.log(this.state.groups)}
                        <CreateQuestion
                            open={this.state.isOpenCreateQuestion}
                            handleClose={this.handleCloseCreateQuestion}
                            handelData={this.handelCreateQuestion}
                        />
                    </React.Fragment>
                }
                {value === 1 && this._groupEditor()}
                {value === 2 && 
                    <React.Fragment>
                        app sett
                    </React.Fragment>
                }

            </div >

        )
    }

    saveGroups = ()=>{
        this.props.updateGroups(
            this.state.groups.list
        )
        alert("Обновлено")
    }

    _groupEditor(){
        const { classes } = this.props;
        return( 
            <Paper style={{ width: '100%', margin: '48px 24px 24px',padding: '20px', marginTop: 48, maxWidth: 800, }}>
            <FormControl component="fieldset" style={{ flexGrow: 1, width: '100%' }}>
            <RadioGroup
                aria-label="Gender"
                name="gender1"
            >
                {
                    this.state.groups.list.map((item, index) => {
                        return (
                            <div>
                                <div key={index} className={classes.radioItem}>
                                    <TextField
                                        multiline
                                        id="standard-name"
                                        value={item}
                                        onChange={this.handleGroup(index)}
                                        margin="none"
                                        className={classes.radioSelect}
                                        InputProps={{
                                            classes: {
                                                underline: classes.cssUnderLine,
                                            }
                                        }}
                                        // error={this.state.questions[index].error !== false}
                                        fullWidth
                                        placeholder='Название группы'
                                    />
                                    <Tooltip title="Удалить данную группу" aria-label="Add" enterDelay={500} leaveDelay={200}>
                                        <IconButton onClick={this.handleDeleteGroup(index)} aria-label="Delete">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                {/* {!this.state.questions[index].error ? null : <FormHelperText error>{this.state.questions[index].error}</FormHelperText>} */}

                            </div>
                        )
                    })

                }

                {/* <Button color="primary" fullWidth style={{justifyContent: 'flex-start',textAlign: 'start'}} onClick={this.handleAddQuestion.bind(this)} className={classNames(classes.add)}><Add /> Добавить вариант ответа</Button> */}

                <Button color="primary" onClick={this.handleAddGroup} className={classNames(classes.add)}><Add /> Добавить группу</Button>
                <Button onClick={this.saveGroups} variant="contained" color="primary">
                                Сохранить
                    </Button>
            </RadioGroup>
        </FormControl>
        </Paper>
        )
    }


}

function mapStateToProps(state) {
    return {
        user: state.user,
        themes: state.themes,
        groups: state.groups,
    };
}
export default connect(mapStateToProps, { getGroups, getUser, getThemes, updateTheme, createTheme,updateGroups })(withStyles(styles)(Settings))