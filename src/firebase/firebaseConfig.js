// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAufPHSe8rS-nsEkRrVShMt9kOk5KI285g",
  authDomain: "todoapp-3cf7d.firebaseapp.com",
  databaseURL: "https://todoapp-3cf7d-default-rtdb.firebaseio.com",
  projectId: "todoapp-3cf7d",
  storageBucket: "todoapp-3cf7d.firebasestorage.app",
  messagingSenderId: "709721244508",
  appId: "1:709721244508:web:5f78cb8daff3641512f799"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
export { db };