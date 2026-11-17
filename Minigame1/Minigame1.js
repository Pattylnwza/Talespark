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
let currentQuestion = 0;
let questionResults = new Array(10).fill(null);
let userAnswers = new Array(10).fill(null);

// 🔊 ประกาศตัวแปรเสียงเอฟเฟกต์ (อ้างอิงจากโฟลเดอร์ sounds)
const correctSound = new Audio('./sounds/correct.mp3'); 
correctSound.volume = 0.2;

const wrongSound = new Audio('./sounds/wrong.mp3');
wrongSound.volume = 0.2;

// 🎶 ประกาศตัวแปรเพลง BGM (ชื่อไฟล์ bgm.mp3) พร้อมตั้งค่า Loop และลดเสียง
const bgm = new Audio('./sounds/bgm.mp3');
bgm.loop = true;  // เล่นวนซ้ำไปเรื่อย ๆ จนกว่าจะจบเกมหรือเปลี่ยนหน้า
bgm.volume = 0.2; // ลดเสียงลงเหลือ 20% เพื่อไม่ให้กลบเสียงเอฟเฟกต์อื่น

// 🌟 [ส่วนที่เพิ่มใหม่]: ประกาศตัวแปรเสียง yaysound พร้อมสั่ง Preload โหลดเสียงล่วงหน้า
const yaysound = new Audio('./sounds/yaysound.mp3');
yaysound.volume = 0.2;
yaysound.load(); // สั่งโหลดไฟล์เสียงเตรียมไว้ล่วงหน้า

// DOM Elements
let startScreen, welcomePlayerText, startBtn, questionTitle, questionText, answers, feedback, nextButton, prevButton, stoneNumber, bagStones, success, resultTitle, resultText;

// ==========================================
// 4. Load Player Data from Firebase Logic
// ==========================================
async function loadPlayerData() {
  if (!playerId) {
    console.warn("⚠️ ไม่พบ Player ID ใน URL ใช้ชื่อเริ่มต้น:", playerName);
    if (welcomePlayerText) welcomePlayerText.textContent = `ยินดีต้อนรับ คุณ${playerName}`;
    return;
  }

  try {
    const playerRef = doc(db, "players", playerId);
    const playerSnap = await getDoc(playerRef);

    if (playerSnap.exists()) {
      const data = playerSnap.data();
      playerName = data.name || data.playerName || "ผู้เล่น";
      console.log("✅ ดึงข้อมูลผู้เล่นสำเร็จ:", playerName);
      
      if (welcomePlayerText) {
        welcomePlayerText.textContent = `ยินดีต้อนรับ คุณ${playerName}!`;
      }
    } else {
      console.error("❌ ไม่พบข้อมูลผู้เล่นใน Firestore สำหรับ ID:", playerId);
    }
  } catch (error) {
    console.error("🔥 เกิดข้อผิดพลาดในการดึงข้อมูลผู้เล่น:", error);
  }
}

// ==========================================
// 5. Save Score Function
// ==========================================
export async function saveScore(score) {
  if (!playerId) {
    console.error("❌ ไม่พบ Player ID ใน URL ไม่สามารถบันทึกคะแนนได้");
    return;
  }

  try {
    const playerRef = doc(db, "players", playerId);
    await updateDoc(playerRef, {
      score_minigame1: score,
      updatedAt: new Date()
    });
    console.log("✅ บันทึกคะแนนสำเร็จ:", score);
  } catch (error) {
    console.error("🔥 เกิดข้อผิดพลาดในการบันทึกคะแนน:", error);
  }
}

// ==========================================
// 6. Questions Data
// ==========================================
const questions = [
    { title: "--- ข้อที่ 1 / 10 --- ", text: "🍎🍎🍎🍎🍎<br><br>มีแอปเปิลกี่ลูก?", answers: ["4 (Four)", "5 (Five)", "6 (Six)", "7 (Seven)"], correctIndex: 1 },
    { title: "--- ข้อที่ 2 / 10 --- ", text: "🪨🪨🪨 + 🪨🪨<br><br>มีหินทั้งหมดกี่ก้อน?", answers: ["4 (Four)", "5 (Five)", "6 (Six)", "7 (Seven)"], correctIndex: 1 },
    { title: "--- ข้อที่ 3 / 10 --- ", text: "ฮันเซลมีลูกอม 5 เม็ด<br>เกรเทลให้เพิ่มอีก 3 เม็ด<br>ฮันเซลมีลูกอมทั้งหมดกี่เม็ด?", answers: ["6 (Six)", "7 (Seven)", "8 (Eight)", "9 (Nine)"], correctIndex: 2 },
    { title: "--- ข้อที่ 4 / 10 --- ", text: "7 + 6 = ?", answers: ["11 (Eleven)", "12 (Twelve)", "13 (Thirteen)", "14 (Fourteen)"], correctIndex: 2 },
    { title: "--- ข้อที่ 5 / 10 --- ", text: "ฮันเซลมีลูกอม 8 เม็ด<br>กินไป 3 เม็ด<br>เหลือกี่เม็ด?", answers: ["4 (Four)", "5 (Five)", "6 (Six)", "7 (Seven)"], correctIndex: 1 },
    { title: "--- ข้อที่ 6 / 10 --- ", text: "15 − 8 = ?", answers: ["6 (Six)", "7 (Seven)", "8 (Eight)", "9 (Nine)"], correctIndex: 1 },
    { title: "--- ข้อที่ 7 / 10 --- ", text: "เรียงก้อนหินจากน้อยไปมาก<br>4, 6, 8, __ ก้อน<br>จำนวนที่หายไปคือเท่าไร?", answers: ["8 (Eight)", "9 (Nine)", "10 (Ten)", "11 (Eleven)"], correctIndex: 2 },
    { title: "--- ข้อที่ 8 / 10 --- ", text: "🐦🐦🐦🐦🐦 มีนก 5 ตัว<br>และ 🦋🦋🦋 มีผีเสื้อ 3 ตัว<br>นกมากกว่าผีเสื้อกี่ตัว?", answers: ["1 (One)", "2 (Two)", "3 (Three)", "4 (Four)"], correctIndex: 1 },
    { title: "--- ข้อที่ 9 / 10 --- ", text: "มีหิน 7 ก้อน<br>เก็บเพิ่มอีก 5 ก้อน<br>ตอนนี้มีหินทั้งหมดกี่ก้อน?", answers: ["10 (Ten)", "11 (Eleven)", "12 (Twelve)", "13 (Thirteen)"], correctIndex: 2 },
    { title: "--- ข้อที่ 10 / 10 --- ", text: "🪨🪨🪨🪨🪨🪨🪨🪨<br>มีหิน 8 ก้อน แบ่งให้เด็ก 2 คนเท่า ๆ กัน แต่ละคนได้กี่ก้อน?", answers: ["2 (Two)", "3 (Three)", "4 (Four)", "5 (Five)"], correctIndex: 2 }
];

// ==========================================
// 7. Core Functions & Event Listeners
// ==========================================
window.addEventListener("DOMContentLoaded", async () => {
    startScreen = document.getElementById("startScreen");
    welcomePlayerText = document.getElementById("welcomePlayerText");
    startBtn = document.getElementById("startBtn");
    questionTitle = document.getElementById("questionTitle");
    questionText = document.getElementById("questionText");
    answers = document.getElementById("answers");
    feedback = document.getElementById("feedback");
    nextButton = document.getElementById("nextButton");
    prevButton = document.getElementById("prevButton");
    stoneNumber = document.getElementById("stoneNumber");
    bagStones = document.querySelectorAll(".bagStone");
    success = document.getElementById("success");
    resultTitle = document.getElementById("resultTitle");
    resultText = document.getElementById("resultText");

    updateStoneCounter();
    await loadPlayerData();
});

function startGame() {
    if (startScreen) startScreen.style.display = "none";
    resetGame();
    showQuestion(0);

    // 🎶 สั่งให้เพลง BGM เริ่มเล่นเมื่อกดเริ่มเกม
    bgm.currentTime = 0;
    bgm.play().catch(e => console.log("BGM play blocked:", e));
}

function resetGame() {
    currentQuestion = 0;
    questionResults = new Array(10).fill(null);
    userAnswers = new Array(10).fill(null);
    if (success) success.style.display = "none";
    updateStoneCounter();
}

function updateStoneCounter() {
    if (!stoneNumber) return;
    const stonesCollected = questionResults.filter(val => val === true).length;
    stoneNumber.textContent = stonesCollected;

    bagStones.forEach((stone, index) => {
        if (index < stonesCollected) {
            stone.classList.remove("hidden");
        } else {
            stone.classList.add("hidden");
        }
    });
}

function showQuestion(index) {
    currentQuestion = index;
    const question = questions[index];

    questionTitle.innerHTML = question.title;
    questionText.innerHTML = question.text;
    feedback.innerHTML = "";
    feedback.className = "";
    answers.innerHTML = "";

    if (prevButton) {
        prevButton.style.display = currentQuestion > 0 ? "block" : "none";
    }

    if (nextButton) {
        nextButton.style.display = questionResults[currentQuestion] !== null ? "block" : "none";
        nextButton.textContent = (currentQuestion === questions.length - 1) ? "ดูผลสรุป ➜" : "⭢";
    }

    question.answers.forEach((answerValue, choiceIndex) => {
        const button = document.createElement("button");
        button.className = "answer";
        button.textContent = answerValue;

        if (questionResults[currentQuestion] !== null) {
            button.disabled = true;
            if (choiceIndex === question.correctIndex) {
                  button.classList.add("selected-correct");
            } else if (choiceIndex === userAnswers[currentQuestion]) {
                  button.classList.add("selected-wrong");
            }
        } else {
            button.onclick = function() { checkAnswer(choiceIndex, button); };
        }
        
        answers.appendChild(button);
    });

    if (questionResults[currentQuestion] === true) {
        feedback.className = "correct";
        feedback.innerHTML = "🎉 ตอบถูกต้อง! ได้รับก้อนหินเรืองแสง 🪨";
    } else if (questionResults[currentQuestion] === false) {
        feedback.className = "wrong";
        feedback.innerHTML = "❌ ข้อนี้ตอบไม่ถูกต้อง";
    }
}

function checkAnswer(choiceIndex, clickedButton) {
    const question = questions[currentQuestion];
    userAnswers[currentQuestion] = choiceIndex;

    const buttons = answers.querySelectorAll(".answer");
    buttons.forEach(btn => btn.disabled = true);

    if (choiceIndex === question.correctIndex) {
        questionResults[currentQuestion] = true;
        clickedButton.classList.add("selected-correct");
        feedback.className = "correct";
        feedback.innerHTML = "🎉 ถูกต้อง! ได้รับก้อนหินเรืองแสง +1 🪨";
        
        // 🔊 เล่นเสียงตอบถูก
        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.log("Audio play blocked:", e));

        updateStoneCounter();
    } else {
        questionResults[currentQuestion] = false;
        clickedButton.classList.add("selected-wrong");
        feedback.className = "wrong";
        feedback.innerHTML = "❌ ตอบไม่ถูกต้อง!";
        
        // 🔊 เล่นเสียงตอบผิด
        wrongSound.currentTime = 0;
        wrongSound.play().catch(e => console.log("Audio play blocked:", e));
    }

    if (nextButton) nextButton.style.display = "block";
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        showSuccess();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

function showSuccess() {
    const totalStones = questionResults.filter(val => val === true).length;

    // 🎶 1. หยุดเพลง BGM ทันทีเมื่อแสดงหน้าผลสรุป
    bgm.pause();
    bgm.currentTime = 0;

    // 🔊 2. เล่นเสียง yaysound เฉลิมฉลอง
    yaysound.currentTime = 0;
    yaysound.play().then(() => {
        console.log("🔊 เล่นเสียง yaysound สำเร็จ");
    }).catch(e => console.log("Yay sound play blocked:", e));
    
    if (resultTitle) {
        resultTitle.textContent = totalStones >= 7 ? `เก่งมากคุณ ${playerName}!` : `พยายามอีกนิดนะคุณ ${playerName}!`;
    }
    
    if (resultText) {
        resultText.innerHTML = `ผู้เล่น: <b>${playerName}</b><br>ตอบถูกทั้งหมด <b>${totalStones} / 10</b> ข้อ<br>สะสมก้อนหินเรืองแสงได้ <b>${totalStones}</b> ก้อน`;
    }

    if (success) success.style.display = "flex";
    createConfetti();

    saveScore(totalStones);
}

function createConfetti() {
    const items = ["🎉", "⭐", "✨", "🪨", "🍀"];
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

// ==========================================
// 8. Action Buttons & Window Bindings
// ==========================================
function playAgain() {
    if (success) success.style.display = "none";
    resetGame();
    showQuestion(0);
}

function goToChapter2() {
    if (playerId) {
        window.location.href = `../Story_ch2/Story_ch2.html?id=${playerId}`;
    } else {
        window.location.href = `../Story_ch2/Story_ch2.html`;
    }
}

function goToHome() {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id') || localStorage.getItem("currentPlayerId");
    const mainPage = "../index.html"; 

    if (playerId) {
        window.location.href = `${mainPage}?id=${playerId}`;
    } else {
        window.location.href = `${mainPage}`;
    }
}

const homeButton = document.getElementById("homeButton");
if (homeButton) {
    homeButton.addEventListener("click", goToHome);
}

window.startGame = startGame;
window.playAgain = playAgain;
window.goToChapter2 = goToChapter2;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;