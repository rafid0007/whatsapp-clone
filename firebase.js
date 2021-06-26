import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAGuBiDyhsyOuA6hA8ZF0ohxuoCvWaYrgU",
  authDomain: "whatsapp-clone-5e523.firebaseapp.com",
  projectId: "whatsapp-clone-5e523",
  storageBucket: "whatsapp-clone-5e523.appspot.com",
  messagingSenderId: "635479139646",
  appId: "1:635479139646:web:dd22cf3951bf295170b86f"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};