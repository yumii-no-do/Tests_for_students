import { GET_THEMES } from '../Actions/ThemesActions';
export default function (state = { loading: true }, action) {
    switch (action.type) {
        case GET_THEMES:
            return { loading: false, ...action.payload };
        default:
            return state;
    }
}