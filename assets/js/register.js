console.log("Register JS Loaded");
import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "../index.html";
    }
});

const registerBtn =
document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    try {
        // Force session-only persistence (logs out when tab/browser is closed)
        await setPersistence(auth, browserSessionPersistence);

        const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(
            userCredential.user,
            {
                displayName: name
            }
        );

        alert("Registration Successful");

        window.location.href =
        "login.html";

    }
    catch(error) {

        alert(error.message);

    }

});