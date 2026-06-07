// Unified Navigation and Footer Helper for HydroLearn
document.addEventListener("DOMContentLoaded", () => {
    // 1. Highlight active navbar link dynamically
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");
    
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        // Check if current page matches the link destination
        if (currentPath.endsWith(href) || 
            (href === "./index.html" && (currentPath.endsWith("/") || currentPath.endsWith("index.html"))) ||
            (href === "../index.html" && currentPath.endsWith("index.html") && !currentPath.includes("pages/"))) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // 2. Dynamic footer injection
    if (!document.querySelector(".footer") && !document.querySelector("footer")) {
        const footer = document.createElement("footer");
        footer.className = "footer";
        
        // Determine path prefix to assets
        const isSubPage = currentPath.includes("/pages/");
        const pathPrefix = isSubPage ? "../" : "";
        
        footer.innerHTML = `
            <div style="max-width: 1200px; margin: auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; text-align: left; padding: 50px 20px;">
                <div>
                    <h3 style="color: #66BB6A; margin-bottom: 20px; font-size: 22px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                        👨‍🌾 HydroLearn
                    </h3>
                    <p style="color: #94A3B8; font-size: 14.5px; line-height: 1.6; margin: 0;">
                        Empowering urban farmers, hobbyists, and commercial growers to produce fresh, sustainable food using advanced, soil-less hydroponics technology.
                    </p>
                </div>
                <div>
                    <h4 style="color: white; margin-bottom: 20px; font-size: 16px; font-weight: 600;">Quick Links</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; line-height: 2.2;">
                        <li><a href="${pathPrefix}index.html" style="color: #94A3B8; transition: 0.2s; font-size: 14.5px;">Home</a></li>
                        <li><a href="${pathPrefix}pages/learn.html" style="color: #94A3B8; transition: 0.2s; font-size: 14.5px;">Learning Hub</a></li>
                        <li><a href="${pathPrefix}pages/crops.html" style="color: #94A3B8; transition: 0.2s; font-size: 14.5px;">Crop Guide</a></li>
                        <li><a href="${pathPrefix}pages/marketplace.html" style="color: #94A3B8; transition: 0.2s; font-size: 14.5px;">Marketplace</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style="color: white; margin-bottom: 20px; font-size: 16px; font-weight: 600;">Support & Contact</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; line-height: 2.2;">
                        <li><a href="${pathPrefix}pages/contact.html" style="color: #94A3B8; transition: 0.2s; font-size: 14.5px;">Contact Us</a></li>
                        <li><a href="${pathPrefix}pages/hydroai.html" style="color: #94A3B8; transition: 0.2s; font-size: 14.5px;">HydroAI Support</a></li>
                        <li><span style="color: #94A3B8; font-size: 14.5px;">Email: support@hydrolearn.com</span></li>
                        <li><span style="color: #94A3B8; font-size: 14.5px;">Phone: +91 9334567890</span></li>
                    </ul>
                </div>
            </div>
            <div style="border-top: 1px solid #2D3748; padding: 30px 20px; color: #94A3B8; font-size: 14px; max-width: 1200px; margin: auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <span>&copy; 2026 HydroLearn Platform. All rights reserved.</span>
                <div style="display: flex; gap: 20px;">
                    <a href="#" style="color: #94A3B8; transition: 0.2s;">Privacy Policy</a>
                    <a href="#" style="color: #94A3B8; transition: 0.2s;">Terms of Service</a>
                </div>
            </div>
        `;
        
        // CSS properties for footer class
        footer.style.background = "#1A202C";
        footer.style.color = "white";
        footer.style.padding = "30px 0";
        footer.style.marginTop = "60px";
        footer.style.borderTop = "4px solid #2e7d32";
        
        document.body.appendChild(footer);
    }
});
