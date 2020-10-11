import firebase from 'firebase';
// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

const firebaseConfig = {
    apiKey: "AIzaSyBf1Ng43WC5Sz1xivjDCbjoWuSt5VS2AjA",
    authDomain: "discord-clone-maddy.firebaseapp.com",
    databaseURL: "https://discord-clone-maddy.firebaseio.com",
    projectId: "discord-clone-maddy",
    storageBucket: "discord-clone-maddy.appspot.com",
    messagingSenderId: "216528099851",
    appId: "1:216528099851:web:ce073fcedbb5c70340c50e",
    measurementId: "G-PQRGD3YGFB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;