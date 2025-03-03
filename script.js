const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = {
    x: 100,
    y: canvas.height / 2,
    radius: 20,
    color: "#ff0000",
    velocityX: 3
};

let rings = [];
let ringInterval = 100;
let frameCount = 0;

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ball.x += ball.velocityX;
    
    if (ball.x - ball.radius > canvas.width) {
        ball.x = -ball.radius;
    }
    
    if (frameCount % ringInterval === 0) {
        createRing();
    }
    frameCount++;
    
    checkPassThrough();
    drawRings();
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

function createRing() {
    let ringY = Math.random() * (canvas.height - 100) + 50;
    rings.push({
        x: canvas.width,
        y: ringY,
        radius: 50,
        speed: 2
    });
}

function drawRings() {
    for (let i = 0; i < rings.length; i++) {
        let ring = rings[i];
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
        ring.x -= ring.speed;
    }
    rings = rings.filter(ring => ring.x + ring.radius > 0);
}

function checkPassThrough() {
    for (let i = 0; i < rings.length; i++) {
        let ring = rings[i];
        let distance = Math.sqrt((ball.x - ring.x) ** 2 + (ball.y - ring.y) ** 2);
        if (distance < ring.radius && ball.x > ring.x) {
            rings.splice(i, 1);
            break;
        }
    }
}

update();

