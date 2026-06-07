import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const categoryBtns = document.querySelectorAll(".category-btn");
    const cards = document.querySelectorAll(".product-card");

    const checkoutModal = document.getElementById("checkoutModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const confirmOrderBtn = document.getElementById("confirmOrderBtn");
    const modalProductName = document.getElementById("modalProductName");
    const modalProductPrice = document.getElementById("modalProductPrice");
    const shippingAddress = document.getElementById("shippingAddress");

    let currentCategory = "all";
    let searchQuery = "";
    let activeProduct = null;
    let currentUser = null;

    // Monitor Auth State
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
    });

    // Filtering logic
    function filterProducts() {
        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const category = card.getAttribute("data-category");

            const matchesSearch = title.includes(searchQuery);
            const matchesCategory = currentCategory === "all" || category === currentCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Keyup search listener
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            searchQuery = searchInput.value.toLowerCase().trim();
            filterProducts();
        });
    }

    // Category button click listener
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentCategory = btn.getAttribute("data-category");
            filterProducts();
        });
    });

    // Purchase Dialog triggers
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("buy-btn") && e.target.id !== "confirmOrderBtn") {
            if (!currentUser) {
                alert("Please login first to purchase products!");
                // Compute redirect prefix
                const isSubPage = window.location.pathname.includes("/pages/");
                window.location.href = isSubPage ? "login.html" : "pages/login.html";
                return;
            }

            const pId = e.target.getAttribute("data-id");
            const pName = e.target.getAttribute("data-name");
            const pPrice = e.target.getAttribute("data-price");
            activeProduct = { id: pId, name: pName, price: pPrice };

            modalProductName.innerText = pName;
            modalProductPrice.innerText = `₹${pPrice}`;
            checkoutModal.style.display = "flex";
        }
    });

    // Close Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            checkoutModal.style.display = "none";
            activeProduct = null;
        });
    }

    // Background Click Close
    window.addEventListener("click", (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.style.display = "none";
            activeProduct = null;
        }
    });

    const productLinks = {
        "lettuce-seeds": "https://www.amazon.in/s?k=lettuce+seeds+hydroponics",
        "tomato-seeds": "https://www.amazon.in/s?k=cherry+tomato+seeds+hydroponics",
        "nutrient-ab": "https://www.amazon.in/s?k=NPK+hydroponic+nutrient+A%2BB",
        "dwc-kit": "https://www.amazon.in/s?k=Citygreens+DWC+hydroponic+kit",
        "ph-meter": "https://www.amazon.in/s?k=digital+water+pH+TDS+meter",
        "water-pump": "https://www.amazon.in/s?k=18W+submersible+water+pump",
        "clay-pebbles": "https://www.amazon.in/s?k=expanded+clay+pebbles+hydroton",
        "basil-seeds": "https://www.amazon.in/s?k=aromatic+basil+seeds+premium",
        "dosing-pump": "https://www.amazon.in/s?k=automatic+liquid+dosing+pump+hydroponics"
    };

    // Confirm Order & Redirect
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener("click", () => {
            if (activeProduct && currentUser) {
                const orderId = "HL-" + Math.floor(1000 + Math.random() * 9000);
                const orderDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

                const newOrder = {
                    id: orderId,
                    name: activeProduct.name,
                    price: activeProduct.price,
                    date: orderDate,
                    address: "External Redirection (Amazon/Flipkart)",
                    status: "Redirected"
                };

                // Save to LocalStorage
                const storageKey = `orders_${currentUser.email}`;
                const currentOrders = JSON.parse(localStorage.getItem(storageKey)) || [];
                currentOrders.push(newOrder);
                localStorage.setItem(storageKey, JSON.stringify(currentOrders));

                const link = productLinks[activeProduct.id] || "https://www.amazon.in/";
                alert("Redirecting to the partner store to complete your purchase! The order has been logged in your dashboard.");
                window.open(link, "_blank");

                checkoutModal.style.display = "none";
                activeProduct = null;
            }
        });
    }
});