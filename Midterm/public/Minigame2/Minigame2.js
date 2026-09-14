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
// 3. Player ID & Global Variables
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
const goToChapter3 = document.getElementById("goToChapter3"); // เปลี่ยนมารับค่าตาม ID ใน HTML ของคุณ

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
   Design Resolution 1920 x 1080
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
   END GAME
===================================================== */
function endGame(completed = false) {
    if (!gameRunning) {
        return;
    }

    gameRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;

    if (!completed) {
        timeLeft = 0;
        updateTimer();
    }

    if (completed) {
        gameOverTitle.textContent = `เก่งมาก คุณ${playerName}!`;
    } else {
        gameOverTitle.textContent = "หมดเวลาแล้ว!";
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
    clearInterval(timerInterval);
    timerInterval = null;

    timeLeft = GAME_TIME;
    differenceScore = 0;
    gameRunning = true;

    gameOver.classList.remove(
        "game-over-visible"
    );

    updateTimer();
    updateCandy();
    resetDifferenceHotspots();

    timerInterval = setInterval(
        function () {
            if (!gameRunning) {
                return;
            }

            timeLeft--;
            updateTimer();

            if (
                timeLeft <= 0
            ) {
                endGame();
            }
        },
        1000
    );
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
   GO TO CHAPTER 3 BUTTON (ไปหน้า Comingsoon.html พร้อมส่ง id)
===================================================== */
if (goToChapter3) {
    goToChapter3.addEventListener(
        "click",
        function () {
            if (playerId) {
                window.location.href = `../Comingsoon.html?id=${playerId}`;
            } else {
                window.location.href = `../Comingsoon.html`;
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
   HOME BUTTON (กลับหน้าหลัก พร้อมส่ง id)
===================================================== */
if (homeButton) {
    homeButton.addEventListener(
        "click",
        function () {
            // ปรับชื่อไฟล์ 'index.html' หรือ 'Main.html' เป็นชื่อหน้าแรกของคุณจริง ๆ ได้เลยครับ
            const mainPage = "../index.html"; 
            
            if (playerId) {
                window.location.href = `${mainPage}?id=${playerId}`;
            } else {
                window.location.href = `${mainPage}`;
            }
        }
    );
}