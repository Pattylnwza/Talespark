// ==========================================
// 1. Firebase Import CDN
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

const keyOutBubble = document.getElementById("keyOutBubble");
const bubbleRestartButton = document.getElementById("bubbleRestartButton");

let playerName = "ผู้เล่น"; 

const correctSound = new Audio('./sounds/correct.mp3'); 
correctSound.volume = 0.2;

const wrongSound = new Audio('./sounds/wrong.mp3');
wrongSound.volume = 0.2;

const bgm = new Audio('./sounds/bgm.mp3');
const winkSound = new Audio('./sounds/wink.mp3');
bgm.loop = true;
bgm.volume = 0.2;

const yaysound = new Audio('./sounds/yaysound.mp3'); // สามารถเปลี่ยนชื่อไฟล์ตรงนี้เป็น ./sounds/yaysound.mp3 ได้ตามไฟล์จริงของคุณ
yaysound.volume = 0.2;
yaysound.load(); // บังคับโหลดไฟล์เสียงล่วงหน้า ป้องกันเสียงไม่เล่นตอนจบเกม


const questions = [
    [
        { emoji: "🍎", label: "Apple" },
        { emoji: "⭐", label: "Star" },
        { emoji: "🐱", label: "Cat" },
        { emoji: "🌙", label: "Moon" }
    ],
    [
        { emoji: "🐶", label: "Dog" },
        { emoji: "🍌", label: "Banana" },
        { emoji: "☀️", label: "Sun" },
        { emoji: "🐟", label: "Fish" }
    ],
    [
        { emoji: "🌸", label: "Flower" },
        { emoji: "🚗", label: "Car" },
        { emoji: "🥧", label: "Pie" },
        { emoji: "🐰", label: "Bunny" },
        { emoji: "🎈", label: "Balloon" }
    ],
    [
        { emoji: "🐸", label: "Frog" },
        { emoji: "⚽", label: "Ball" },
        { emoji: "🍕", label: "Pizza" },
        { emoji: "🦆", label: "Duck" },
        { emoji: "🌈", label: "Rainbow" }
    ],
    [
        { emoji: "🐻", label: "Bear" },
        { emoji: "🍒", label: "Cherry" },
        { emoji: "🚀", label: "Rocket" },
        { emoji: "💎", label: "Gem" },
        { emoji: "🌳", label: "Tree" },
        { emoji: "🎁", label: "Gift" }
    ]
];

let currentQuestion = 0;
let keys = 10;
let selected = [];
let locked = false;
let timerId = null;

// 🌟 [ส่วนที่เพิ่มใหม่]: ตัวแปรสำหรับเก็บรายการตัวเลือกที่สุ่มแล้วในแต่ละข้อ 
// เพื่อไม่ให้ปุ่มตัวเลือกสลับตำแหน่งไปมาเวลากดเลือกหรือถอนคำตอบ
let currentShuffledOptions = null; 

const background = document.getElementById("background");
const introScreen = document.getElementById("introScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const startButton = document.getElementById("startButton");
const questionTitle = document.getElementById("questionTitle");
const message = document.getElementById("message");
const countdown = document.getElementById("countdown");
const memoryArea = document.getElementById("memoryArea");
const sequenceDisplay = document.getElementById("sequenceDisplay");
const answerArea = document.getElementById("answerArea");
const answerSlots = document.getElementById("answerSlots");
const options = document.getElementById("options");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("scoreText");
const keyBar = document.getElementById("keyBar");
const celebration = document.getElementById("celebration");
const resultScore = document.getElementById("resultScore");
const takeStaffButton = document.getElementById("takeStaffButton");
const nextButton = document.getElementById("nextButton");
const replayButton = document.getElementById("replayButton");
const homeButton = document.getElementById("homeButton");
const goToNextChapter = document.getElementById("goToNextChapter");

const takeStaffBtn = document.getElementById('takeStaffButton');
const nextChapterBtn = document.getElementById('nextChapterButton');
const restartGameBtn = document.getElementById('restartGameButton'); 
const resultText = document.getElementById('resultText');

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
// 5. Save Score Function
// ==========================================
async function saveScore(score) {
    if (!playerId) {
        console.error("❌ ไม่พบ Player ID ไม่สามารถบันทึกคะแนนได้");
        return;
    }

    try {
        const playerRef = doc(db, "players", playerId);
        await setDoc(playerRef, {
            score_minigame3: score,
            updatedAt: new Date()
        }, { merge: true });
        console.log("✅ บันทึกคะแนนมินิเกม 3 สำเร็จ:", score);
    } catch (error) {
        console.error("🔥 เกิดข้อผิดพลาดในการบันทึกคะแนน:", error);
    }
}

function updateScore() {
    scoreText.textContent = `กุญแจคงเหลือ: ${keys}/10`;
    keyBar.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        const key = document.createElement("span");
        key.className = "key" + (i < keys ? " active" : "");
        key.textContent = "🔑";
        keyBar.appendChild(key);
    }
}

function showIntro() {
    clearTimeout(timerId);
    background.src = "BG_mini3-1.png";
    introScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    updateScore();
}

function startGame() {
    currentQuestion = 0;
    keys = 10;
    selected = [];
    updateScore();

    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");

    bgm.currentTime = 0;
    bgm.play().catch(e => console.log("BGM play blocked:", e));

    startQuestion();
}

function startQuestion() {
    clearTimeout(timerId);

    selected = [];
    locked = true;

    questionTitle.textContent = `ข้อ ${currentQuestion + 1} — จำลำดับสัญลักษณ์ให้ดี`;
    message.textContent = "";
    feedback.textContent = "";
    feedback.className = "";

    memoryArea.classList.add("hidden");
    answerArea.classList.add("hidden");
    nextButton.style.display = "none";
    replayButton.style.display = "block";
    countdown.classList.remove("hidden");
    countdown.textContent = "3";

    let count = 3;

    function countDown() {
        if (count > 0) {
            countdown.textContent = count;
            count--;
            timerId = setTimeout(countDown, 1000);
        } else {
            showSequence();
        }
    }

    countDown();
}

function showSequence() {
    const question = questions[currentQuestion];
    let index = 0;
    const revealTime = 10200 / question.length;

    countdown.classList.add("hidden");
    memoryArea.classList.remove("hidden");
    answerArea.classList.add("hidden");

    sequenceDisplay.innerHTML = "";

    function revealNext() {
        if (index < question.length) {
            const span = document.createElement("span");
            span.className = "sequenceEmoji";
            span.textContent = question[index].emoji;
            sequenceDisplay.appendChild(span);

            winkSound.currentTime = 0;
            winkSound.play().catch(e => console.log("Wink play blocked:", e));

            index++;
            timerId = setTimeout(revealNext, revealTime);
        } else {
            showAnswerArea();
        }
    }

    revealNext();
}

function showAnswerArea() {
    selected = [];
    locked = false;
    
    // 🌟 [ส่วนที่แก้ไข]: รีเซ็ตตัวเลือกที่สุ่มไว้ เพื่อให้สุ่มใหม่เมื่อขึ้นข้อใหม่
    currentShuffledOptions = null; 

    memoryArea.classList.add("hidden");
    answerArea.classList.remove("hidden");
    nextButton.style.display = "none";
    replayButton.style.display = "block";

    renderAnswerSlots();
    renderOptions();
}

function renderAnswerSlots() {
    answerSlots.innerHTML = "";
    const question = questions[currentQuestion];

    for (let i = 0; i < question.length; i++) {
        const slot = document.createElement("div");
        
        // 🌟 [ส่วนที่แก้ไข]: เพิ่ม class "filled" เพื่อให้จัดการ CSS (เช่น กรอบสีทอง) ได้ง่ายขึ้นเมื่อมีอิโมจิอยู่ข้างใน
        slot.className = "slot" + (selected[i] ? " filled" : "");
        slot.textContent = selected[i] ? selected[i].emoji : "";
        
        // 🌟 [ส่วนที่เพิ่มใหม่]: เปลี่ยนรูปร่างเมาส์ให้เป็นรูปมือ (pointer) ถ้าช่องนั้นมีสัญลักษณ์อยู่ เพื่อให้รู้ว่ากดได้
        slot.style.cursor = selected[i] && !locked ? "pointer" : "default";

        // 🌟 [ส่วนที่เพิ่มใหม่]: ทำให้กดที่ช่องคำตอบ (Slot) เพื่อดึงสัญลักษณ์ออกได้
        slot.addEventListener("click", () => {
            if (locked || !selected[i]) return;
            removeSymbolAtIndex(i); // เรียกฟังก์ชันลบสัญลักษณ์ตามตำแหน่ง
        });

        answerSlots.appendChild(slot);
    }
}

function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function renderOptions() {
    options.innerHTML = "";
    const question = questions[currentQuestion];
    
    // 🌟 [ส่วนที่เพิ่มใหม่]: ตรวจสอบว่ามีตัวเลือกที่สุ่มไว้แล้วหรือยัง ถ้ายังไม่มีให้สุ่มใหม่
    // สิ่งนี้ช่วยให้เวลาเรากดเข้า/ออก ตัวเลือกจะไม่สลับที่กันมั่วๆ
    if (!currentShuffledOptions || currentShuffledOptions.length !== question.length) {
        currentShuffledOptions = shuffle(question);
    }

    currentShuffledOptions.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = `optionButton color${index % 6}`;
        button.innerHTML = `${item.emoji} ${item.label}`;

        // 🌟 [ส่วนที่เพิ่มใหม่]: เช็คว่าไอเท็มนี้มีอยู่ในอาร์เรย์ selected หรือไม่
        // ถ้ามีอยู่ แปลว่าผู้เล่นเลือกไปแล้ว ให้ใส่คลาส "selected" เพื่อทำเอฟเฟกต์ปุ่มจางลง
        const isSelected = selected.some(s => s.emoji === item.emoji);
        if (isSelected) {
            button.classList.add("selected");
        }

        button.addEventListener("click", () => {
            // 🌟 [ส่วนที่แก้ไข]: เปลี่ยนจากการเรียก chooseSymbol เป็น toggleSymbol แทน
            toggleSymbol(item);
        });

        options.appendChild(button);
    });
}

// 🌟 [ฟังก์ชันใหม่]: สลับสถานะการเลือก (ถ้าเลือกแล้วให้เอาออก ถ้ายังไม่เลือกให้ใส่เข้าไป)
function toggleSymbol(item) {
    if (locked) return;

    // หาว่าสัญลักษณ์ที่กด มีอยู่ในช่องคำตอบแล้วหรือยัง
    const existingIndex = selected.findIndex(s => s.emoji === item.emoji);

    if (existingIndex !== -1) {
        // 🌟 [ส่วนที่เพิ่มใหม่]: ถ้ากดปุ่มที่เคยเลือกไปแล้ว ให้ "ถอนออก" จากช่องคำตอบ
        selected.splice(existingIndex, 1);
    } else {
        // 🌟 [ส่วนที่เพิ่มใหม่]: ถ้ายังไม่ได้เลือก ให้ "เพิ่มเข้า" (เช็คด้วยว่าช่องตอบยังไม่เต็ม)
        if (selected.length < questions[currentQuestion].length) {
            selected.push(item);
        }
    }

    // วาดช่องคำตอบและปุ่มตัวเลือกใหม่ทั้งหมด เพื่ออัปเดตหน้าจอ
    renderAnswerSlots();
    renderOptions();

    // เช็คว่าถ้าช่องคำตอบเต็มแล้ว ให้รันฟังก์ชันตรวจคำตอบทันที
    if (selected.length === questions[currentQuestion].length) {
        checkAnswer();
    }
}

// 🌟 [ฟังก์ชันใหม่]: ถอนสัญลักษณ์ออกจากช่องคำตอบ เมื่อผู้เล่นคลิกที่ช่องคำตอบ (Slot) ด้านบน
function removeSymbolAtIndex(index) {
    if (locked) return;
    
    // ลบข้อมูลตำแหน่งนั้นออกจากอาร์เรย์ selected
    selected.splice(index, 1);
    
    // รีเฟรชหน้าจอ (ช่องและปุ่ม) เพื่อให้ตรงกับข้อมูลล่าสุด
    renderAnswerSlots();
    renderOptions();
}

function checkAnswer() {
    locked = true;

    const correct = questions[currentQuestion].every(
        (item, index) => item.emoji === selected[index].emoji
    );

    if (correct) {
        feedback.textContent = "";
        feedback.className = "";
        replayButton.style.display = "none";
        nextButton.style.display = "block";

        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.log("Audio play blocked:", e));
    } else {
        keys--;
        updateScore();

        wrongSound.currentTime = 0;
        wrongSound.play().catch(e => console.log("Audio play blocked:", e));

        if (keys <= 0) {
            feedback.textContent = "";
            feedback.className = "";

            // 🌟 [ส่วนที่เพิ่มใหม่]: หยุดเพลง BGM ทันทีเมื่อกุญแจหมด และป๊อปอัปแจ้งเตือนแสดงขึ้นมา
            bgm.pause();
            bgm.currentTime = 0;
            
            if (keyOutBubble) {
                keyOutBubble.classList.remove("hidden");
            }
            return;
        }

        feedback.textContent = `ยังไม่ถูกนะ! เสียกุญแจ 1 ดอก เหลือ ${keys} ดอก`;
        feedback.className = "feedback-bad";

        timerId = setTimeout(() => {
            selected = [];
            locked = false;
            renderAnswerSlots();
            renderOptions();
            feedback.textContent = "";
            feedback.className = "";
        }, 1200);
    }
}

async function finishGame() {

    clearTimeout(timerId);

    // 🎶 1. หยุดเพลง BGM ก่อน
    bgm.pause();
    bgm.currentTime = 0;

    // 🔊 2. เล่นเสียง Yay    
    yaysound.currentTime = 0;
    yaysound.play().then(() => {
        console.log("🔊 เล่นเสียง yaysound สำเร็จ");
    }).catch(e => {
        console.error("❌ ไม่สามารถเล่นเสียง yaysound ได้ (เช็คชื่อไฟล์/พาธในโฟลเดอร์ sounds):", e);
    });

    background.src = "BG_mini3-2.png";
    resultScore.textContent = `กุญแจที่เหลือ: ${keys}/10`;

    await saveScore(keys);

    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    startCelebration();
}

function startCelebration() {
    celebration.innerHTML = "";
    const emojis = ["🔑", "✨", "⭐", "🌟", "💎", "🎉", "🍬", "💫"];

    for (let i = 0; i < 30; i++) {
        const item = document.createElement("span");
        item.className = "fallingEmoji";
        item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        item.style.left = `${Math.random() * 100}%`;
        item.style.animationDuration = `${2.5 + Math.random() * 3}s`;
        item.style.animationDelay = `${Math.random() * 2}s`;
        item.style.fontSize = `${30 + Math.random() * 25}px`;
        celebration.appendChild(item);
    }
}

function resetGame() {
    clearTimeout(timerId);
    celebration.innerHTML = "";
    currentQuestion = 0;
    keys = 10;
    selected = [];
    currentShuffledOptions = null; // 🌟 เคลียร์ค่าที่สุ่มไว้เมื่อเริ่มเกมใหม่
    updateScore();

    yaysound.pause();
    yaysound.currentTime = 0;

    if (keyOutBubble) {
        keyOutBubble.classList.add("hidden");
    }

    introScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    background.src = "BG_mini3-1.png";
}

startButton.addEventListener("click", startGame);

replayButton.addEventListener("click", () => {
    if (locked) return;
    clearTimeout(timerId);
    selected = [];
    feedback.textContent = "";
    feedback.className = "";
    nextButton.style.display = "none";
    showSequence();
});

nextButton.addEventListener("click", () => {
    if (locked && selected.length === questions[currentQuestion].length) {
        nextButton.style.display = "none";
        currentQuestion++;

        if (currentQuestion >= questions.length) {
            finishGame();
        } else {
            startQuestion();
        }
    }
});

takeStaffButton.addEventListener("click", () => {
    takeStaffButton.textContent = "หยิบคทาวิเศษแล้ว!";
    takeStaffButton.disabled = true;
    takeStaffButton.style.opacity = "0.75";
});

if (homeButton) {
    homeButton.addEventListener("click", function () {
        bgm.pause();

        const mainPage = "../index.html"; 
        if (playerId) {
            window.location.href = `${mainPage}?id=${playerId}`;
        } else {
            window.location.href = `${mainPage}`;
        }
    });
}

if (goToNextChapter) {
    goToNextChapter.addEventListener("click", function () {
        bgm.pause();

        const nextChapterPage = "../Story_ch4/Story_ch4.html"; 
        if (playerId) {
            window.location.href = `${nextChapterPage}?id=${playerId}`;
        } else {
            window.location.href = `${nextChapterPage}`;
        }
    });
}

if (bubbleRestartButton) {
    bubbleRestartButton.addEventListener("click", () => {
        if (keyOutBubble) {
            keyOutBubble.classList.add("hidden");
        }
        resetGame();
    });
}


if (takeStaffBtn && nextChapterBtn) {
    takeStaffBtn.addEventListener('click', () => {
        takeStaffBtn.classList.add('hidden');

        if (resultText) {
            resultText.innerHTML = "ได้คทาวิเศษมาแล้ว!<br>รีบไปช่วยฮันเซลใน Chapter 4 กันเลย!";
        }

        nextChapterBtn.classList.remove('hidden');
        if (restartGameBtn) {
            restartGameBtn.classList.remove('hidden');
        }
    });

    nextChapterBtn.addEventListener('click', () => {
        window.location.href = '../Story_ch4/Story_ch4.html'; 
    });

    if (restartGameBtn) {
        restartGameBtn.addEventListener('click', () => {
            location.reload(); 
        });
    }
}


function scaleGame() {
    const scale = Math.min(
        window.innerWidth / 1920,
        window.innerHeight / 1080
    );
    document.getElementById("game").style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleGame);

window.addEventListener("DOMContentLoaded", async () => {
    scaleGame();
    await loadPlayerData(); 
    showIntro();
});

// 🌟 [ปรับปรุงคีย์ลัดสำหรับเทส]: เรียก finishGame() ตรง ๆ เพื่อให้หยุด BGM และเล่นเสียง yaysound ทันที
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'Space') {
        e.preventDefault();
        console.log("⚡ [Debug] ข้ามมินิเกมไปหน้าผลลัพธ์ทันที!");
        finishGame();

        const homeBtn = document.getElementById('homeButton');
        if (homeBtn) homeBtn.style.pointerEvents = 'auto';
    }
});