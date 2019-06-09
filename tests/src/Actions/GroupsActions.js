import database from '../Firebase';
export const GET_GROUPS = 'get_groups';
export function getGroups() {
    return dispatch => {
        database.collection('groups').doc('groupList').get()
        .then(list=>{
            dispatch({
                type: GET_GROUPS,
                payload: {list:list.data().list}
            });
        })
;
    };
}
export const UPDATES_GROUPS = 'updateGroups';
export function updateGroups(array) {
    return dispatch => {
        database.collection('groups').doc('groupList').update({list:array});
        dispatch({
            type: UPDATES_GROUPS,
            payload: {list:array}
        });
    }
}
