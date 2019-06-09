import { GET_THEMES, SET_SELECTED_THEME_ID, SET_THEMES_LIST } from '../Actions/ThemesActions';
export default function (state = { loading: true }, action) {
    switch (action.type) {
        case GET_THEMES:
            return { loading: false, ...action.payload };
        case SET_SELECTED_THEME_ID:
            return { ...state, ...action.payload };
        case SET_THEMES_LIST:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}