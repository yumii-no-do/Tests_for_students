import React from 'react';
import {getUser,} from '../Actions/UserActions';
import {getUsers,} from '../Actions/UsersActions';
import {connect } from 'react-redux';
import database from '../Firebase';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Loading from '../Components/Loading';
import { setSelectedThemeId } from '../Actions/ThemesActions';
import moment from 'moment';

moment().format();
function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

class Test extends React.Component {
  state = {
    error: false,
    errorSelect: false,
    activeStep: 0,
    questions: [],
    loading: true,
    answerSelect: '',
    answerList: [],
    timer:null,
  }

  timer(){
    const tik = setInterval(()=>{
      this.setState({
        timer:this.state.timer-1
      })
    },1000)

    setTimeout(()=>{
      clearInterval(tik);
      this.finalAll();   
      this.props.history.replace('/home/mark');   
    },this.state.timeOut)
  }

  componentWillMount() {
    database.collection('themes').doc(this.props.selectedTheme).get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          let coolQ = data.questions.sort( function() { return 0.5 - Math.random() } );
          coolQ = getRandomArrayElements(coolQ, data.size) ;
          this.setState({
            name: data.name,
            questions: coolQ,
            timer:+data.timer*60,
            timeOut:+data.timer*60*1000,
          })
        } else {
          this.setState({ error: "Тест не найден" })
        }
      })
      .then(() => {
        this.setState({
          loading: false,
        })
        this.timer();
      })
  }
  componentWillUnmount(){
    this.finalAll();
  }



  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,

    }));
  };
  handleChange = event => {
    this.setState({ answerSelect: event.target.value });
  };
  nextQuestions() {
    if (this.state.answerSelect !== '') {
      const answerList = this.state.answerList;
      answerList[this.state.activeStep] = this.state.answerSelect;
      this.setState({
        errorSelect: false,
        answerList: answerList,
        answerSelect: ''
      })
      this.handleNext();
    } else {
      this.setState({
        errorSelect: 'Необходимо выбрать один или несколько вариантов ответа'
      })
    }
  }

  finalAll(){
    if(this.state.questions.length !== this.state.answerList.length){
      this.setState({
        answerSelect:'-1'
      })
      let chAnswerList = this.state.answerList;
      this.state.questions.forEach((item,index)=>{
         if(this.state.answerList[index] === undefined){
          chAnswerList[index]='-1'
         }
        })
        this.setState({
          answerList:chAnswerList
        });
        
    }


    const answerList = this.state.questions.map((item, index) => {
      return item.answer;
    })
    let rigth = 0;
    answerList.forEach((item, index) => {
      if (item + '' === this.state.answerList[index]) {
        rigth++;
      }
    })
    const prosent = (rigth / answerList.length) * 100;
    let mark = 0;
    if (prosent >= 70 && prosent <= 100) { mark = 5 }
    if (prosent >= 60 && prosent < 70) { mark = 4 }
    if (prosent >= 50 && prosent < 60) { mark = 3 }
    if (prosent < 50) { mark = 2 }

    // this.props.userUpdate(this.props.user.uid,{
    //   ["marks." + this.props.selectedTheme]: mark
    // })
    database.collection('users').doc(this.props.user.uid).update({
      ["marks." + this.props.selectedTheme]: mark
    }).then((e) => {
      this.props.getUser();
      this.props.getUsers();
    })

  }

  checkRightAnswer(){
    
  }

  readyQuestions() {
    if (this.state.answerSelect !== '') {
      const answerListUser = this.state.answerList;
      answerListUser[this.state.activeStep] = this.state.answerSelect;
      this.setState({
        errorSelect: false,
        answerList: answerListUser,
        answerSelect: ''
      })
      const answerList = this.state.questions.map((item, index) => {
        return item.answer;
      })
      let rigth = 0;
      answerList.forEach((item, index) => {
        if (item + '' === this.state.answerList[index]) {
          rigth++;
        }
      })
      const prosent = (rigth / answerList.length) * 100;
      let mark = 0;
      if (prosent >= 70 && prosent <= 100) { mark = 5 }
      if (prosent >= 60 && prosent < 70) { mark = 4 }
      if (prosent >= 50 && prosent < 60) { mark = 3 }
      if (prosent < 50) { mark = 2 }

      // this.props.userUpdate(this.props.user.uid,{
      //   ["marks." + this.props.selectedTheme]: mark
      // })
      database.collection('users').doc(this.props.user.uid).update({
        ["marks." + this.props.selectedTheme]: mark
      }).then((e) => {
        this.props.getUser();
        this.props.getUsers();
      })
      this.props.history.replace('/home/mark');
    } else {
      this.setState({
        errorSelect: 'Необходимо выбрать один или несколько вариантов ответа'
      })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.getData(nextProps.user.uid);
  // }
  getData(userID) {
    database.collection('users').doc(userID).get().then(doc => {
      if (doc.data().marks[this.props.selectedTheme]) {
        this.setState({
          error: 'Вы уже проходили данный тест'
        })
      }
    })
  }

  render() {
    const { activeStep, questions } = this.state;
    const activeQuestion = questions[activeStep];
    const nextQuestions = this.nextQuestions.bind(this);
    const readyQuestions = this.readyQuestions.bind(this);
    return (
      <div>
        {this.state.error
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40, }}><Typography variant="h5" component="h2" color="error" >{this.state.error}</Typography></div>
          : this.state.loading
            ? <Loading />
            : <div style={{ display: 'flex', justifyContent: 'center', }}>
              <Card style={{
                width: '100%',
                margin: 4,
                marginTop: 40,
                maxWidth: 800,
              }}>
                <CardContent>
                
                <Typography variant="subtitle1" color="secondary" component="p" align="right">
                Оставшееся время : {moment.unix(this.state.timer).format('mm:ss')}
                    </Typography>
                  <div><Stepper activeStep={activeStep}>
                    {this.state.questions.map((item, index) => (
                      <Step key={index}>
                        <StepLabel />
                      </Step>
                    ))}
                  </Stepper>
                 
                    <Typography variant="h5" component="h2">
                      {activeQuestion.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Выберите {activeQuestion.answer.length === 2 ? 'два варианта' : 'один вариант'} ответа
              </Typography>
                    <FormControl component="fieldset" >
                      <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        style={{ paddingTop: 20, }}
                        value={this.state.answerSelect}
                        onChange={this.handleChange}
                        error={(this.state.errorSelect !== false)}
                      >
                        {
                          activeQuestion.answers.map((item, index) => {
                            return <FormControlLabel style={{ paddingTop: 5, paddingBottom: 5, }} key={index + ''} value={index + ''} control={<Radio />} label={item} />
                          })
                        }
                      </RadioGroup>
                      {this.state.errorSelect ? <FormHelperText error>{this.state.errorSelect}</FormHelperText> : null}
                    </FormControl>
                  </div>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {
                    (questions.length - 1 === activeStep)
                      ? <Button variant="contained" color="primary" onClick={readyQuestions} disabled={this.state.loading} >Готово</Button>
                      : <Button variant="contained" onClick={nextQuestions} color="primary" disabled={this.state.loading} >Далее</Button>
                  }
                </CardActions>
              </Card>
            </div>
        }
      </div>

    );
  }

}


function mapStateToProps(state) {
  return {
    user: state.user,
    selectedTheme: state.themes.selectedTheme,
  };
}

export default connect(mapStateToProps, { getUser,getUsers ,setSelectedThemeId})(Test)