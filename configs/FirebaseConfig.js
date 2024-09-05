// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHsZjS5XbKPKsNbLAMvYY6GX0r3czVU5c",
  authDomain: "library-app-4a915.firebaseapp.com",
  projectId: "library-app-4a915",
  storageBucket: "library-app-4a915.appspot.com",
  messagingSenderId: "1027621224980",
  appId: "1:1027621224980:web:5a0b221131251173211d01",
  measurementId: "G-8K5MXLVT0D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);