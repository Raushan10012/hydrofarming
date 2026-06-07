// frontend/assets/js/auth-state.js

import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if(user){

        console.log("Logged in:", user.email);

    } else {

        console.log("Not logged in");

    }

});
try {

    await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    alert("Login Successful");

    console.log("Before redirect");

    window.location.replace("../index.html");

}
catch(error) {

    console.log(error);

    alert(error.message);

}