const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Game constants
const paddleWidth = 15;
const paddleHeight = 80;
const ballRadius = 10;

// Player paddle
const player = {
    x: 100,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#2ecc40"
};

// AI paddle
const ai = {
    x: canvas.width - paddleWidth - 100,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#ff4136",
    speed: 4
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 10,
    velocityX: 4,
    velocityY: 4,
    color: "#fff"
};

// Score
let playerScore = 0;
let aiScore = 0;

// Draw paddle function
function drawPaddle(paddle) {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw ball function
function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Draw net
function drawNet() {
    ctx.setLineDash([8, 16]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
}

// Draw score
function drawScore() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(playerScore, canvas.width/4, 40);
    ctx.fillText(aiScore, canvas.width*3/4, 40);
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.velocityY = ball.speed * (Math.random() > 0.5 ? 1 : -1);
}

// Collision detection
function collision(b, p) {
    return b.x - b.radius < p.x + p.width &&
           b.x + b.radius > p.x &&
           b.y - b.radius < p.y + p.height &&
           b.y + b.radius > p.y;
}

// Mouse control for player paddle
canvas.addEventListener("mousemove", evt => {
    let rect = canvas.getBoundingClientRect();
    let mouseY = evt.clientY - rect.top;
    player.y = mouseY - player.height / 2;
    // Clamp paddle inside canvas
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
});

// Main game loop
function update() {
    // Move ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // AI movement: move towards ball
    let aiCenter = ai.y + ai.height / 2;
    if (ball.y < aiCenter - 10) {
        ai.y -= ai.speed;
    } else if (ball.y > aiCenter + 10) {
        ai.y += ai.speed;
    }
    // Clamp AI paddle inside canvas
    ai.y = Math.max(0, Math.min(canvas.height - ai.height, ai.y));

    // Ball collision with top/bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
    }

    // Ball collision with paddles
    let paddle = ball.x < canvas.width / 2 ? player : ai;
    if (collision(ball, paddle)) {
        // Calculate collision point
        let collidePoint = ball.y - (paddle.y + paddle.height/2);
        // Normalize
        collidePoint = collidePoint / (paddle.height/2);
        // Max bounce angle of 45deg
        let angleRad = collidePoint * Math.PI/4;
        // Direction: left or right
        let direction = ball.x < canvas.width/2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        // Slightly increase speed after each hit
        ball.speed += 0.1;
    }

    // Ball goes past left wall (AI scores)
    if (ball.x - ball.radius < 0) {
        aiScore++;
        resetBall();
        ball.speed = 10;
    }
    // Ball goes past right wall (Player scores)
    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
        ball.speed = 10;
    }
}

// Render everything
function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNet();
    drawScore();
    drawPaddle(player);
    drawPaddle(ai);
    drawBall(ball);
}

// Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Start game
resetBall();
gameLoop();