import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ4GjgEx8ZZIyof6sWMHvGuWvCzURNfJM",
  authDomain: "elder-6b348.firebaseapp.com",
  projectId: "elder-6b348",
  storageBucket: "elder-6b348.appspot.com",
  messagingSenderId: "774852475757",
  appId: "1:774852475757:web:9c2a16bb42e3d3cf9a7864",
};

let app;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };

export default firebase;
