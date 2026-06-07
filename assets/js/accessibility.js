// Accessibility Controls for HydroLearn
document.addEventListener("DOMContentLoaded", () => {
    // Inject Accessibility CSS rules
    const style = document.createElement("style");
    style.innerHTML = `
        /* High Contrast Mode CSS */
        body.high-contrast {
            background: #0B0F19 !important;
            color: #FFFFFF !important;
        }
        body.high-contrast .navbar,
        body.high-contrast .sidebar,
        body.high-contrast .dashboard-card,
        body.high-contrast .benefit-card,
        body.high-contrast .crop-card,
        body.high-contrast .post-card,
        body.high-contrast .chat-window,
        body.high-contrast .product-card,
        body.high-contrast .contact-form,
        body.high-contrast .contact-info,
        body.high-contrast .topic-card {
            background: #1E293B !important;
            color: #FFFFFF !important;
            border: 2px solid #FFFFFF !important;
            box-shadow: none !important;
        }
        body.high-contrast a,
        body.high-contrast button,
        body.high-contrast .logo,
        body.high-contrast h1,
        body.high-contrast h2,
        body.high-contrast h3,
        body.high-contrast h4,
        body.high-contrast h5,
        body.high-contrast h6,
        body.high-contrast strong {
            color: #FFFF00 !important;
        }
        body.high-contrast input,
        body.high-contrast textarea,
        body.high-contrast select {
            background: #000000 !important;
            color: #FFFFFF !important;
            border: 2px solid #FFFF00 !important;
        }

        /* Font Sizing CSS */
        body.font-large {
            font-size: 19px !important;
        }
        body.font-large p, body.font-large li, body.font-large span, body.font-large a, body.font-large button, body.font-large input, body.font-large textarea {
            font-size: 18px !important;
        }
        body.font-large h1 { font-size: 3.5rem !important; }
        body.font-large h2 { font-size: 2.8rem !important; }
        body.font-large h3 { font-size: 2rem !important; }
        
        body.font-xlarge {
            font-size: 22px !important;
        }
        body.font-xlarge p, body.font-xlarge li, body.font-xlarge span, body.font-xlarge a, body.font-xlarge button, body.font-xlarge input, body.font-xlarge textarea {
            font-size: 21px !important;
        }
        body.font-xlarge h1 { font-size: 4rem !important; }
        body.font-xlarge h2 { font-size: 3.2rem !important; }
        body.font-xlarge h3 { font-size: 2.4rem !important; }

        /* Accessibility Dialog CSS */
        .access-modal {
            position: fixed;
            top: 90px;
            right: 20px;
            width: 300px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            padding: 20px;
            z-index: 10000;
            display: none;
            border: 1px solid #E2E8F0;
            font-family: 'Poppins', sans-serif;
            animation: slideInAccess 0.25s ease-out;
        }
        body.high-contrast .access-modal {
            background: #1E293B;
            border: 2px solid #FFFFFF;
        }
        @keyframes slideInAccess {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .access-modal h3 {
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 18px;
            border-bottom: 1px solid #E2E8F0;
            padding-bottom: 8px;
            color: #2e7d32;
        }
        body.high-contrast .access-modal h3 {
            color: #FFFF00 !important;
            border-bottom: 1px solid #FFFFFF;
        }
        .access-option {
            margin-bottom: 15px;
        }
        .access-label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 14px;
        }
        .access-btn-group {
            display: flex;
            gap: 8px;
        }
        .access-toggle-btn {
            flex: 1;
            padding: 8px 12px;
            background: #F1F5F9;
            border: 1px solid #CBD5E1;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            font-size: 13px;
            transition: 0.2s;
        }
        .access-toggle-btn.active {
            background: #2e7d32;
            color: white;
            border-color: #2e7d32;
        }
        body.high-contrast .access-toggle-btn.active {
            background: #FFFF00 !important;
            color: #000000 !important;
            border-color: #FFFF00 !important;
        }
    `;
    document.head.appendChild(style);

    // Create Accessibility Dialog DOM
    const modal = document.createElement("div");
    modal.className = "access-modal";
    modal.id = "accessModal";
    modal.innerHTML = `
        <h3>♿ Accessibility Panel</h3>
        <div class="access-option">
            <span class="access-label">Contrast Mode:</span>
            <div class="access-btn-group">
                <button class="access-toggle-btn" id="contrastNormalBtn">Normal</button>
                <button class="access-toggle-btn" id="contrastHighBtn">High Contrast</button>
            </div>
        </div>
        <div class="access-option">
            <span class="access-label">Text Size:</span>
            <div class="access-btn-group">
                <button class="access-toggle-btn" id="fontNormalBtn">Normal</button>
                <button class="access-toggle-btn" id="fontLargeBtn">Large</button>
                <button class="access-toggle-btn" id="fontXLargeBtn">Extra Large</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Load saved settings
    const highContrast = localStorage.getItem("highContrast") === "true";
    const fontSize = localStorage.getItem("fontSize") || "normal";

    if (highContrast) {
        document.body.classList.add("high-contrast");
        document.getElementById("contrastHighBtn").classList.add("active");
    } else {
        document.getElementById("contrastNormalBtn").classList.add("active");
    }

    if (fontSize === "large") {
        document.body.classList.add("font-large");
        document.getElementById("fontLargeBtn").classList.add("active");
    } else if (fontSize === "xlarge") {
        document.body.classList.add("font-xlarge");
        document.getElementById("fontXLargeBtn").classList.add("active");
    } else {
        document.getElementById("fontNormalBtn").classList.add("active");
    }

    // Toggle Modal Visibility when clicking any accessibility button
    document.addEventListener("click", (e) => {
        const accessBtn = e.target.closest(".access-btn");
        const modalEl = document.getElementById("accessModal");
        
        if (accessBtn) {
            e.stopPropagation();
            modalEl.style.display = modalEl.style.display === "block" ? "none" : "block";
        } else if (modalEl && !modalEl.contains(e.target)) {
            modalEl.style.display = "none";
        }
    });

    // Handle button actions inside modal
    document.getElementById("contrastNormalBtn").onclick = () => {
        document.body.classList.remove("high-contrast");
        localStorage.setItem("highContrast", "false");
        document.getElementById("contrastNormalBtn").classList.add("active");
        document.getElementById("contrastHighBtn").classList.remove("active");
    };

    document.getElementById("contrastHighBtn").onclick = () => {
        document.body.classList.add("high-contrast");
        localStorage.setItem("highContrast", "true");
        document.getElementById("contrastHighBtn").classList.add("active");
        document.getElementById("contrastNormalBtn").classList.remove("active");
    };

    function resetFontClasses() {
        document.body.classList.remove("font-large", "font-xlarge");
        document.getElementById("fontNormalBtn").classList.remove("active");
        document.getElementById("fontLargeBtn").classList.remove("active");
        document.getElementById("fontXLargeBtn").classList.remove("active");
    }

    document.getElementById("fontNormalBtn").onclick = () => {
        resetFontClasses();
        localStorage.setItem("fontSize", "normal");
        document.getElementById("fontNormalBtn").classList.add("active");
    };

    document.getElementById("fontLargeBtn").onclick = () => {
        resetFontClasses();
        document.body.classList.add("font-large");
        localStorage.setItem("fontSize", "large");
        document.getElementById("fontLargeBtn").classList.add("active");
    };

    document.getElementById("fontXLargeBtn").onclick = () => {
        resetFontClasses();
        document.body.classList.add("font-xlarge");
        localStorage.setItem("fontSize", "xlarge");
        document.getElementById("fontXLargeBtn").classList.add("active");
    };
});
