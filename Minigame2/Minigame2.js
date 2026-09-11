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

const stage =
    document.getElementById("stage");


const timerNumber =
    document.getElementById("timerNumber");


const timerBarFill =
    document.getElementById("timerBarFill");


const candyCountNumber =
    document.getElementById("candyCountNumber");


const differenceField =
    document.getElementById("differenceField");


const differenceHotspots =
    document.querySelectorAll(".difference-hotspot");


const gameOver =
    document.getElementById("gameOver");


const gameOverTitle =
    document.getElementById("gameOverTitle");


const finalScore =
    document.getElementById("finalScore");


const restartButton =
    document.getElementById("restartButton");


const collectedCandySlots = [];


for (
    let i = 1;
    i <= TOTAL_CANDIES;
    i++
) {

    collectedCandySlots.push(
        document.getElementById(
            "candy" + i
        )
    );

}


/* =====================================================
   SCALE GAME

   Design Resolution 1920 x 1080
===================================================== */

function resizeGame() {

    const screenWidth =
        window.innerWidth;


    const screenHeight =
        window.innerHeight;


    const scaleX =
        screenWidth / GAME_WIDTH;


    const scaleY =
        screenHeight / GAME_HEIGHT;


    const scale =
        Math.min(
            scaleX,
            scaleY
        );


    stage.style.transform =
        `
        translate(-50%, -50%)
        scale(${scale})
        `;
}


/* =====================================================
   UPDATE TIMER
===================================================== */

function updateTimer() {

    timerNumber.textContent =
        timeLeft;


    const percent =
        Math.max(
            0,
            Math.min(
                100,
                (
                    timeLeft /
                    GAME_TIME
                ) * 100
            )
        );


    timerBarFill.style.width =
        percent + "%";
}


/* =====================================================
   UPDATE SCORE
===================================================== */

function updateCandy() {

    candyCountNumber.textContent =
        differenceScore;


    collectedCandySlots.forEach(
        (slot, index) => {

            if (index < differenceScore) {

                slot.classList.add(
                    "show"
                );

            } else {

                slot.classList.remove(
                    "show"
                );

            }

        }
    );
}


/* =====================================================
   DIFFERENCE HOTSPOTS

   ผู้เล่นกดตำแหน่งที่กำหนดไว้ 10 จุด
   กดถูก = เพิ่มคะแนน 1 แต้ม
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


                    /*
                       พบครบทั้ง 10 จุด
                       = จบเกมทันที
                    */

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

   แสดงคะแนนที่สะสมได้
===================================================== */

function endGame(completed = false) {

    if (!gameRunning) {

        return;
    }


    gameRunning = false;


    clearInterval(
        timerInterval
    );


    timerInterval = null;


    /*
       ถ้าหาเจอครบ 10 จุดก่อนหมดเวลา
       คงเวลาที่เหลือไว้
       ถ้าหมดเวลา ให้แสดง 0
    */

    if (!completed) {

        timeLeft = 0;

        updateTimer();

    }


    /*
       เปลี่ยนข้อความหัวข้อให้ตรงกับผลลัพธ์
    */

    if (completed) {

        gameOverTitle.textContent =
            "เก่งมาก!";

    } else {

        gameOverTitle.textContent =
            "หมดเวลาแล้ว!";

    }


    /*
       ปิดการกดจุดแตกต่างทั้งหมด
    */

    differenceHotspots.forEach(
        function (button) {

            button.classList.add("found");

        }
    );


    /*
       แสดงคะแนนลูกกวาดที่สะสมได้ในหน้าสรุปผล
    */

    finalScore.textContent =
        differenceScore;


    gameOver.classList.add(
        "game-over-visible"
    );

}


/* =====================================================
   START / RESTART GAME

   สำคัญ:
   ทุกครั้งที่กดเริ่มเกมใหม่

   เวลา = 30
   คะแนน = 0
   ลูกกวาดช่องสะสม = ว่าง
   จุดแตกต่าง = ยังไม่ถูกเลือก
===================================================== */

function startGame() {

    /*
       หยุด Timer เก่าก่อน
       ป้องกัน Timer ซ้อนกัน
    */

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    /*
       RESET เวลา
    */

    timeLeft =
        GAME_TIME;


    /*
       RESET คะแนน
    */

    differenceScore = 0;


    /*
       เปิดสถานะเกม
    */

    gameRunning = true;


    /*
       ซ่อน Pop-Up
    */

    gameOver.classList.remove(
        "game-over-visible"
    );


    /*
       RESET หน้าจอ
    */

    updateTimer();

    updateCandy();


    /*
       RESET จุดแตกต่าง
    */

    resetDifferenceHotspots();


    /*
       เริ่ม Timer ใหม่
    */

    timerInterval =
        setInterval(
            function () {

                if (!gameRunning) {

                    return;
                }


                timeLeft--;


                updateTimer();


                /*
                   หมดเวลา
                */

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

restartButton.addEventListener(
    "click",
    function () {

        startGame();

    }
);


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

   เริ่มเกมทันทีเมื่อเปิดหน้า
===================================================== */

resizeGame();

setupDifferenceHotspots();

startGame();