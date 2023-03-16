// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// used to import storage
import{getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2mtblupltarsaHt0iAfhroRTkejprq_w",
  authDomain: "realator-react-clone.firebaseapp.com",
  projectId: "realator-react-clone",
  storageBucket: "realator-react-clone.appspot.com",
  messagingSenderId: "1069067477755",
  appId: "1:1069067477755:web:a4131be1ff884b9d1dc65e",
  measurementId: "G-4VKFLSDN79"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore() 