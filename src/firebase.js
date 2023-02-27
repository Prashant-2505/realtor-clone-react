// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// used to import storage
import{getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLZMbh8tHuABvdrTfAN5NnFwNoDeiJSao",
  authDomain: "realtor-clone-react-d6db9.firebaseapp.com",
  projectId: "realtor-clone-react-d6db9",
  storageBucket: "realtor-clone-react-d6db9.appspot.com",
  messagingSenderId: "295118462877",
  appId: "1:295118462877:web:0a86cdb3ed3faffa12d974"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore()