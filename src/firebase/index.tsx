// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcYOQG-XVY35eZOesZzOm9c4WQbPD80jI",
  authDomain: "kato-english.firebaseapp.com",
  projectId: "kato-english",
  storageBucket: "kato-english.appspot.com",
  messagingSenderId: "308116083252",
  appId: "1:308116083252:web:4b6b7e1b29db58c1fdf061",
  measurementId: "G-RESYDJP58S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const db =  getFirestore(app);

export {auth,provider,db};