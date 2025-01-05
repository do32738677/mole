const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const easyHighScoreElement = document.getElementById("easy-high-score");
const hardHighScoreElement = document.getElementById("hard-high-score");

let score = 0;
let timeRemaining = 30;
let moleX, moleY;
let gameInterval;
let mode = "easy";
let highScores = { easy: 0, hard: 0 };

// 載入圖片
const moleImage = new Image();
moleImage.src = "./images/mole.png";

const redMoleImage = new Image();
redMoleImage.src = "./images/redmole.png";

const goldMoleImage = new Image();
goldMoleImage.src = "./images/goldmole.png";

const burrowImage = new Image();
burrowImage.src = "./images/burrow.png";

const backgroundImage = new Image();
backgroundImage.src = "./images/background.png";

// 遊戲開始
function startGame(selectedMode) {
    mode = selectedMode;
    score = 0;
    timeRemaining = 30;
    scoreElement.textContent = `分數: ${score}`;
    timeElement.textContent = `剩餘時間: ${timeRemaining} 秒`;

    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    gameInterval = setInterval(updateTime, 1000);
    spawnMole();
}

// 更新時間
function updateTime() {
    timeRemaining--;
    timeElement.textContent = `剩餘時間: ${timeRemaining} 秒`;

    if (timeRemaining <= 0) {
        clearInterval(gameInterval);
        alert(`遊戲結束！你的分數是 ${score} 分`);
        goBack();
    }
}

// 出現地鼠
function spawnMole() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    moleX = Math.random() * (canvas.width - 50);
    moleY = Math.random() * (canvas.height - 50);

    ctx.drawImage(moleImage, moleX, moleY, 50, 50);
}

// 點擊事件
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const hit = clickX >= moleX && clickX <= moleX + 50 && clickY >= moleY && clickY <= moleY + 50;
    if (hit) {
        score++;
        scoreElement.textContent = `分數: ${score}`;
        spawnMole();
    }
});

// 回到主選單
function goBack() {
    clearInterval(gameInterval);
    document.getElementById("game-container").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
}

// 重新開始
function restartGame() {
    startGame(mode);
}

// 離開遊戲
function exitGame() {
    alert("謝謝遊玩！");
    window.close();
}
