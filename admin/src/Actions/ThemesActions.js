import database from '../Firebase';
export const GET_THEMES = 'get_themes';
export function getThemes() {
    return dispatch => {
        database.collection('themes').get()
        .then(listDocs=>{
            const res = listDocs.docs.map(doc=>{
                return {
                    id:doc.id,
                    ...doc.data(),
                }
            })
            dispatch({
                type: GET_THEMES,
                payload: {data:res}
            });
        })
    };
}

export function createTheme(name, questions=[],access=[]) {
    return dispatch => {
        database.collection('themes').add({
            name: name,
            questions:questions,
            access:access,
        })
    }
}
export function updateTheme(id,object) {
    return dispatch => {
        database.collection('themes').doc(id).update(object)
    }
}
export function deleteTheme(id,object) {
    return dispatch => {
        database.collection('themes').doc(id).delete()
    }
}
