import database from '../Firebase';
export const GET_GROUPS = 'get_groups';
export function getGroups() {
    return dispatch => {
        database.collection('groups').doc('groupList').get()
        .then(list=>{
            console.log(list.data().list)
            dispatch({
                type: GET_GROUPS,
                payload: {list:list.data().list}
            });
        })
;
    };
}
export function updateGroups(array) {
    return dispatch => {
        database.collection('groups').doc('groupList').update({list:array})
    }
}
