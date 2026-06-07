import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "../index.html";
    }
});

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    try {
        // Force session-only persistence (logs out when tab/browser is closed)
        await setPersistence(auth, browserSessionPersistence);

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Login Successful");
        window.location.href = "../index.html";

    } catch (error) {

        alert(error.message);

    }

});