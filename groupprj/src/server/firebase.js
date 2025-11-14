// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJVgk--J0V2wqV3SxXn5OmY_bPxkDwpZo",
  authDomain: "exchange-cs385.firebaseapp.com",
  projectId: "exchange-cs385",
  storageBucket: "exchange-cs385.firebasestorage.app",
  messagingSenderId: "1087053803518",
  appId: "1:1087053803518:web:bcdfcd966bcd828c089aaf",
  measurementId: "G-PK3ZKD7WDR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app); // 数据库
export const auth = getAuth(app); // 用户认证
