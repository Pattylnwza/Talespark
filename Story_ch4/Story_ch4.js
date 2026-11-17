const story = [

    {
        scene:
            "scene1.png",

        title:
            "ฉากที่ 1: เกรเทลโดนแม่มดจับได้",

        paragraphs: [

            "เกรเทลแอบหยิบคทาวิเศษมาได้สำเร็จ จึงวิ่งไปหาฮันเซล",

            "แต่แม่มดกลับเดินเข้ามาในบ้าน และพบว่าคทาของเธอหายไป",

            "แม่มดมองไปรอบๆ จนเห็นเกรเทลถือคทาอยู่ในมือ เธอจึงรีบเดินเข้าไปหาเกรเทล",
        ],

        choices: [

            {
                emotion:
                    "😠 Option A — เกรเทล: กล้าหาญ ",

                scene:
                    "scene1_A.png",

                response:
                    "“หนูจะไม่ยอมให้แม่มดทำร้ายพี่ฮันเซลอีกแล้ว”"
            },

            {
                emotion:
                    "😡 Option B — แม่มด: โกรธ",

                scene:
                    "scene1_B.png",

                response:
                    "แม่มดตะโกนใส่เกรเทล “ส่งคทาข้าคืนมาเดี๋ยวนี้”"
            }

        ]
    },


    {
        scene:
            "scene2.png",

        title:
            "ฉากที่ 2: เกรเทลช่วยฮันเซล",

        paragraphs: [

            "เกรเทลรีบยกคทาขึ้นแล้วเสกให้กรงของฮันเซลเปิดออก",

            "หลังจากนั้นเกรเทลก็ใช้คทาเสกให้แม่มดเข้าไปอยู่ในกรงแทน",

        ],

        choices: [

            {
                emotion:
                    "🥹 Option A — ฮันเซล: ดีใจ",

                scene:
                    "scene2_A.png",

                response:
                    "“ขอบใจนะเกรเทลที่ช่วยพี่ไว้”"
            },

            {
                emotion:
                    "😤 Option B — เกรเทล : มุ่งมั่น",

                scene:
                    "scene2_B.png",

                response:
                    "“เราจะได้กลับบ้านกันแล้วนะฮันเซล”"
            }

        ]
    },


    {
        scene:
            "scene3.png",

        title:
            "ฉากที่ 3: วางแผนกลับบ้านพร้อมสมบัติ",

        paragraphs: [

            "เมื่อปลอดภัยแล้ว ฮันเซลและเกรเทลก็เริ่มสำรวจบ้านของแม่มด",

            "พวกเขาพบหีบสมบัติล้ำค่ามากมาย",

            "จึงคิดจะนำสมบัติเหล่านี้กลับไปช่วยครอบครัวและชาวบ้านที่กำลังลำบาก",

            "เกรเทลใช้คทาวิเศษร่ายคาถากลับบ้านพร้อมสมบัติ"

        ],

        choices: [

            {
                emotion:
                    "🤩 Option B — ฮันเซล: ตื่นเต้น",

                scene:
                    "scene3_A.png",

                response:
                    "ฮันเซลยิ้มกว้าง “ถ้าเราเอาสมบัติกลับไป พ่อกับแม่ก็จะไม่ลำบากแล้ว”"
            },

            {
                emotion:
                    "😁 Option A — เกรเทล: ยิ้มกว้าง",

                scene:
                    "scene3_B.png",

                response:
                    "“ในที่สุดเราก็ได้กลับบ้านแล้วนะพี่ฮันเซล”"
            }

        ]
    },


    {
        scene:
            "scene4.png",

        title:
            "ฉากที่ 4: กลับบ้านและได้พบพ่อแม่อีกครั้ง",

        paragraphs: [

            "ฮันเซลและเกรเทลใช้คทาวิเศษพาพวกเขากลับมาถึงบ้าน",

            "ทันทีที่พ่อแม่เห็นลูกทั้งสอง พวกท่านก็รีบวิ่งเข้ามากอดด้วยความดีใจ",

            "แม่เลี้ยงก็รู้สึกเสียใจที่เคยพาเด็กทั้งสองไปปล่อยไว้ในป่า",

            "เธอจึงขอโทษและเด็กๆ เองก็ให้อภัย"

        ],

        choices: [

            {
                emotion:
                    "😌 Option B — พ่อ: โล่งใจ ",

                scene:
                    "scene4_A.png",

                response:
                    "พ่อรู้สึกสบายใจ “พ่อดีใจเหลือเกินที่ทั้งคู่กลับมาอย่างปลอดภัย”"
            },

            {
                emotion:
                    "😔 Option A — แม่เลี้ยง: สำนึกผิด",

                scene:
                    "scene4_B.png",

                response:
                    "แม่เลี้ยงก้มหน้าลง “แม่ขอโทษ ที่เคยทำแบบนั้นกับลูกทั้งสอง”"
            }

        ]
    },


    {
        scene:
            "scene5.png",

        title:
            "ฉากที่ 5: แบ่งปันสมบัติ",

        paragraphs: [

            "หลังจากนั้นมา ครอบครัวของพวกเขาก็มีอาหารเพียงพอ ไม่ต้องอดอยาก",

            "แต่สองพี่น้องนึกถึงชาวบ้านคนอื่นๆ ที่ยังลำบาก จึงนำสมบัติไปแจกจ่าย",

            "ฮันเซลกับเกรเทลก็ได้เรียนรู้ว่าการแบ่งปันทำให้ทุกคนมีความสุขไปด้วยกัน",


        ],

        choices: [

            {
                emotion:
                    "😄 Option A — ฮันเซล: ร่าเริง",

                scene:
                    "scene5_A.png",

                response:
                    "“เรามาช่วยกันดูแลหมู่บ้านของเราให้น่าอยู่กันเถอะ”"
            },

            {
                emotion:
                    "😊 Option B — เกรเทล: เมตตา",

                scene:
                    "scene5_B.png",

                response:
                    "“หนูดีใจที่ได้ช่วยทุกคนค่ะ ถ้าเรารู้จักแบ่งปัน ทุกคนก็จะมีความสุข”"
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


function goToMinigame4() {
    bgm.pause();
    window.location.href = "../Minigame4/Minigame4.html";
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