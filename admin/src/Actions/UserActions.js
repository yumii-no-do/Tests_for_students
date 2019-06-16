import database,{ auth } from '../Firebase';


export const GET_USER = 'get_user';
export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            if (user) {
                database.collection('users').doc(user.uid).get()
                .then(doc=>{
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
export function login(email, password) {
    return dispatch => {
        auth.signInWithEmailAndPassword(email, password).catch(err => {
        
            let error = {};
            switch (err.code) {
                case "auth/invalid-email": error = { error: 'Не верный формат email' }; break;
                case "auth/user-not-found": error = { error: 'Нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален.' }; break;
                case "auth/wrong-password": error = { error: 'Не верный пароль' }; break;

                default: error = { error: false }; break;
            }
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
export function createAccount(email, password, name, group) {
    return dispatch => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                result.user.sendEmailVerification().then(function () {
                }).catch(function (error) {
                });
                database.collection('users').doc(result.user.uid).set({
                    name: name,
                    group: group,
                    marks: {},
                    teacherVerified:false,
                })
                .catch(err=>{
                    console.error(err);
                    
                })
            })
            .catch(err => {
                // if(err.message === "auth/invalid-email"){
                //     this.setState({
                //     error: {
                //         ...this.state.error,
                //         email:'Не верный формат email'
                //     }
                // });
                // }

            });
            dispatch({
                type:CREATE_ACCOUNT,
            })
    }
}

export const USER_VEFIFICATION = 'userVerification';
export function userVerification(){
    return dispatch=>{
        auth.currentUser.sendEmailVerification().then(function () {
            dispatch(getUser)
        }).catch(function (error) {
            // An error happened.
        });
        dispatch({
            type:USER_VEFIFICATION
        })
        
    }
}

export const USER_UPDATE = 'userUpdate';
export function userUpdate(uid,updatedData){
    
    return dispatch=>{
        database.collection('users').doc(uid).update(updatedData)
        .then(value=>{ 
            
          dispatch({
            type:USER_UPDATE,
            
        })
        window.location.reload();
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





