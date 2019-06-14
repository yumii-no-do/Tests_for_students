import { GET_USER,IS_SIGNED_IN,CREATE_ACCOUNT_ERROR, LOGIN_ERROR } from '../Actions/UserActions';
export default function (state = { loading: true }, action) {
    switch (action.type) {
        case GET_USER:
            return { loading: false, ...action.payload };
        case IS_SIGNED_IN:
            return {...action.payload };
        case CREATE_ACCOUNT_ERROR:
            return {...state, ...action.payload };
        case LOGIN_ERROR:
            return {...state, ...action.payload };
        default:
            return state;
    }
}