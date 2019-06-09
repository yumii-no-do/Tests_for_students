import {combineReducers} from 'redux'
import UserReducer from './UserReducer'
import ThemesReducer from './ThemesReducer';
import GroupsReducer from './GroupsReducer';
import UsersReducer from './UsersReducer';

export default combineReducers({
    user: UserReducer,
    users:UsersReducer,
    themes:ThemesReducer,
    groups:GroupsReducer,
})