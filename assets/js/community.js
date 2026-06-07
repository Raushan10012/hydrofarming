import { db, auth } from "./firebase.js";
import { 
  collection, 
  addDoc, 
  Timestamp, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  increment 
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

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

const postButton = document.getElementById("postBtn");
const postsList = document.getElementById("postsList");

// Publish post to Firestore
postButton.addEventListener("click", async () => {
  const postContent = document.getElementById("postContent").value;
  
  if (postContent.trim() === "") {
    alert("Write something first");
    return;
  }

  try {
    const user = auth.currentUser;
    const authorName = user ? (user.displayName || user.email) : "Anonymous";
    const authorEmail = user ? user.email : "anonymous";
    
    await addDoc(collection(db, "posts"), {
      content: postContent,
      author: authorName,
      authorEmail: authorEmail,
      createdAt: Timestamp.now(),
      likes: 0
    });
    
    alert("Post published!");
    document.getElementById("postContent").value = "";
  } catch (e) {
    alert("Error publishing post: " + e.message);
  }
});

// Setup Real-time Listener for Posts
const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));

onSnapshot(postsQuery, async (snapshot) => {
  // If Firestore collection is empty, seed Rajesh & Anita
  if (snapshot.empty) {
    try {
      await addDoc(collection(db, "posts"), {
        author: "👨‍🌾 Rajesh Kumar",
        content: "Harvested 25kg lettuce using NFT system.",
        createdAt: Timestamp.now(),
        likes: 124,
        image: "../assets/images/community1.jpg"
      });
      await addDoc(collection(db, "posts"), {
        author: "👩‍🌾 Anita Sharma",
        content: "Tomato yield increased by 30% after switching to hydroponics.",
        createdAt: Timestamp.now(),
        likes: 89,
        image: "../assets/images/community2.jpg"
      });
    } catch (e) {
      console.error("Error seeding default posts:", e);
    }
    return; // onSnapshot will trigger again after adds
  }

  postsList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const post = docSnap.data();
    const postId = docSnap.id;
    
    const postCard = document.createElement("div");
    postCard.className = "post-card";
    
    // Check if post has an image
    const imageTag = post.image ? `<img src="${post.image}" alt="Post image" style="margin-bottom:15px; width:100%; border-radius:12px; aspect-ratio:16/9; object-fit:cover;">` : "";

    const safeAuthor = escapeHTML(post.author || "Anonymous");
    const safeContent = escapeHTML(post.content);

    postCard.innerHTML = `
      <h3>${safeAuthor}</h3>
      ${imageTag}
      <p style="margin: 15px 0; font-size:16px; line-height:1.5;">${safeContent}</p>
      <div class="post-footer" style="display:flex; align-items:center; gap:20px; font-weight:600; color:#2e7d32;">
        <button class="like-btn" data-id="${postId}" style="background:none; border:none; color:#2e7d32; font-weight:600; cursor:pointer; font-size:15px; display:flex; align-items:center; gap:5px; padding:0;">
          ❤️ <span class="like-count">${post.likes || 0}</span> Likes
        </button>
        <span style="color:#6B7280; font-weight:normal; font-size:14px;">• 💬 ${post.commentsCount || 0} Comments</span>
      </div>
    `;
    postsList.appendChild(postCard);
  });
});

// Event delegation for like buttons
document.addEventListener("click", async (e) => {
  const likeBtn = e.target.closest(".like-btn");
  if (likeBtn) {
    const postId = likeBtn.getAttribute("data-id");
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, {
        likes: increment(1)
      });
    } catch (err) {
      console.error("Error incrementing likes:", err);
    }
  }
});