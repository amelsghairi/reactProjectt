// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyLyN0g79_3M0JYKS86eq93COqBELAQQ0",
  authDomain: "projectr-1ec0a.firebaseapp.com",
  projectId: "projectr-1ec0a",
  storageBucket: "projectr-1ec0a.appspot.com",
  messagingSenderId: "819743803595",
  appId: "1:819743803595:web:01d7ac2172ffb8d39bf34e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);