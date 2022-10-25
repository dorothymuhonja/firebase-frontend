import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBxroySEXarW4In1zJjTxEllX6xVZvqtI",
  authDomain: "fir-frontend-2a7d7.firebaseapp.com",
  projectId: "fir-frontend-2a7d7",
  storageBucket: "fir-frontend-2a7d7.appspot.com",
  messagingSenderId: "775372268864",
  appId: "1:775372268864:web:880f62cb466d0b22fb46a5",
  measurementId: "G-N8NTS83X82"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);