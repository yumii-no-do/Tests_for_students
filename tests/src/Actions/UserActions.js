import database, { auth } from '../Firebase';
import { getUsers } from './UsersActions';


export const GET_USER = 'get_user';
export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            if (user) {
                database.collection('users').doc(user.uid).get()
                    .then(doc => {
                        const userData = doc.data();
                        dispatch({
                            type: GET_USER,
                            payload: {
                                isSignedIn: true,
                                ...userData,
                                ...user,

                            }
                        })
                    })

            } else {
                dispatch({
                    type: GET_USER,
                    payload: {
                        isSignedIn: false,
                    }
                })
            }
        })
            ;
    };
}
export const IS_SIGNED_IN = 'isSignedIn';
export function isSignedIn() {
    return dispatch => {
        var user = auth.currentUser;
        if (user) {
            // User is signed in.
            dispatch({
                type: IS_SIGNED_IN,
                payload: {
                    isSignedIn: true,
                    ...user,
                }
            })
        } else {
            // No user is signed in.
            dispatch({
                type: IS_SIGNED_IN,
                payload: {
                    isSignedIn: false,
                }
            })
        }
    }
}
export const LOGIN = 'login';
export const LOGIN_ERROR = 'login error';
export function login(email, password) {
    return dispatch => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(err => {
            console.log(err);
            let error = {};
            switch (err.code) {
                case "auth/invalid-email": error = { error: 'Недействительная электронная почта' }; break;
                case "auth/user-not-found": error = { error: 'Нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален.' }; break;
                case "auth/wrong-password": error = { error: 'Неверный пароль' }; break;
                default: error = { error: "" }; break;
            }
            dispatch({
                type: LOGIN_ERROR,
                payload:error
            })
        });
        dispatch({
            type: LOGIN,
        })
    }
}

export function logout() {
    return dispatch => auth.signOut();
}

export const CREATE_ACCOUNT = 'createAccount';
export const CREATE_ACCOUNT_ERROR = 'CREATE_ACCOUNT_ERROR';
export function createAccount(email, password, name, group) {
    return dispatch => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                console.log(result)
                result.user.sendEmailVerification().then(function () {
                    console.log("Email sent.");
                })
                    .catch(function (error) {
                        // An error happened.
                        console.log("An error happened.");
                        console.log(error);
                    });
                database.collection('users').doc(result.user.uid).set({
                    name: name,
                    group: group,
                    marks: {},
                    teacherVerified: false,
                    registrationTime: new Date(),
                }).catch(err => {
                    console.error(err);
                })
            })
            .catch(e => {
                let message = "";
                switch (e.code) {
                    case 'auth/invalid-email': {
                        message = "Недействительная электронная почта";
                        break;
                    }
                    case 'auth/weak-password': {
                        message = "Пароль должен быть не менее 6 символов";
                        break;
                    }
                    default: {
                        message = "";
                        break;
                    }
                }
                const err = {
                    error: message
                }
                console.log(err, e)
                dispatch({
                    type: CREATE_ACCOUNT_ERROR,
                    payload: err
                })
            });
        dispatch({
            type: CREATE_ACCOUNT,
        })
    }
}

export const USER_VEFIFICATION = 'userVerification';
export function userVerification() {
    return dispatch => {
        auth.currentUser.sendEmailVerification().then(function () {
            console.log("Email sent.");
            dispatch(getUser)
        }).catch(function (error) {
            // An error happened.
            console.log("An error happened.");
            console.log(error);
        });
        dispatch({
            type: USER_VEFIFICATION
        })

    }
}

export const USER_UPDATE = 'userUpdate';
export function userUpdate(uid, updatedData) {
    dispatch => {
        database.collection('users').doc(uid).update(updatedData)
            .then(value => {
                dispatch({
                    type: USER_UPDATE,
                })
                // dispatch(getUser());
                // dispatch(getUsers()); 
            })

    }
}


