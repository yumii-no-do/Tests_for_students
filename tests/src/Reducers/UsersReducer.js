import { GET_USERS } from '../Actions/UsersActions';
export default function (state = { loading: true }, action) {
    switch (action.type) {
            case GET_USERS:
            return { loading: false, ...action.payload };
        default:
            return state;
    }
}