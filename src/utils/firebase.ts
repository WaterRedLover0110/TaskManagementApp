// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export default app;