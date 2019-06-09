import {getThemes } from './ThemesActions';
import { getUsers } from './UsersActions';
import { getGroups } from './GroupsActions';
import { getUser } from './UserActions';

export const GET_ALL_DATA = 'getAllData';
export function getAllData(){

    return dispatch=>{
        dispatch({
            type:GET_ALL_DATA,
        })
        dispatch(getThemes());
        dispatch(getGroups());
        dispatch(getUsers());
        dispatch(getUser());
    }
}