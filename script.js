const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 4,
    radius: 20,
    color: "#ff0000",
    velocityX: 3,
    velocityY: 2,
    gravity: 0.5,
    bounce: 0.7
};

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ball.velocityY += ball.gravity;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    if (ball.y + ball.radius >= canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.velocityY *= -ball.bounce;
    }
    
    if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
        ball.velocityX *= -1;
    }
    
    drawBall();
    requestAnimationFrame(update);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

update();
