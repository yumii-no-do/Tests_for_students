import { auth } from '../Firebase';
import database from '../Firebase';



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
