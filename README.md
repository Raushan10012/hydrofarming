# 👨‍🌾 HydroLearn - Smart Hydroponics Learning & Marketplace Platform

**HydroLearn** is a premium, client-side web application designed to empower urban farmers, hobbyists, and commercial growers to learn, share, and purchase equipment for soil-less hydroponic farming. The platform features an AI chatbot assistant, interactive growth checklists, a simulated marketplace, real-time translations, accessibility tools, and a community learning hub.

---

## 🚀 Key Features

*   🤖 **HydroAI Chatbot Assistant:** Powered by Puter.js (`gpt-4o-mini`), HydroAI provides expert guidance on hydroponics, gardening, and crop management, answering any general or conversational queries with emojis and rich formatting.
*   🥬 **Interactive Crop Guides:** Detailed growth walkthroughs and checklist tracking for beginner-friendly crops like **Lettuce, Tomatoes, Cucumbers, and Basil** to track pH, EC, and daily care.
*   🛒 **Simulated Marketplace:** Search, filter, and browse key hydroponic tools (NFT systems, nutrients, seeds, meters). Includes purchase confirmation modals, local storage order logging, and direct links to Amazon search results.
*   🌐 **Multi-Language Support:** Instant, real-time toggle between **English and Hindi** across the entire application interface.
*   ♿ **Accessibility Controls:** Built-in dynamic font-size scaling and high-contrast toggle mode to ensure usability for all users.
*   🎥 **Interactive Video Lightbox:** Premium hero section with smooth looping background video and a native lightbox modal for watching educational demo videos streamed from a high-speed CDN.
*   🔒 **Secure Firebase Authentication:** Signup, login, and dynamic dashboard profiles with session-only state persistence (automatically logs the user out when the browser tab closes).
*   💬 **Community Learning Hub:** A simulated forum feed allowing users to share posts, crop yields, and agricultural questions.

---

## 🛠️ Tech Stack

*   **Core Structure:** HTML5 (Semantic elements & SEO optimized)
*   **Styling (CSS):** Vanilla CSS3 (Modern variables, HSL color system, fully responsive layouts, glassmorphism UI)
*   **Logic (JS):** Modern ES6 JavaScript Modules
*   **Services:** Firebase Authentication (SDK v12), Puter.js AI completions

---

## 💻 Local Setup & Development

Since the project is entirely client-side, you can run it locally with any static web server:

1. Clone or download the repository folder.
2. Run a local static server inside the directory:
    ```bash
    # Using Node.js
    npx http-server -p 3000
    
    # Or using Python
    python -m http.server 3000
    ```
3. Open your browser and navigate to `http://localhost:3000`.

---

## 🌐 Deployment

This project is built to run entirely in the browser (static frontend), making it fully compatible with free hosting providers:
*   **GitHub Pages:** Enable under Settings -> Pages of your repository.
*   **Vercel / Netlify:** Drag and drop the directory for instant hosting.
