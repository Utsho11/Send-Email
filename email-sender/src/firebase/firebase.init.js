// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsrrafGgONWN7m1CPQVWqnEXAzpF9qvSI",
  authDomain: "email-sender-1fae3.firebaseapp.com",
  projectId: "email-sender-1fae3",
  storageBucket: "email-sender-1fae3.firebasestorage.app",
  messagingSenderId: "17168281886",
  appId: "1:17168281886:web:9d5b67c254c9664fd0190f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
