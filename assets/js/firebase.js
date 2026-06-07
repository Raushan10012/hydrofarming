import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCnsw_FNDK6DWvmes_G1tFm6VbcVFJ-Tqk",

  authDomain: "hydrolearn-9a70f.firebaseapp.com",

  projectId: "hydrolearn-9a70f",

  storageBucket: "hydrolearn-9a70f.firebasestorage.app",

  messagingSenderId: "126720338711",

  appId: "1:126720338711:web:b587ccca6b093e9963f63a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);