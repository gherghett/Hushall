// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6YRQ6KFl-EmoxWZUMLPB0us4YXteEGNw",
  authDomain: "d4estation-bef35.firebaseapp.com",
  databaseURL: "https://d4estation-bef35-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "d4estation-bef35",
  storageBucket: "d4estation-bef35.firebasestorage.app",
  messagingSenderId: "929478232053",
  appId: "1:929478232053:web:8a714255ddd84ed78fc2bc",
  measurementId: "G-W7Q9L9KPWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore AND get reference to the service
const db = getFirestore(app);