import { GET_GROUPS,UPDATES_GROUPS } from '../Actions/GroupsActions';
export default function (state = { loading: true }, action) {
    switch (action.type) {
        case GET_GROUPS:
            return { loading: false, ...action.payload };
        case UPDATES_GROUPS:
            return { loading: false, ...action.payload };
        default:
            return state;
    }
}