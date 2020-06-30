import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // config goes here...
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();

export { db };
