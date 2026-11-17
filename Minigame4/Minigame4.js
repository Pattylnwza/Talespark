// ==========================================
// 1. Firebase Import CDN & Config
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
// 2. Player ID & Global Variables
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get('id') || localStorage.getItem("currentPlayerId");
let playerName = "ผู้เล่น";

// ==========================================
// 3. Load Player Data (Background)
// ==========================================
async function loadPlayerData() {
    if (!playerId) return;
    try {
        const playerRef = doc(db, "players", playerId);
        const playerSnap = await getDoc(playerRef);
        if (playerSnap.exists()) {
            const data = playerSnap.data();
            playerName = data.name || data.playerName || "ผู้เล่น";
            console.log("✅ ดึงข้อมูลผู้เล่นสำเร็จ:", playerName);
        }
    } catch (error) {
        console.error("🔥 เกิดข้อผิดพลาดในการดึงข้อมูลผู้เล่น:", error);
    }
}
loadPlayerData();

// ==========================================
// 4. Save Score Function (Minigame 4) - บันทึกเบื้องหลังเงียบๆ
// ==========================================
async function saveScore(score) {
    if (!playerId) {
        console.error("❌ ไม่พบ Player ID ไม่สามารถบันทึกคะแนนได้");
        return;
    }

    try {
        const playerRef = doc(db, "players", playerId);
        await updateDoc(playerRef, {
            score_minigame4: score,
            updatedAt: new Date()
        });
        console.log("✅ บันทึกคะแนน Minigame 4 สำเร็จ:", score);
    } catch (error) {
        console.error("🔥 เกิดข้อผิดพลาดในการบันทึกคะแนน:", error);
    }
}

// ==========================================
// 5. Game Core Script
// ==========================================
(() => {
    "use strict";

    /* =====================================
       GAME SETTINGS
    ===================================== */

    const DESIGN_WIDTH = 1920;
    const DESIGN_HEIGHT = 1080;

    const TOTAL_PIECES = 16;
    const MAX_SCORE = 10;
    const GAME_SECONDS = 120;

    /*
       คู่ที่ต้องวางถูกครบ 2 ชิ้น จึงได้ 1 คะแนน
       ชิ้นที่ 13-16 ได้คะแนนแยกชิ้นละ 1 คะแนน
    */

    const SCORE_PAIRS = [
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9],
        [10, 11]
    ];

    const SCORE_SINGLE_PIECES = [
        12, 13, 14, 15
    ];

    /* =====================================
       ELEMENTS
    ===================================== */

    const scene = document.getElementById("gameScene");

    const board = document.getElementById("puzzleBoard");

    const leftTray = document.getElementById("leftTray");
    const rightTray = document.getElementById("rightTray");

    const scoreText = document.getElementById("scoreText");
    const scoreIcons = document.getElementById("scoreIcons");

    const timerNumber = document.getElementById("timerNumber");
    const timerBarFill = document.getElementById("timerBarFill");

    const modal = document.getElementById("modal");

    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    const previewImage = document.getElementById("previewImage");
    const previewHint = document.getElementById("previewHint");

    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const dashboardButton = document.getElementById("dashboardButton");

    /* =====================================
        AUDIO (BGM)
    ===================================== */
    const bgmtime = new Audio('sounds/bgmtime.mp3');
    bgmtime.volume = 0.2; // กำหนดระดับเสียงที่นี่ (0.0 - 1.0)

    // เล่นเสียงเมื่อผู้ใช้คลิกปุ่มเริ่มเกม
    document.getElementById('startButton').addEventListener('click', () => {
        bgmtime.play().catch(error => {
            console.log("ไม่สามารถเล่นเสียงได้:", error);
        });
    });

    // 🔊 ประกาศตัวแปรเสียงตอน Pop-up ขึ้น 
    const popSound = new Audio('./sounds/wink.mp3'); 
    popSound.volume = 0.2;

    /* =====================================
       GAME VARIABLES
    ===================================== */

    let correctCount = 0;
    let currentScore = 0;

    let timeLeft = GAME_SECONDS;

    let timerId = null;
    let previewId = null;

    let gameStarted = false;
    let gameEnded = false;

    let activeDrag = null;

    /* =====================================
       SCALE SCENE
    ===================================== */

    function scaleScene() {

        const scale = Math.min(
            window.innerWidth / DESIGN_WIDTH,
            window.innerHeight / DESIGN_HEIGHT
        );

        scene.style.transform = `scale(${scale})`;
    }

    window.addEventListener("resize", scaleScene);

    scaleScene();

    /* =====================================
       SHUFFLE
    ===================================== */

    function shuffle(array) {

        const result = [...array];

        for (let i = result.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [result[i], result[j]] =
                [result[j], result[i]];
        }

        return result;
    }

    /* =====================================
       IMAGE POSITION
    ===================================== */

    function setPieceImage(element, index) {

        const row = Math.floor(index / 4);
        const col = index % 4;

        const x = col * (100 / 3);
        const y = row * (100 / 3);

        element.style.backgroundPosition =
            `${x}% ${y}%`;
    }

    /* =====================================
       BUILD BOARD
    ===================================== */

    function buildBoard() {

        board.innerHTML = "";

        for (let i = 0; i < TOTAL_PIECES; i++) {

            const cell = document.createElement("div");

            cell.className = "puzzle-cell";

            cell.dataset.target = String(i);

            board.appendChild(cell);
        }
    }

    /* =====================================
       BUILD SCORE ICONS
    ===================================== */

    function buildScoreIcons() {

        scoreIcons.innerHTML = "";

        for (let i = 0; i < MAX_SCORE; i++) {

            const icon = document.createElement("span");

            icon.className = "score-piece";

            icon.textContent = "🧩";

            icon.setAttribute("aria-hidden", "true");

            scoreIcons.appendChild(icon);
        }
    }

    /* =====================================
       CHECK CORRECT PIECES
    ===================================== */

    function isPieceCorrect(index) {

        const cell = board.children[index];

        if (!cell) return false;

        const piece = cell.querySelector(".puzzle-piece");

        if (!piece) return false;

        return (
            Number(piece.dataset.piece) === index &&
            piece.classList.contains("locked")
        );
    }

    /* =====================================
       CALCULATE SCORE
    ===================================== */

    function calculateScore() {

        let score = 0;

        /*
           กลุ่มที่ 1-6:
           ต้องวางถูกครบทั้งคู่ จึงได้ 1 คะแนน
        */

        SCORE_PAIRS.forEach(pair => {

            const firstCorrect = isPieceCorrect(pair[0]);
            const secondCorrect = isPieceCorrect(pair[1]);

            if (firstCorrect && secondCorrect) {
                score++;
            }
        });

        /*
           ชิ้นที่ 13-16:
           ถูกหนึ่งชิ้น ได้หนึ่งคะแนน
        */

        SCORE_SINGLE_PIECES.forEach(index => {

            if (isPieceCorrect(index)) {
                score++;
            }
        });

        return Math.min(score, MAX_SCORE);
    }

    /* =====================================
       UPDATE SCORE
    ===================================== */

    function updateScore() {

        currentScore = calculateScore();

        correctCount = 0;

        for (let i = 0; i < TOTAL_PIECES; i++) {

            if (isPieceCorrect(i)) {
                correctCount++;
            }
        }

        scoreText.textContent =
            `จิ๊กซอว์สะสม: ${currentScore}/${MAX_SCORE}`;

        [...scoreIcons.children].forEach((icon, index) => {

            icon.classList.toggle(
                "active",
                index < currentScore
            );
        });
    }

    /* =====================================
       CREATE PUZZLE PIECE
    ===================================== */

    function createPiece(index) {

        const piece = document.createElement("div");

        piece.className = "puzzle-piece";

        piece.dataset.piece = String(index);

        piece.setAttribute("role", "button");

        piece.setAttribute(
            "aria-label",
            `ชิ้นส่วนภาพ หมายเลข ${index + 1}`
        );

        piece.tabIndex = 0;

        setPieceImage(piece, index);

        piece.addEventListener(
            "pointerdown",
            onPiecePointerDown
        );

        return piece;
    }

    /* =====================================
       BUILD TRAYS
    ===================================== */

    function buildTrays() {

        leftTray.innerHTML = "";
        rightTray.innerHTML = "";

        const shuffled = shuffle(
            Array.from(
                { length: TOTAL_PIECES },
                (_, i) => i
            )
        );

        shuffled.forEach((pieceIndex, i) => {

            const piece = createPiece(pieceIndex);

            if (i < 8) {
                leftTray.appendChild(piece);
            } else {
                rightTray.appendChild(piece);
            }
        });
    }

    /* =====================================
       DRAG START
    ===================================== */

    function onPiecePointerDown(event) {

        if (!gameStarted || gameEnded) return;

        if (event.button !== 0) return;

        const piece = event.currentTarget;

        if (piece.classList.contains("locked")) return;

        event.preventDefault();

        const rect = piece.getBoundingClientRect();

        const ghost = piece.cloneNode(true);

        ghost.classList.remove("drag-source");

        ghost.classList.add("dragging");

        ghost.style.width = `${rect.width}px`;
        ghost.style.height = `${rect.height}px`;

        document.body.appendChild(ghost);

        piece.classList.add("drag-source");

        activeDrag = {
            source: piece,
            ghost: ghost,
            pieceIndex: Number(piece.dataset.piece)
        };

        moveGhost(event.clientX, event.clientY);

        window.addEventListener(
            "pointermove",
            onPointerMove,
            { passive: false }
        );

        window.addEventListener(
            "pointerup",
            onPointerUp,
            { once: true }
        );

        window.addEventListener(
            "pointercancel",
            cancelDrag,
            { once: true }
        );
    }

    /* =====================================
       MOVE GHOST
    ===================================== */

    function moveGhost(x, y) {

        if (!activeDrag) return;

        activeDrag.ghost.style.left = `${x}px`;
        activeDrag.ghost.style.top = `${y}px`;
    }

    /* =====================================
       DRAG MOVE
    ===================================== */

    function onPointerMove(event) {

    if (!activeDrag) return;

    event.preventDefault();

    moveGhost(event.clientX, event.clientY);

    const target = document.elementFromPoint(
        event.clientX,
        event.clientY
    );

    document.querySelectorAll(
        ".puzzle-cell.drop-hover"
    ).forEach(el => {
        el.classList.remove("drop-hover");
    });

    const cell = target && target.closest(".puzzle-cell");

    if (!cell || !board.contains(cell)) return;

    const targetPiece = cell.querySelector(".puzzle-piece");

    // อนุญาตให้วางในช่องว่าง
    if (!targetPiece) {
        cell.classList.add("drop-hover");
        return;
    }

    // อนุญาตให้วางทับชิ้นส่วนที่ยังไม่ถูกต้อง
    if (
        !targetPiece.classList.contains("locked") &&
        targetPiece !== activeDrag.source
    ) {
        cell.classList.add("drop-hover");
    }
}

    /* =====================================
       FINISH DRAG
    ===================================== */

    function finishDrag() {

        if (!activeDrag) return null;

        const current = activeDrag;

        current.source.classList.remove("drag-source");

        current.ghost.remove();

        document.querySelectorAll(
            ".puzzle-cell.drop-hover"
        ).forEach(el => {

            el.classList.remove("drop-hover");

        });

        activeDrag = null;

        window.removeEventListener(
            "pointermove",
            onPointerMove
        );

        return current;
    }

    /* =====================================
       POINTER UP
    ===================================== */

    function onPointerUp(event) {

    if (!activeDrag) return;

    const target = document.elementFromPoint(
        event.clientX,
        event.clientY
    );

    const cell = target && target.closest(".puzzle-cell");

    const drag = finishDrag();

    // ต้องปล่อยภายในกระดาน
    if (
        !cell ||
        !board.contains(cell)
    ) {
        return;
    }

    const piece = drag.source;

    const targetIndex = Number(cell.dataset.target);

    // ตำแหน่งเดิม ไม่ต้องทำอะไร
    if (piece.parentElement === cell) {
        return;
    }

    // ตรวจสอบรูปที่อยู่ในช่องปลายทาง
    const existingPiece = cell.querySelector(".puzzle-piece");

    // หากช่องมีรูปที่ล็อคแล้ว ห้ามสลับ
    if (
        existingPiece &&
        existingPiece.classList.contains("locked")
    ) {
        return;
    }

    // จำตำแหน่งเดิมของรูปที่กำลังลาก
const originalParent = piece.parentElement;

// หากต้นทางเป็นช่องบนกระดาน ให้ล้างสถานะเดิมก่อน
if (originalParent.classList.contains("puzzle-cell")) {
    originalParent.classList.remove("filled");
}

// กรณีช่องปลายทางมีรูปผิดอยู่
if (existingPiece) {

    // ย้ายรูปเดิมกลับไปยังตำแหน่งต้นทาง
    originalParent.appendChild(existingPiece);

    // ตรวจสอบว่ารูปที่ย้ายกลับตรงกับช่องต้นทางหรือไม่
    if (originalParent.classList.contains("puzzle-cell")) {

        const originalTargetIndex =
            Number(originalParent.dataset.target);

        const displacedPieceIndex =
            Number(existingPiece.dataset.piece);

        if (originalTargetIndex === displacedPieceIndex) {

            // รูปตรงกับช่องต้นทาง ให้ล็อกอีกครั้ง
            existingPiece.classList.add("locked");
            originalParent.classList.add("filled");

        } else {

            // รูปไม่ตรงกับช่องต้นทาง ให้ลากแก้ไขได้
            existingPiece.classList.remove("locked");
            originalParent.classList.remove("filled");
        }

    } else {

        // หากต้นทางเป็นถาดเก็บรูป ให้ปลดล็อกไว้
        existingPiece.classList.remove("locked");
    }
}

    // นำรูปที่ลากไปวางในช่องปลายทาง
    cell.appendChild(piece);

    piece.classList.remove("drag-source");

    // ตรวจสอบว่ารูปตรงกับช่องหรือไม่
    if (targetIndex === drag.pieceIndex) {

        // รูปถูกต้อง ล็อคชิ้นส่วน
        piece.classList.add("locked");

        cell.classList.add("filled");

    } else {

        // รูปผิด ไม่ล็อค สามารถลากสลับได้อีก
        piece.classList.remove("locked");

        cell.classList.remove("filled");
    }

    // อัปเดตคะแนนใหม่
    updateScore();

    // ตรวจสอบการต่อภาพครบ 16 ชิ้น
    if (correctCount === TOTAL_PIECES) {

        endGame(true);
    }
}

    /* =====================================
       TIMER
    ===================================== */

    function updateTimerDisplay() {

    if (!timerNumber || !timerBarFill) return;

    timerNumber.textContent = timeLeft;

    const progress = Math.max(
        0,
        timeLeft / GAME_SECONDS
    );

    timerBarFill.style.width =
        `${progress * 100}%`;

    timerNumber.classList.toggle(
        "warning",
        timeLeft <= 10
    );
}

function startTimer() {

    clearInterval(timerId);

    timeLeft = GAME_SECONDS;

    updateTimerDisplay();

    timerId = setInterval(() => {

        if (!gameStarted || gameEnded) return;

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

            clearInterval(timerId);

            endGame(false);
        }

    }, 1000);
}


    /* =====================================
       START GAME
    ===================================== */

    function startGame() {

        clearInterval(previewId);

        clearInterval(timerId);

        modal.classList.add("hidden");

        gameStarted = true;
        gameEnded = false;

        correctCount = 0;
        currentScore = 0;

        timeLeft = GAME_SECONDS;

        buildBoard();

        buildScoreIcons();

        buildTrays();

        updateScore();

        updateTimerDisplay();

        startTimer();
    }

    // ==========================================
    // END GAME
    // ==========================================
    function endGame(isWin) {
        if (gameEnded) return;

        gameEnded = true;
        gameStarted = false;
        clearInterval(timerId);

        if (activeDrag) finishDrag();

        modal.classList.remove("hidden");

        // 🛑 สั่งหยุดเพลงประกอบ (bgmtime) ทันทีก่อนที่ Pop-up จะขึ้น
        if (typeof bgmtime !== 'undefined' && bgmtime) {
            bgmtime.pause();
            bgmtime.currentTime = 0; // รีเซ็ตเพลงกลับไปจุดเริ่มต้น
        }

        // 🔊 สั่งให้เล่นเสียงตรงนี้ ทันทีที่ Pop-up เด้งขึ้นมา
        popSound.currentTime = 0; // รีเซ็ตเสียงให้เล่นจากต้นเสมอ (เผื่อเล่นซ้ำ)
        popSound.play().catch(e => console.log("Sound play blocked:", e));

        previewImage.style.display = isWin ? "block" : "none";
        previewHint.style.display = "none";
        startButton.style.display = "none";
        restartButton.style.display = "inline-block";

        if (dashboardButton) {
            if (isWin) {
                dashboardButton.style.display = "inline-block";
                dashboardButton.onclick = () => {
                    window.location.href = playerId ? `../Dashboard/Dashboard.html?id=${playerId}` : "../Dashboard/Dashboard.html";
                };
            } else {
                dashboardButton.style.display = "none";
            }
        }

        modalTitle.textContent = isWin ? "เก่งมาก! ต่อภาพสำเร็จแล้ว" : "หมดเวลาแล้ว!";
        
        // แสดงเฉพาะข้อความสรุปคะแนนตามปกติ ไม่เพิ่มข้อความสถานะการบันทึก
        modalMessage.textContent = isWin
            ? `คุณสะสมจิ๊กซอว์ได้ ${currentScore}/${MAX_SCORE} คะแนน ได้เวลากลับบ้านแล้ว!`
            : `คุณสะสมจิ๊กซอว์ได้ ${currentScore}/${MAX_SCORE} คะแนน ลองอีกครั้งนะ!`;

        // สั่งบันทึกคะแนนลง Firestore เบื้องหลัง
        saveScore(currentScore);
    }

    /* =====================================
       INTRO SCREEN
    ===================================== */

    function showIntro() {

        gameStarted = false;

        gameEnded = false;

        modal.classList.remove("hidden");

        previewImage.style.display = "block";

        previewHint.style.display = "block";

        previewHint.textContent =
            "กำลังแสดงภาพตัวอย่าง 5 วินาที...";

        startButton.style.display = "none";

        restartButton.style.display = "none";

        modalTitle.textContent =
            "มินิเกมที่ 4: แฮปปี้เอ็นดิ้ง!";

        modalMessage.textContent =
            "จดจำภาพให้ดี แล้วช่วยกันต่อภาพครอบครัวให้สมบูรณ์นะ!";

        let remaining = 5;

        previewHint.textContent =
            `จดจำภาพนี้ให้ดี ${remaining} วินาที`;

        previewId = setInterval(() => {

            remaining--;

            if (remaining > 0) {

                previewHint.textContent =
                    `จดจำภาพนี้ให้ดี ${remaining} วินาที`;

            } else {

                clearInterval(previewId);

                previewHint.textContent =
                    "พร้อมแล้วหรือยัง?";

                startButton.style.display =
                    "inline-block";
            }

        }, 1000);
    }

    /* =====================================
       BUTTON EVENTS
    ===================================== */

    startButton.addEventListener(
        "click",
        startGame
    );

    restartButton.addEventListener(
        "click",
        startGame
    );

    document.getElementById("homeButton")
        .addEventListener("click", () => {

            window.location.href = "../index.html";

        });

    // ==========================================
    // ⌨️ คีย์ลัดทดสอบเกม (กด Ctrl + Shift + Space เพื่อจำลองว่าต่อภาพสำเร็จแล้ว)
    // ==========================================
    window.addEventListener("keydown", (event) => {
        // เช็คว่ากด Ctrl + Shift + Space พร้อมกัน และเกมกำลังเล่นอยู่หรือไม่
        if (event.ctrlKey && event.shiftKey && event.code === "Space" && gameStarted && !gameEnded) {
            event.preventDefault(); // ป้องกันไม่ให้หน้าจอเลื่อนหรือเกิด Default action ของเบราว์เซอร์
            console.log("⚡ [Cheat Key] จำลองเล่นเกมชนะทันที!");
            
            // ทำให้ชิ้นส่วนทั้งหมดเข้าตำแหน่งและล็อกให้ครบ เพื่อให้คะแนนเต็ม 10/10
            for (let i = 0; i < TOTAL_PIECES; i++) {
                const cell = board.children[i];
                if (cell) {
                    const piece = document.querySelector(`.puzzle-piece[data-piece="${i}"]`);
                    if (piece) {
                        cell.appendChild(piece);
                        piece.classList.add("locked");
                        cell.classList.remove("drag-source");
                    }
                    cell.classList.add("filled");
                }
            }
            updateScore(); // อัปเดตคะแนนให้เต็ม

            // เรียกฟังก์ชันจบเกมด้วยสถานะชนะ (true)
            endGame(true);
        }
    });

    /* =====================================
       INITIALIZE
    ===================================== */

    buildBoard();

    buildScoreIcons();

    updateScore();

    showIntro();

})();
