import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyAtN_HzTK6TTFPMrB1db_IRhROkuRn2OnI",
    authDomain: "abril-2021-1.firebaseapp.com",
    projectId: "abril-2021-1",
    storageBucket: "abril-2021-1.appspot.com",
    messagingSenderId: "237667483185",
    appId: "1:237667483185:web:432f79700dfcfe5e631f10"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()
const auth = firebase.auth()
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp

export {db, auth, firebase, marcaTiempo}
