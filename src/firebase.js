// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxb83lHDY2djOnMKpW3Qiut0RVpYKZGxc",
  authDomain: "arboreal-logic-382008.firebaseapp.com",
  projectId: "arboreal-logic-382008",
  storageBucket: "arboreal-logic-382008.appspot.com",
  messagingSenderId: "490596187269",
  appId: "1:490596187269:web:785c1818c79fa946d2fdec",
  measurementId: "G-1Y37CE0Q1T",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
