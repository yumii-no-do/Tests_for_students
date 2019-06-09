import { GET_USER,IS_SIGNED_IN } from '../Actions/UserActions';
export default function (state = { loading: true }, action) {
    switch (action.type) {
        case GET_USER:
            return { loading: false, ...action.payload };
        case IS_SIGNED_IN:
            return {...action.payload };
        default:
            return state;
    }
}