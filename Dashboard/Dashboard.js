// ==========================================
// 1. Firebase Import CDN
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// ==========================================
// 2. Firebase Config
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyDKY05pVezUBqNpw23_csKgRKFMK5Ri3qk",
  authDomain: "talespark-5b3a3.firebaseapp.com",
  projectId: "talespark-5b3a3",
  storageBucket: "talespark-5b3a3.firebasestorage.app",
  messagingSenderId: "38618612317",
  appId: "1:38618612317:web:23cf7a95bf262f83c403b4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// 3. Get Player ID
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get('id') || localStorage.getItem("currentPlayerId");

// ==========================================
// 4. Load Dashboard Data from Firestore
// ==========================================
async function loadDashboardData() {
  if (!playerId) {
    console.warn("⚠️ ไม่พบ Player ID ใน URL หรือ LocalStorage");
    const playerNameElem = document.getElementById("playerNameText");
    if (playerNameElem) playerNameElem.textContent = "ของคุณ (ไม่พบผู้เล่น)";
    return;
  }

  try {
    const playerRef = doc(db, "players", playerId);
    const playerSnap = await getDoc(playerRef);

    if (playerSnap.exists()) {
      const data = playerSnap.data();
      const playerName = data.name || data.playerName || "ผู้เล่น";

      // ดึงคะแนนแต่ละมินิเกม
      const score1 = data.score_minigame1 ?? 0;
      const score2 = data.score_minigame2 ?? 0;
      const score3 = data.score_minigame3 ?? 0;
      const score4 = data.score_minigame4 ?? 0;

      // คำนวณคะแนนเฉลี่ยรวม
      const totalScore = score1 + score2 + score3 + score4;
      const averageScore = (totalScore / 4).toFixed(2);

      // อัปเดตข้อมูลลงในหน้า HTML
      const nameElem = document.getElementById("playerNameText");
      const s1Elem = document.getElementById("score1");
      const s2Elem = document.getElementById("score2");
      const s3Elem = document.getElementById("score3");
      const s4Elem = document.getElementById("score4");
      const avgElem = document.getElementById("avgScoreText");

      if (nameElem) nameElem.textContent = `ของคุณ ${playerName}`;
      if (s1Elem) s1Elem.textContent = `${score1}/10`;
      if (s2Elem) s2Elem.textContent = `${score2}/10`;
      if (s3Elem) s3Elem.textContent = `${score3}/10`;
      if (s4Elem) s4Elem.textContent = `${score4}/10`;
      if (avgElem) avgElem.textContent = `🌟คะแนนรวมเฉลี่ย: ${averageScore}/10🌟`;

      console.log("✅ โหลดข้อมูลแดชบอร์ดสำเร็จ");
    } else {
      console.error("❌ ไม่พบข้อมูลผู้เล่นใน Firestore สำหรับ ID:", playerId);
    }
  } catch (error) {
    console.error("🔥 เกิดข้อผิดพลาดในการดึงข้อมูลแดชบอร์ด:", error);
  }
}

// ==========================================
// 5. Emoji Rain & Sound Effect
// ==========================================
function startEmojiRain() {
    // 🎵 1. เล่นเสียงเฮ (Yay Sound)
    const yaySound = new Audio('./sounds/yaysound.mp3');
    yaySound.volume = 0.2; 
    yaySound.play().catch(error => {
        console.log("⚠️ เบราว์เซอร์บล็อกเสียง Yay:", error);
    });

    // 🎵 2. เล่นเสียงปรบมือ (Clapping Sound) ซ้อนขึ้นมาพร้อมกัน
    const clappingSound = new Audio('./sounds/clappingsound.mp3');
    clappingSound.volume = 0.2; // ปรับระดับความดังได้ตามต้องการ (0.0 - 1.0)
    clappingSound.play().catch(error => {
        console.log("⚠️ เบราว์เซอร์บล็อกเสียงปรบมือ:", error);
    });

    const emojis = ['🎉', '🌟', '🏆', '🎊', '✨', '💖', '🔥'];
    const container = document.getElementById('emoji-container');
    if (!container) return;

    const rainInterval = setInterval(() => {
        const emoji = document.createElement('div');
        emoji.classList.add('falling-emoji');
        
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (Math.random() * 3 + 3.5) + 's';
        emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        container.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 3000);
    }, 100);

    // หยุดสร้างอีโมจิเพิ่มหลังผ่านไป 2.5 วินาที
    setTimeout(() => {
        clearInterval(rainInterval);
    }, 2500); 
}

// ==========================================
// 6. Navigation & Event Listeners
// ==========================================
function goToHome() {
    const currentUrlParams = new URLSearchParams(window.location.search);
    const currentPlayerId = currentUrlParams.get('id') || localStorage.getItem("currentPlayerId");
    const mainPage = "../index.html"; 

    if (currentPlayerId) {
        window.location.href = `${mainPage}?id=${currentPlayerId}`;
    } else {
        window.location.href = `${mainPage}`;
    }
}

const homeButton = document.getElementById("homeButton");
if (homeButton) {
    homeButton.addEventListener("click", goToHome);
}

// โหลดข้อมูลและเริ่มเอฟเฟกต์เมื่อหน้าเว็บพร้อม
if (document.readyState === 'loading') {
    window.addEventListener("DOMContentLoaded", () => {
        loadDashboardData();
        startEmojiRain();
    });
} else {
    loadDashboardData();
    startEmojiRain();
}