const story = [

    {
        scene:
            "scene1.png",

        title:
            "ฉากที่ 1: คุณยายใจดี",

        paragraphs: [

            "ทันใดนั้น ประตูก็บ้านก็เปิดออก",

            "คุณยายใจดีเดินออกมาต้อนรับ และชวนเด็กๆ เข้าไปกินขนมในบ้าน"

        ],

        choices: [

            {
                emotion:
                    "🤨 Option A — ฮันเซล: ระแวง ",

                scene:
                    "scene1_A.png",

                response:
                    "ฮันเซลกระซิบว่า “เกรเทล ทำไมคุณยายถึงมาอยู่ในป่าลึกแบบนี้นะ?”"
            },

            {
                emotion:
                    "🤩 Option B — เกรเทล: ตื่นเต้น",

                scene:
                    "scene1_B.png",

                response:
                    "“คุณยายใจดีจังเลยค่ะ”"
            }

        ]
    },


    {
        scene:
            "scene2.png",

        title:
            "ฉากที่ 2: บอกลาคุณยาย",

        paragraphs: [

            "ฮันเซลและเกรเทลกินขนมจนอิ่ม",

            "ทั้งสองคิดถึงบ้าน จึงขอบคุณและบอกลาคุณยายเพื่อเดินทางกลับ",

            "แต่พวกเขาไม่รู้เลยว่า คุณยายใจดีจริงๆแล้วคือ แม่มดใจร้าย"

        ],

        choices: [

            {
                emotion:
                    "😊 Option A — เกรเทล: ยิ้มหวาน",

                scene:
                    "scene2_A.png",

                response:
                    "“ขอบคุณสำหรับขนมนะคะคุณยาย\nพวกเรากลับก่อนนะคะ”"
            },

            {
                emotion:
                    "😈 Option B — คุณยาย: สีหน้ายิ้มเจ้าเล่ห์",

                scene:
                    "scene2_B.png",

                response:
                    "“รีบไปไหนจ๊ะเด็กๆ กินขนมกับยายก่อนสิ”"
            }

        ]
    },


    {
        scene:
            "scene3.png",

        title:
            "ฉากที่ 3: แม่มดขัดขวาง",

        paragraphs: [

            "เมื่อเด็กๆ กำลังจะเดินออกจากบ้าน",

            "คุณยายก็เผยร่างจริงว่าเป็น แม่มดใจร้าย",

            "แม่มดใช้เวทมนตร์เสกใยมาปิดประตูไว้",

            "ทำให้ฮันเซลและเกรเทลหนีไปไม่ได้"

        ],

        choices: [

            {
                emotion:
                    "😨 Option B — เกรเทล: หวาดกลัว",

                scene:
                    "scene3_A.png",

                response:
                    "“ฮันเซล ประตูปิดแน่นเลย พวกเราทำยังไงกันดี”"
            },

            {
                emotion:
                    "😠 Option A — ฮันเซล: กล้าหาญ",

                scene:
                    "scene3_B.png",

                response:
                    "“ปล่อยพวกเราไปนะยายแม่มดใจร้าย”"
            }

        ]
    },


    {
        scene:
            "scene4.png",

        title:
            "ฉากที่ 4: ตกเป็นเหยื่อแม่มด",

        paragraphs: [

            "แม่มดจับฮันเซลไปขังไว้ในกรง เพื่อขุนให้อ้วนแล้วเตรียมจับกิน",

            "ส่วนเกรเทลถูกบังคับให้ทำงานบ้านทุกวัน",

            "เกรเทลเป็นห่วงฮันเซลมาก และพยายามคิดหาวิธีช่วยพี่ชาย"

        ],

        choices: [

            {
                emotion:
                    "😤 Option B — เกรเทล: มุ่งมั่น",

                scene:
                    "scene4_A.png",

                response:
                    "“ฉันจะไม่ยอมให้แม่มดใจร้ายทำร้ายพี่ฮันเซลเด็ดขาด\nต้องหาทางช่วยพี่ให้ได้”"
            },

            {
                emotion:
                    "🥺 Option A — ฮันเซล: ฮึดสู้",

                scene:
                    "scene4_B.png",

                response:
                    "“เกรเทล พี่ไม่เป็นไร เดี๋ยวพวกเราก็หาทางออกไปได้”"
            }

        ]
    },


    {
        scene:
            "scene5.png",

        title:
            "ฉากที่ 5: วางแผนช่วยฮันเซล",

        paragraphs: [

            "วันหนึ่ง เกรเทลเห็นว่าแม่มดไม่อยู่ในห้อง",

            "จึงรีบบอกฮันเซลว่าจะไปเอาคทาวิเศษมาช่วยพี่ออกจากกรง",

            "เกรเทลต้องรีบเข้าไปหยิบคทาวิเศษ ก่อนที่แม่มดจะกลับมา...",


        ],

        choices: [

            {
                emotion:
                    "🤫 Option A — ฮันเซล: ลุ้นระทึก",

                scene:
                    "scene5_A.png",

                response:
                    "“แม่มดไม่อยู่แล้ว รีบไปเอาคทากันเถอะ!”"
            },

            {
                emotion:
                    "😟 Option B — เกรเทล: กังวล",

                scene:
                    "scene5_B.png",

                response:
                    "“เกรเทล ระวังตัวด้วยนะ”"
            }

        ]
    }

];


const background =
    document.getElementById(
        "background"
    );


const chapterTitle =
    document.getElementById(
        "chapterTitle"
    );


const storyText =
    document.getElementById(
        "storyText"
    );


const readBtn =
    document.getElementById(
        "readBtn"
    );


const emotionArea =
    document.getElementById(
        "emotionArea"
    );


const choicesContainer =
    document.getElementById(
        "choices"
    );


const responseBox =
    document.getElementById(
        "responseBox"
    );


const nextBtn =
    document.getElementById(
        "nextBtn"
    );


const endScreen =
    document.getElementById(
        "endScreen"
    );

// 🎶 ประกาศตัวแปรเสียง BGM ตั้งค่าความดัง 0.2 และวนลูป
const bgm = new Audio('./sounds/bgm.mp3');
bgm.loop = true;
bgm.volume = 0.2;

// ฟังก์ชันช่วยปลดล็อกและเล่นเสียงเมื่อมีการคลิกหรือกดปุ่มครั้งแรกบนหน้าเว็บ
function playBGMOnce() {
    bgm.play().catch(e => console.log("BGM play blocked:", e));
    window.removeEventListener("click", playBGMOnce);
    window.removeEventListener("keydown", playBGMOnce);
}
window.addEventListener("click", playBGMOnce);
window.addEventListener("keydown", playBGMOnce);


let currentScene =
    0;


let currentParagraph =
    0;


let selectedChoice =
    null;


let typing =
    false;


let typingTimer =
    null;


let currentText =
    "";


function loadScene(index) {

    currentScene =
        index;

    currentParagraph =
        0;

    selectedChoice =
        null;

    typing =
        false;

    clearInterval(
        typingTimer
    );


    const data =
        story[index];


    changeSceneImage(
        data.scene
    );


    chapterTitle.textContent =
        data.title;


    emotionArea.classList.remove(
        "show"
    );


    storyText.style.display =
        "flex";


    choicesContainer.innerHTML =
        "";


    responseBox.innerHTML =
        "";


    responseBox.classList.remove(
        "show"
    );


    nextBtn.disabled =
        true;

    nextBtn.classList.add(
        "waiting"
    );

    nextBtn.textContent =
        "เลือกความรู้สึกก่อน →";


    readBtn.classList.remove(
        "hidden"
    );


    showParagraph();

}


function showParagraph() {

    const data =
        story[currentScene];


    const paragraph =
        data.paragraphs[
            currentParagraph
        ];


    currentText =
        paragraph;


    typing =
        true;


    clearInterval(
        typingTimer
    );


    storyText.innerHTML =
        '<span></span><span class="typingCursor"></span>';


    const textSpan =
        storyText.querySelector(
            "span"
        );


    let characterIndex =
        0;


    typingTimer =
        setInterval(
            () => {

                if (
                    characterIndex <
                    currentText.length
                ) {

                    textSpan.textContent +=
                        currentText[
                            characterIndex
                        ];

                    characterIndex++;

                }

                else {

                    clearInterval(
                        typingTimer
                    );

                    typing =
                        false;

                    updateReadButton();

                }

            },
            28
        );

}


function handleRead() {

    if (typing) {

        clearInterval(
            typingTimer
        );


        storyText.innerHTML =
            currentText;


        typing =
            false;


        updateReadButton();


        return;
    }


    const data =
        story[currentScene];


    if (
        currentParagraph <
        data.paragraphs.length - 1
    ) {

        currentParagraph++;

        showParagraph();

        return;
    }


    showChoices();

}


function updateReadButton() {

    const data =
        story[currentScene];


    if (typing) {

        readBtn.textContent =
            "แสดงข้อความทั้งหมด";

        return;
    }


    if (
        currentParagraph <
        data.paragraphs.length - 1
    ) {

        readBtn.textContent =
            "อ่านต่อ ▼";

    }

    else {

        readBtn.textContent =
            "เลือกความรู้สึก ▼";

    }

}


function showChoices() {

    const data =
        story[currentScene];


    readBtn.classList.add(
        "hidden"
    );


    emotionArea.classList.add(
        "show"
    );


    choicesContainer.innerHTML =
        "";


    nextBtn.classList.add(
        "waiting"
    );


    nextBtn.disabled =
        true;


    data.choices.forEach(
        (choice, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "choiceBtn";


            button.textContent =
                choice.emotion;


            button.onclick =
                () =>
                    chooseEmotion(
                        index
                    );


            choicesContainer.appendChild(
                button
            );

        }
    );

}


function chooseEmotion(
    choiceIndex
) {

    const data =
        story[currentScene];


    const choice =
        data.choices[
            choiceIndex
        ];


    selectedChoice =
        choiceIndex;


    storyText.style.display =
        "none";


    emotionArea.classList.remove(
        "show"
    );


    changeSceneImage(
        choice.scene
    );


    responseBox.innerHTML =
        `<span class="emotionTag">
            ${choice.emotion}
        </span>
        ${choice.response}`;


    responseBox.classList.add(
        "show"
    );


    nextBtn.disabled =
        false;

    nextBtn.classList.remove(
        "waiting"
    );


    if (
        currentScene ===
        story.length - 1
    ) {

        nextBtn.textContent =
            "จบ Chapter 3 →";

    }

    else {

        nextBtn.textContent =
            "ไปต่อ →";

    }

}


function changeSceneImage(
    imageName
) {

    background.classList.add(
        "scene-change"
    );


    setTimeout(
        () => {

            background.src =
                imageName;

            background.classList.remove(
                "scene-change"
            );

        },
        180
    );

}


function nextStep() {

    if (
        selectedChoice === null
    ) {

        return;
    }


    if (
        currentScene ===
        story.length - 1
    ) {
        //bgm.pause();
        endScreen.classList.add(
            "show"
        );

        return;
    }


    loadScene(
        currentScene + 1
    );

}


function goToMinigame3() {
    bgm.pause();
    window.location.href = "../Minigame3/Minigame3.html";
}


function resizeGame() {

    const game = document.getElementById("game");

    const scaleX = window.innerWidth / 1920;
    const scaleY = window.innerHeight / 1080;

    const scale = Math.min(scaleX, scaleY);

    game.style.transform =
        `translate(-50%, -50%) scale(${scale})`;

}

window.addEventListener("resize", resizeGame);

resizeGame();


loadScene(0);