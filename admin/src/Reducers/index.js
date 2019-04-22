import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import UserReducer from './UserReducer'
import ThemesReducer from './ThemesReducer';
import GroupsReducer from './GroupsReducer';

export default combineReducers({
    form:formReducer,
    user: UserReducer,
    themes:ThemesReducer,
    groups:GroupsReducer,
})