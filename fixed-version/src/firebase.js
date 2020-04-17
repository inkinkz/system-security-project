import firebase from "firebase/app";
import "firebase/database";

// if (!process.env.FIREBASE_API_KEY) {
//   throw new Error("missing FIREBASE_API_KEY");
// }

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "system-security-demo.firebaseapp.com",
  databaseURL: "https://system-security-demo.firebaseio.com",
  projectId: "system-security-demo",
  storageBucket: "system-security-demo.appspot.com",
  messagingSenderId: "668650745744",
  appId: "1:668650745744:web:36222ac209df04a70ccd15",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const database = firebase.database();
export const Firebase = firebase;
