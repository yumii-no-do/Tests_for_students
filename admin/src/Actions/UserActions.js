import { auth } from '../Firebase';
import database from '../Firebase';


export const GET_USER = 'get_user';
export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            dispatch({
                type: GET_USER,
                payload: user
            });
        })
;
    };
}

export function login(email, password) {
    return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
    return dispatch => auth.signOut();
}

export function createAccount(email, password,name,group) {
    return dispatch => auth.createUserWithEmailAndPassword(email, password);
}

export const GET_USERS = 'getUsers';
export function getUsers(){
    return dispatch=>{
        database.collection('users').get()
            .then(list => {
                const listUsers = list.docs.map(doc => {
                    return { id: doc.id, doc: doc.data() }
                })
                dispatch({
                    type:GET_USERS,
                    payload:{
                        users:listUsers,
                    },
                })
            })
    }
}

// export function do(){
//    

// export function getUserData() {
//     return dispatch => auth.onAuthStateChanged(user => {
//         dispatch({
//             type: GET_USER,
//             payload: user
//         });
//     });
// }





