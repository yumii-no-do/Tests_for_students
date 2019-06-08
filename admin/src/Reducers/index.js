import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import UserReducer from './UserReducer'
import ThemesReducer from './ThemesReducer';
import GroupsReducer from './GroupsReducer';
import UsersReducer from './UsersReducer';

export default combineReducers({
    form:formReducer,
    user: UserReducer,
    users:UsersReducer,
    themes:ThemesReducer,
    groups:GroupsReducer,
})