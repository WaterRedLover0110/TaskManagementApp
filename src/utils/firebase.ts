// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeASpBGlrhniVO10ZUsOv6LQQRd-k0epo",
  authDomain: "stacklok-124cf.firebaseapp.com",
  projectId: "stacklok-124cf",
  storageBucket: "stacklok-124cf.appspot.com",
  messagingSenderId: "317131718077",
  appId: "1:317131718077:web:2381fbda08693da9b766d4",
  measurementId: "G-ZQ6GYM09JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;