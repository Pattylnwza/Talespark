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

const background = document.getElementById("background");
const introScreen = document.getElementById("introScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const startButton = document.getElementById("startButton");
const questionTitle = document.getElementById("questionTitle");
const message = document.getElementById("message");
const countdown = document.getElementById("countdown");
const memoryArea = document.getElementById("memoryArea");
const memoryLabel = document.getElementById("memoryLabel");
const sequenceDisplay = document.getElementById("sequenceDisplay");
const answerArea = document.getElementById("answerArea");
const answerSlots = document.getElementById("answerSlots");
const options = document.getElementById("options");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("scoreText");
const keyBar = document.getElementById("keyBar");
const celebration = document.getElementById("celebration");
const resultText = document.getElementById("resultText");
const resultScore = document.getElementById("resultScore");
const takeStaffButton = document.getElementById("takeStaffButton");
const nextButton = document.getElementById("nextButton");
const replayButton = document.getElementById("replayButton");

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

    startQuestion();
}

function startQuestion() {
    clearTimeout(timerId);

    selected = [];
    locked = true;

    const question = questions[currentQuestion];

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
    const revealTime = 5000 / question.length;

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
        slot.className = "slot";
        slot.textContent = selected[i] ? selected[i].emoji : "";
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
    const shuffled = shuffle(question);

    shuffled.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = `optionButton color${index % 6}`;
        button.innerHTML = `${item.emoji} ${item.label}`;

        button.addEventListener("click", () => {
            chooseSymbol(item, button);
        });

        options.appendChild(button);
    });
}

function chooseSymbol(item, button) {
    if (locked || button.classList.contains("selected")) {
        return;
    }

    selected.push(item);
    button.classList.add("selected");

    renderAnswerSlots();

    if (selected.length === questions[currentQuestion].length) {
        checkAnswer();
    }
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
    } else {
        keys--;
        updateScore();

        if (keys <= 0) {
            feedback.textContent = "กุญแจหมดแล้ว ลองเริ่มเกมใหม่อีกครั้งนะ";
            feedback.className = "feedback-bad";

            timerId = setTimeout(() => {
                resetGame();
            }, 1800);

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

function finishGame() {
    clearTimeout(timerId);

    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    background.src = "BG_mini3-2.png";

    resultScore.textContent = `กุญแจที่เหลือ: ${keys}/10`;

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
    updateScore();

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

function scaleGame() {
    const scale = Math.min(
        window.innerWidth / 1920,
        window.innerHeight / 1080
    );

    document.getElementById("game").style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleGame);
scaleGame();
updateScore();
