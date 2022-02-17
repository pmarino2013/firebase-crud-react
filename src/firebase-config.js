import { initializeApp } from "firebase/app";

//Para poder usar la base de datos de Firestore
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApDP8iHl0BG4LCOvWRtAYgcS5M-JOZhAM",
  authDomain: "react-crud-61f40.firebaseapp.com",
  projectId: "react-crud-61f40",
  storageBucket: "react-crud-61f40.appspot.com",
  messagingSenderId: "315461570582",
  appId: "1:315461570582:web:56a5068493d90b9b5be537",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
