// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {  getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqxOJhsA1n10iyEHTIC53XkXz2kkfpYEQ",
  authDomain: "wasireactfirebase.firebaseapp.com",
  projectId: "wasireactfirebase",
  storageBucket: "wasireactfirebase.appspot.com",
  messagingSenderId: "26020792507",
  appId: "1:26020792507:web:b69c14cac862852d35819e",
  measurementId: "G-VPYBC0NFEB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const STORAGE = getStorage(app)
const DATABASE = getDatabase(app)

export { Auth, STORAGE, DATABASE };
