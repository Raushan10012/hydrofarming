const askBtn = document.getElementById("askBtn");
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const aiDatabase = {
    lettuce: "🥬 <strong>Lettuce:</strong> Grows best in NFT or DWC systems. Maintain pH between 5.5 and 6.5, EC between 1.2 and 1.8, and water temperature around 18-22°C. Growth cycle is 30-45 days.",
    tomato: "🍅 <strong>Tomato:</strong> High nutrient feeder. Flourishes in Dutch Buckets or DWC. Maintain pH between 6.0 and 6.5, and EC between 2.0 and 5.0. Needs support trellises and 16-18 hours of light.",
    cucumber: "🥒 <strong>Cucumber:</strong> Performs well in DWC or Drip systems. Keep pH between 5.5 and 6.0, and EC between 1.6 and 2.5. Requires vine training and matures in 50-70 days.",
    basil: "🌿 <strong>Basil:</strong> Thrives in NFT or DWC systems. Keep pH between 5.5 and 6.0, and EC between 1.0 and 1.6. Pinch top growth tips regularly to prevent premature flowering.",
    nft: "📐 <strong>NFT (Nutrient Film Technique):</strong> A popular method where a shallow stream of water containing dissolved nutrients continuously recirculates over plant roots in gullies. Ideal for leafy greens.",
    dwc: "🪣 <strong>DWC (Deep Water Culture):</strong> Roots are suspended in a large reservoir of oxygenated nutrient solution. Bubbles from an air stone keep roots healthy. Extremely beginner-friendly.",
    ph: "🧪 <strong>pH Balance:</strong> Critical for nutrient absorption. Keep pH in the 5.5–6.5 range. Out-of-bounds pH causes 'nutrient lockout' where roots cannot absorb food even if present. Use pH Up/Down to adjust.",
    ec: "⚡ <strong>EC (Electrical Conductivity):</strong> Measures the nutrient concentration. Leafy greens prefer low EC (1.0-1.6 mS/cm), while fruiting crops (tomatoes, peppers) need high nutrient density (2.0-4.0 mS/cm).",
    pest: "🐛 <strong>Pest Control:</strong> Focus on hygiene, airflow, and filtering intake vents. Treat active infestations using organic solutions like diluted Neem Oil, insecticidal soap, or insect traps.",
    cost: "💰 <strong>Setup Cost:</strong> DIY starter systems (DWC/Kratky bucket) cost about ₹1500–₹3000. Larger multi-tiered automated vertical NFT systems range from ₹5000 to ₹25000+ depending on scales.",
    water: "💧 <strong>Water Temperature:</strong> Keep water temperature between 18°C and 22°C. Hot water carries less dissolved oxygen, causing root rot (pythium) and algae growth. Cool down using fans or insulation.",
    nutrient: "🧪 <strong>Nutrients:</strong> Hydroponics uses direct minerals. Standard mixes have Macro (Nitrogen, Phosphorus, Potassium, Calcium, Magnesium) and Micro elements (Iron, Zinc, Manganese, Boron) dissolved in parts A & B."
};

const defaultResponse = "🤖 I can help you with hydroponics! Try asking about: <strong>Lettuce, Tomatoes, Cucumber, Basil, NFT, DWC, pH, EC, Pests, Setup Costs, Water, or Nutrients</strong>.";

function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement("div");
    msgDiv.className = isUser ? "user-message" : "ai-message";
    
    if (isUser) {
        msgDiv.innerText = text;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        // Typing animation effect for AI response
        msgDiv.innerHTML = "";
        chatBox.appendChild(msgDiv);
        
        let index = 0;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = text;
        const plainText = tempDiv.innerText;
        
        // For HTML formatting display it directly with a smooth fade-in
        msgDiv.innerHTML = text;
        msgDiv.style.opacity = 0;
        msgDiv.style.transition = "opacity 0.3s ease";
        setTimeout(() => {
            msgDiv.style.opacity = 1;
        }, 50);
        
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

async function handleAIQuery(queryText) {
    const cleanQuery = queryText.toLowerCase().trim();
    
    // Simulate thinking delay
    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "ai-message";
    thinkingDiv.innerHTML = "Thinking...";
    chatBox.appendChild(thinkingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    try {
        const systemPrompt = "You are HydroAI, a friendly and expert AI assistant. You specialize in hydroponics, gardening, and sustainable agriculture, but you are happy to assist with any general-knowledge, tech, or conversational questions. Be detailed, helpful, polite, and format your responses nicely using markdown bold/emojis.";
        
        // Query Puter.js AI with system prompt constraints
        const response = await puter.ai.chat([
            { role: "system", content: systemPrompt },
            { role: "user", content: queryText }
        ], {
            model: "gpt-4o-mini",
            temperature: 0.7
        });
        
        thinkingDiv.remove();
        appendMessage(response, false);
    } catch (error) {
        console.warn("Puter.js AI failed or rate limited, falling back to local engine:", error);
        
        // Local Fallback Matcher
        let fallbackResponse = "";
        for (const key in aiDatabase) {
            if (cleanQuery.includes(key)) {
                fallbackResponse = aiDatabase[key];
                break;
            }
        }
        
        if (!fallbackResponse) {
            fallbackResponse = defaultResponse;
        }
        
        setTimeout(() => {
            thinkingDiv.remove();
            appendMessage(fallbackResponse, false);
        }, 300);
    }
}

// Send input click
askBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;
    
    appendMessage(text, true);
    input.value = "";
    handleAIQuery(text);
});

// Input enter key support
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        askBtn.click();
    }
});

// Suggestion buttons click handler
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("sugg-btn")) {
        const question = e.target.innerText;
        appendMessage(question, true);
        handleAIQuery(question);
    }
});