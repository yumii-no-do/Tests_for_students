import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import UserReducer from './UserReducer'

export default combineReducers({
    form:formReducer,
    user: UserReducer
})