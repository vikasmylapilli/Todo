

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD17Is_Uzi76HRvhu53nD0uez-l019c4s0",
    authDomain: "todo-22a15.firebaseapp.com",
    projectId: "todo-22a15",
    storageBucket: "todo-22a15.appspot.com",
    messagingSenderId: "478728772733",
    appId: "1:478728772733:web:65ad4cc8f1031ed345a514",
    measurementId: "G-9HZ10BYQJE"
})

const db = firebaseApp.firestore();

export { db };

