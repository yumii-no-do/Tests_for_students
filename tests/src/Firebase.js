import * as firebase from 'firebase'
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBnN9WXmM7duEVFsOlRTQNF8CLDYOUI2ew",
    authDomain: "stolla-testing.firebaseapp.com",
    databaseURL: "https://stolla-testing.firebaseio.com",
    projectId: "stolla-testing",
    storageBucket: "stolla-testing.appspot.com",
    messagingSenderId: "772979394090"
};
firebase.initializeApp(config);

export default !firebase.apps.length
    ? firebase.initializeApp(config).firestore()
    : firebase.app().firestore();

export const auth = firebase.auth();















