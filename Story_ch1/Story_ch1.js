/* =========================================================
   STORY DATA
========================================================= */

const story = [

    {
        scene:
            "scene1.png",

        title:
            "ฉากที่ 1: กระท่อมไม้ริมชายป่า",

        paragraphs: [

            "กาลครั้งหนึ่งนานมาแล้ว มีครอบครัวคนตัดไม้ใจดี อาศัยอยู่ในกระท่อมไม้หลังเล็กในป่า",

            "พ่อมีลูกสองคน ชื่อฮันเซล เป็นพี่ชาย และเกรเทล เป็นน้องสาว"

        ],

        choices: [

            {
                emotion:
                    "🤨 Option A — ฮันเซล: สงสัย / ระวังตัว",

                image:
                    "scene1_A.png",

                response:
                    'ฮันเซลกระซิบกับเกรเทล "เกรเทล... แม่เลี้ยงดูแปลกๆ นะ ระวังตัวไว้หน่อย"'
            },

            {
                emotion:
                    "😊 Option B — เกรเทล: ยิ้มสดใส / ผูกมิตร",

                image:
                    "scene1_B.png",

                response:
                    'เกรเทลยื่นดอกไม้ให้แม่เลี้ยง "แม่คะ! หนูเก็บดอกไม้สวยๆ มาฝากค่ะ"'
            }

        ]
    },

    {
        scene:
            "scene2.png",

        title:
            "ฉากที่ 2: เสียงกระซิบในครัวยามค่ำคืน",

        paragraphs: [

            "ฝนไม่ตกมานาน จนในหมู่บ้านไม่มีอาหารกิน",

            "ในคืนมืดมิด พ่อกับแม่เลี้ยงนั่งคุยกันด้วยความเครียด",

            "แม่เลี้ยงบอกพ่อว่าจะพาเด็กๆ ไปทิ้งไว้ในป่าลึก"

        ],

        choices: [

            {
                emotion:
                    "😌 Option A — ฮันเซล: อบอุ่น / ปลอบประโลม",

                image:
                    "scene2_A.png",

                response:
                    'ฮันเซลเอานิ้วแตะปากแล้วกระซิบ "อย่าร้องไห้นะเกรเทล พี่จะปกป้องเธอเอง"'
            },

            {
                emotion:
                    "😢 Option B — เกรเทล: ตกใจ / น้ำตาคลอ",

                image:
                    "scene2_B.png",

                response:
                    'เกรเทลสะอื้นเบาๆ "ทำไมแม่เลี้ยงใจร้ายจัง... พวกเราจะทำยังไงดีพี่ฮันเซล"'
            }

        ]
    },

    {
        scene:
            "scene3.png",

        title:
            "ฉากที่ 3: การเดินทางเข้าสู่ป่าลึก",

        paragraphs: [

            "เช้าวันต่อมา พ่อต้องเข้าไปตัดไม้ในเมือง",

            "แม่เลี้ยงจึงแกล้งทำเป็นยิ้มหวาน ชวนเด็กๆ ไปเที่ยวป่า แต่ฮันเซลรู้ทัน",

            "จึงแอบหยิบก้อนหินเรืองแสงใส่กระเป๋า แล้วค่อยๆ ทิ้งลงพื้นทีละก้อนตามทาง"

        ],

        choices: [

            {
                emotion:
                    "🧐 Option A — ฮันเซล: ตื่นตัว / ระวังตัวอยู่ตลอดเวลา",

                image:
                    "scene3_A.png",

                response:
                    'ฮันเซลนึกในใจ "ต้องไม่ให้แม่เลี้ยงรู้... หินพวกนี้จะพาเรากลับบ้าน"'
            },

            {
                emotion:
                    "😌 Option B — เกรเทล: กังวล แต่มองพี่ชายแล้วรู้สึกโล่งใจ",

                image:
                    "scene3_B.png",

                response:
                    'เกรเทลนึกในใจ "ในป่าน่ากลัวจัง... แต่มีพี่ฮันเซลอยู่ หนูไม่กลัวแล้ว"'
            }

        ]
    },

    {
        scene:
            "scene4.png",

        title:
            "ฉากที่ 4: คำโกหกกลางป่าใหญ่",

        paragraphs: [

            "เมื่อเดินมาถึงกลางป่า แม่เลี้ยงให้เด็กๆ นั่งรอตรงขอนไม้ริมน้ำตก",

            'แล้วโกหกว่า "ลูกๆ นั่งรอตรงนี้นะ เดี๋ยวแม่ไปเก็บผลไม้ก่อน แล้วจะรีบมารับ"'

        ],

        choices: [

            {
                emotion:
                    "😐 Option A — ฮันเซล: สีหน้านิ่งสงบ / สุขุม",

                image:
                    "scene4_A.png",

                response:
                    'ฮันเซลพยักหน้าตอบ "ครับ พวกเราจะนั่งรออยู่ที่นี่"'
            },

            {
                emotion:
                    "🥺 Option B — เกรเทล: สีหน้ากังวล",

                image:
                    "scene4_B.png",

                response:
                    'เกรเทลพูดเสียงเบาๆ "อย่าไปนานนะคะ หนูเริ่มกลัวแล้ว..."'
            }

        ]
    },

    {
        scene:
            "scene5.png",

        title:
            "ฉากที่ 5: ประกายแสงแห่งความหวัง",

        paragraphs: [

            "เด็กๆ นั่งรอจนพระอาทิตย์ตกดิน",

            "ท้องฟ้าเริ่มมืดมิด และแม่เลี้ยงก็ไม่กลับมาจริงๆ แต่ฮันเซลกับเกรเทลก็ไม่กลัว",

            "เพราะก้อนหินเรืองแสงที่ฮันเซลทิ้งไว้ เริ่มส่องแสงสว่างนำทางกลับบ้าน"

        ],

        choices: [

            {
                emotion:
                    "😎 Option A — ฮันเซล: ผู้นำ / มั่นใจ",

                image:
                    "scene5_A.png",

                response:
                    'ฮันเซลจับมือน้องแน่น "เกรเทลดูสิ หินส่องแสงแล้ว ตามพี่มาเลยพวกเราได้กลับบ้านแน่"'
            },

            {
                emotion:
                    "🤩 Option B — เกรเทล: ตื่นเต้น / มีความหวัง",

                image:
                    "scene5_B.png",

                response:
                    'เกรเทลชี้ไปที่หิน "แสงสวยจังเลยพี่ฮันเซล เหมือนดาวอยู่บนดินเลย พวกเรารอดแล้ว"'
            }

        ]
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

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


/* =========================================================
   VARIABLES
========================================================= */

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


/* =========================================================
   LOAD SCENE
========================================================= */

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


    /*
     * ตอนเริ่มฉากใหม่
     * ซ่อนปุ่มไปต่อไว้ก่อน
     */
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


/* =========================================================
   SHOW PARAGRAPH
========================================================= */

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


/* =========================================================
   HANDLE READ
========================================================= */

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


/* =========================================================
   UPDATE READ BUTTON
========================================================= */

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


/* =========================================================
   SHOW CHOICES
========================================================= */

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


    /*
     * ยังไม่แสดงปุ่มไปต่อ
     * จนกว่าจะเลือกความรู้สึก
     */
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


/* =========================================================
   CHOOSE EMOTION
========================================================= */

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


    /*
     * ซ่อนข้อความบรรยาย
     */

    storyText.style.display =
        "none";


    /*
     * ซ่อนตัวเลือก
     */

    emotionArea.classList.remove(
        "show"
    );


    /*
     * เปลี่ยนภาพตามอารมณ์
     */

    changeSceneImage(
        choice.image
    );


    /*
     * แสดงบทพูด
     */

    responseBox.innerHTML =
        `<span class="emotionTag">
            ${choice.emotion}
        </span>
        ${choice.response}`;


    responseBox.classList.add(
        "show"
    );


    /*
     * เปิดปุ่มไปต่อ
     */

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
            "จบเรื่อง →";

    }

    else {

        nextBtn.textContent =
            "ไปต่อ →";

    }

}


/* =========================================================
   CHANGE IMAGE
========================================================= */

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


/* =========================================================
   NEXT STEP
========================================================= */

function nextStep() {

    if (
        selectedChoice === null
    ) {

        return;
    }


    /*
     * ฉากสุดท้าย
     */

    if (
        currentScene ===
        story.length - 1
    ) {

        endScreen.classList.add(
            "show"
        );

        return;
    }


    /*
     * ไปฉากถัดไป
     */

    loadScene(
        currentScene + 1
    );

}


/* =========================================================
   START MINIGAME
========================================================= */

function startMinigame() {

    window.location.href = "../Minigame1/Minigame1.html";
}


/* =========================================================
   RESPONSIVE SCALE

   กำหนด Design Resolution เป็น 1920x1080
   แล้ว scale ทั้ง Story พร้อมกันให้พอดีกับหน้าจอ
   โดยไม่ใช้ cover จึงไม่ crop ฉาก
========================================================= */

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


/* =========================================================
   START
========================================================= */

loadScene(0);