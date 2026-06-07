import { auth } from "./firebase.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const userArea = document.getElementById("userArea");

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

onAuthStateChanged(auth, (user) => {
    // Check if the current page is inside the /pages/ folder
    const isSubPage = window.location.pathname.includes("/pages/");
    const pathPrefix = isSubPage ? "" : "pages/";

    if (user) {
        // Force flex styling inline to bypass browser CSS cache!
        userArea.style.display = "flex";
        userArea.style.alignItems = "center";
        userArea.style.gap = "10px";
        userArea.style.flexWrap = "nowrap";

        const fullName = user.displayName || user.email;
        const name = fullName.split(" ")[0];
        
        // Fetch profile pic from LocalStorage
        const savedPic = localStorage.getItem(`profilePic_${user.email}`);
        const avatarHtml = savedPic 
            ? `<img src="${savedPic}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; vertical-align: middle; margin-right: 6px; border: 1px solid #2e7d32;">`
            : `<span style="margin-right: 6px;">👤</span>`;

        userArea.innerHTML = `
            <a href="${pathPrefix}profile.html" class="login-btn" style="display: inline-flex; align-items: center; padding: 10px 18px; white-space: nowrap; flex-shrink: 0;">
                ${avatarHtml} <span>${escapeHTML(name)}</span>
            </a>
            <button id="logoutBtn" style="background: none; border: 1px solid #2e7d32; color: #2e7d32; padding: 10px 14px; border-radius: 12px; cursor: pointer; font-weight: 600; white-space: nowrap; flex-shrink: 0; font-family: 'Poppins', sans-serif;">
                Logout
            </button>
        `;

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", async () => {
                await signOut(auth);
                location.reload();
            });
        }
    } else {
        userArea.innerHTML = `
            <a href="${pathPrefix}login.html" class="login-btn">
                Login
            </a>
        `;
    }
});