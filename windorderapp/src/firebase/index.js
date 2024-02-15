// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkeb4qhitPSixRL0YrgxUHBNv2TAkqHis",
  authDomain: "windorder-39a3d.firebaseapp.com",
  projectId: "windorder-39a3d",
  storageBucket: "windorder-39a3d.appspot.com",
  messagingSenderId: "718523461230",
  appId: "1:718523461230:web:f9c4d3948e18bb10c5407f",
  measurementId: "G-JLWLSTWV8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {
    db,
    auth
}