// 遊戲變數
let score = 0;
let time = 30;
let moleX = 0;
let moleY = 0;
let moleSize = 50;
let timer;
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

// 遊戲初始化
function startGame() {
    score = 0;
    time = 30;

    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';

    document.getElementById('currentScore').innerText = score;
    document.getElementById('remainingTime').innerText = time;

    spawnMole();
    timer = setInterval(updateTime, 1000);
}

// 更新時間
function updateTime() {
    time--;
    document.getElementById('remainingTime').innerText = time;

    if (time <= 0) {
        clearInterval(timer);
        alert('遊戲結束！分數: ' + score);
        endGame();
    }
}

// 隨機生成地鼠
function spawnMole() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moleX = Math.random() * (canvas.width - moleSize);
    moleY = Math.random() * (canvas.height - moleSize);

    ctx.fillStyle = "brown"; // 地鼠顏色
    ctx.fillRect(moleX, moleY, moleSize, moleSize);
}

// 點擊檢測
canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= moleX && x <= moleX + moleSize && y >= moleY && y <= moleY + moleSize) {
        score++;
        document.getElementById('currentScore').innerText = score;
        spawnMole(); // 點到地鼠就重生
    }
});

// 重新開始遊戲
function restartGame() {
    clearInterval(timer);
    startGame();
}

// 結束遊戲
function endGame() {
    clearInterval(timer);
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}
