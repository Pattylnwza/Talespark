// ==========================================
// 1. Firebase Import CDN
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
// 3. Player ID & Global Variables & Audio Setup
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get('id') || localStorage.getItem("currentPlayerId");

let playerName = "ผู้เล่น"; 

/* =====================================================
   GAME SETTINGS
===================================================== */
const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;
const GAME_TIME = 60;
const TOTAL_CANDIES = 10;

/* =====================================================
   GAME VARIABLES
===================================================== */
let timeLeft = GAME_TIME;
let differenceScore = 0;
let timerInterval = null;
let gameRunning = false;

// 🔊 ประกาศตัวแปรเสียงเอฟเฟกต์
const correctSound = new Audio('./sounds/correct.mp3'); 
correctSound.volume = 0.2;

const wrongSound = new Audio('./sounds/wrong.mp3');
wrongSound.volume = 0.2;

// 🎶 ประกาศตัวแปรเพลง BGM (ชื่อไฟล์ bgmtime.mp3) พร้อมตั้งค่า Loop และลดเสียง
const bgm = new Audio('./sounds/bgmtime.mp3');
bgm.loop = true;  // เล่นวนซ้ำไปเรื่อย ๆ จนกว่าจะจบเกมหรือเปลี่ยนหน้า
bgm.volume = 0.2; // ลดเสียงลงเหลือ 20% เพื่อไม่ให้กลบเสียงเอฟเฟกต์

const yaysound = new Audio('./sounds/yaysound.mp3'); 
yaysound.volume = 0.2;
yaysound.load(); // สั่งโหลดไฟล์เสียงล่วงหน้า ป้องกันปัญหาเสียงไม่เล่นเมื่อชนะเกม

/* =====================================================
   DOM
===================================================== */
const stage = document.getElementById("stage");
const timerNumber = document.getElementById("timerNumber");
const timerBarFill = document.getElementById("timerBarFill");
const candyCountNumber = document.getElementById("candyCountNumber");
const differenceField = document.getElementById("differenceField");
const differenceHotspots = document.querySelectorAll(".difference-hotspot");
const gameOver = document.getElementById("gameOver");
const gameOverTitle = document.getElementById("gameOverTitle");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");
const goToChapter3 = document.getElementById("goToChapter3");

const collectedCandySlots = [];
for (let i = 1; i <= TOTAL_CANDIES; i++) {
    collectedCandySlots.push(document.getElementById("candy" + i));
}

// ==========================================
// 4. Load Player Data from Firebase Logic
// ==========================================
async function loadPlayerData() {
    if (!playerId) {
        console.warn("⚠️ ไม่พบ Player ID ใน URL ใช้ชื่อเริ่มต้น:", playerName);
        return;
    }

    try {
        const playerRef = doc(db, "players", playerId);
        const playerSnap = await getDoc(playerRef);

        if (playerSnap.exists()) {
            const data = playerSnap.data();
            playerName = data.name || data.playerName || "ผู้เล่น";
            console.log("✅ ดึงข้อมูลผู้เล่นสำเร็จ:", playerName);
        } else {
            console.error("❌ ไม่พบข้อมูลผู้เล่นใน Firestore สำหรับ ID:", playerId);
        }
    } catch (error) {
        console.error("🔥 เกิดข้อผิดพลาดในการดึงข้อมูลผู้เล่น:", error);
    }
}

// ==========================================
// 5. Save Score Function (บันทึกลง score_minigame2)
// ==========================================
export async function saveScore(score) {
    if (!playerId) {
        console.error("❌ ไม่พบ Player ID ไม่สามารถบันทึกคะแนนได้");
        return;
    }

    try {
        const playerRef = doc(db, "players", playerId);
        await updateDoc(playerRef, {
            score_minigame2: score,
            updatedAt: new Date()
        });
        console.log("✅ บันทึกคะแนนมินิเกม 2 สำเร็จ:", score);
    } catch (error) {
        console.error("🔥 เกิดข้อผิดพลาดในการบันทึกคะแนน:", error);
    }
}

/* =====================================================
   SCALE GAME
===================================================== */
function resizeGame() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const scaleX = screenWidth / GAME_WIDTH;
    const scaleY = screenHeight / GAME_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    if (stage) {
        stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
        stage.style.transformOrigin = "center center";
    }
}

/* =====================================================
   UPDATE TIMER
===================================================== */
function updateTimer() {
    timerNumber.textContent = timeLeft;
    const percent = Math.max(
        0,
        Math.min(
            100,
            (timeLeft / GAME_TIME) * 100
        )
    );
    timerBarFill.style.width = percent + "%";
}

/* =====================================================
   UPDATE SCORE
===================================================== */
function updateCandy() {
    candyCountNumber.textContent = differenceScore;
    collectedCandySlots.forEach((slot, index) => {
        if (!slot) return;
        if (index < differenceScore) {
            slot.classList.add("show");
        } else {
            slot.classList.remove("show");
        }
    });
}

/* =====================================================
   DIFFERENCE HOTSPOTS
===================================================== */
function setupDifferenceHotspots() {
    differenceHotspots.forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        !gameRunning ||
                        button.classList.contains("found")
                    ) {
                        return;
                    }

                    button.classList.add("found");
                    differenceScore++;
                    updateCandy();

                    // 🔊 เล่นเสียงเมื่อคลิกเจอจุดแตกต่างถูกต้อง
                    correctSound.currentTime = 0;
                    correctSound.play().catch(e => console.log("Audio play blocked:", e));

                    if (
                        differenceScore >=
                        TOTAL_CANDIES
                    ) {
                        endGame(true);
                    }
                }
            );
        }
    );
}

/* =====================================================
   RESET DIFFERENCE HOTSPOTS
===================================================== */
function resetDifferenceHotspots() {
    differenceHotspots.forEach(
        function (button) {
            button.classList.remove("found");
        }
    );
}

/* =====================================================
   CONFETTI
====================================================== */
function createConfetti() {
    const items = ["🍬", "🍭", "✨", "⭐", "🎉", "🍫", "🍩"];
    for (let i = 0; i < 35; i++) {
        const item = document.createElement("div");
        item.className = "confetti";
        item.textContent = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDelay = Math.random() * 1.2 + "s";
        document.body.appendChild(item);
        setTimeout(() => item.remove(), 4000);
    }
}

/* =====================================================
   END GAME
===================================================== */
function endGame(completed = false) {

    if (!gameRunning) {

        return;

    }

    gameRunning = false;

    clearInterval(timerInterval);

    timerInterval = null;

    // 🎶 🌟 [ส่วนที่เพิ่มใหม่]: หยุดเพลง BGM ทันทีเมื่อจบเกมก่อนแสดงหน้าสรุปผล    
    bgm.pause();
    bgm.currentTime = 0;

    if (!completed) {
        timeLeft = 0;
        updateTimer();
        gameOverTitle.textContent = "หมดเวลาแล้ว!";
    } else {
        gameOverTitle.textContent = `เก่งมาก คุณ${playerName}!`;

        // 🔊 🌟 [ส่วนที่เพิ่มใหม่]: เล่นเสียง yaysound เมื่อผู้เล่นหาครบทุกจุดสำเร็จ
        yaysound.currentTime = 0;
        yaysound.play().then(() => {
            console.log("🔊 เล่นเสียง yaysound สำเร็จ");
        }).catch(e => console.log("Yay sound play blocked:", e));

        // 🌟 เรียกฟังก์ชันสร้าง Confetti เฉลิมฉลอง
        createConfetti();
    }


    differenceHotspots.forEach(

        function (button) {

            button.classList.add("found");

        }

    );


    finalScore.textContent = differenceScore;

    gameOver.classList.add(

        "game-over-visible"

    );


    saveScore(differenceScore);

} 


function startGame() {
    // โค้ดเคลียร์เวลาและรีเซ็ตเกม...
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = GAME_TIME;
    differenceScore = 0;
    gameRunning = true;

    gameOver.classList.remove("game-over-visible");
    updateTimer();
    updateCandy();
    resetDifferenceHotspots();

    // 🎶 สั่งเล่นเพลงตรงนี้ (จะทำงานก็ต่อเมื่อผู้เล่นคลิกปุ่มเริ่มเกมแล้วเท่านั้น)
    bgm.currentTime = 0;
    bgm.play().catch(e => console.log("BGM play blocked:", e));

    timerInterval = setInterval(() => {
        if (!gameRunning) return;
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

/* =====================================================
   RESTART BUTTON
===================================================== */
if (restartButton) {
    restartButton.addEventListener(
        "click",
        function () {
            startGame();
        }
    );
}

/* =====================================================
   GO TO CHAPTER 3 BUTTON
===================================================== */
if (goToChapter3) {
    goToChapter3.addEventListener(
        "click",
        function () {
            // หยุดเพลง BGM เมื่อกดไปบทถัดไป (ป้องกันเสียงเพลงซ้อนกัน)
            bgm.pause();

            if (playerId) {
                window.location.href = `../Story_ch3/Story_ch3.html?id=${playerId}`;
            } else {
                window.location.href = `../Story_ch3/Story_ch3.html`;
            }
        }
    );
}

/* =====================================================
   RESIZE
===================================================== */
window.addEventListener(
    "resize",
    function () {
        resizeGame();
    }
);

/* =====================================================
   START GAME
===================================================== */
window.addEventListener("DOMContentLoaded", async () => {
    resizeGame();
    setupDifferenceHotspots();
    await loadPlayerData(); 
    startGame();
});

// ประกาศตัวแปรของปุ่มบ้าน
const homeButton = document.getElementById("homeButton");

/* =====================================================
   HOME BUTTON
===================================================== */
if (homeButton) {
    homeButton.addEventListener(
        "click",
        function () {
            // หยุดเพลง BGM เมื่อกลับหน้าหลัก
            bgm.pause();

            const mainPage = "../index.html"; 
            if (playerId) {
                window.location.href = `${mainPage}?id=${playerId}`;
            } else {
                window.location.href = `${mainPage}`;
            }
        }
    );
}