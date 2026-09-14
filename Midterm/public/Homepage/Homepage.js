// ==========================================
// 1. Firebase Import CDN
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// ==========================================
// 2. Firebase Config
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyDKY05pVezUBqNpw23_csKgRKFMK5Ri3qk",
  authDomain: "talespark-5b3a3.firebaseapp.com",
  databaseURL: "https://talespark-5b3a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "talespark-5b3a3",
  storageBucket: "talespark-5b3a3.firebasestorage.app",
  messagingSenderId: "38618612317",
  appId: "1:38618612317:web:23cf7a95bf262f83c403b4",
  measurementId: "G-2ZKG2NXC59"
};

// ==========================================
// 3. Initialize Firebase
// ==========================================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// 4. Save Player and Start Game Function
// ==========================================
export async function savePlayerAndStart() {
  const nameInput = document.getElementById("playerNameInput") || 
                    document.getElementById("playerName") || 
                    document.querySelector("input[type='text']");
  
  const playerName = nameInput ? nameInput.value.trim() : "ผู้เล่น";

  try {
    const docRef = await addDoc(collection(db, "players"), {
      name: playerName !== "" ? playerName : "ผู้เล่น",
      joinedAt: new Date(),
      score_minigame1: 0,
      score_minigame2: 0
    });
    
    console.log("บันทึกข้อมูลผู้เล่นสำเร็จ! ID:", docRef.id);
    
    // 👉 บันทึกสำรองไว้ในเบราว์เซอร์กันเหนียว
    localStorage.setItem("currentPlayerId", docRef.id);
    
    // สั่งย้ายหน้าพร้อมแนบ URL
    window.location.href = `Minigame1/Minigame1.html?id=${docRef.id}`;

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
  }
}
window.savePlayerAndStart = savePlayerAndStart;