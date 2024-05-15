// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeERxwP7H3NoeaXfbuTLCXLMJyOUzYas8",
  authDomain: "react-redux--auth.firebaseapp.com",
  projectId: "react-redux--auth",
  storageBucket: "react-redux--auth.appspot.com",
  messagingSenderId: "734348078557",
  appId: "1:734348078557:web:fc7eba2b67612b4c401a34",
  measurementId: "G-MX7FPXGWBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider;

export {auth, provider};

// const analytics = getAnalytics(app);
