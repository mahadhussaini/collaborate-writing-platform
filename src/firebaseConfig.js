import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0Mj8nx6Nmh_Fz62UL11J1I_fL-7f8gCI",
  authDomain: "collaborative-writing-platform.firebaseapp.com",
  projectId: "collaborative-writing-platform",
  storageBucket: "collaborative-writing-platform.appspot.com",
  messagingSenderId: "739542092739",
  appId: "1:739542092739:web:e106a8384363707e850b76",
  measurementId: "G-7QNSS3714V",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {
  auth,
  firestore,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
