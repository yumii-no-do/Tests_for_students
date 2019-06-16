import React from 'react';
import { connect } from 'react-redux';
import database from '../Firebase';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loading from '../Components/Loading';



class Mark extends React.Component {
    state = {
        mark: '',
        loading: true,
    }
    componentWillReceiveProps(nextProps) {
        database.collection('users').doc(nextProps.user.uid).get()
            .then(doc => {
                this.setState({
                    mark: doc.data().marks[this.props.selectedTheme],
                    loading: false,
                })
            });
    }
    render() {
        return (
            this.state.loading
                ? <Loading/>
                : <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Card style={{
                        width: '100%',
                        margin: 40,
                        maxWidth: 550,
                    }}>
                        <CardContent>
                            <Typography variant="title" component="title">Ваша оценка: </Typography>
                            <Typography color="secondary" style={{ marginTop: 20, }} align="center" variant="h1" component="h1">
                                {this.state.mark}
                            </Typography>
                        </CardContent>
                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {
                                <Button variant="contained" color="primary" onClick={() => { this.props.history.replace('/'); }} >Назад</Button>
                            }
                        </CardActions>
                    </Card>
                </div>
        );
    }

}


function mapStateToProps(state) {
    return { 
      user: state.user ,
      selectedTheme: state.themes.selectedTheme,
    };
  }
  
  export default connect(mapStateToProps, { })(Mark)