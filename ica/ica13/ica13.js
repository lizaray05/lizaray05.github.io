const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Initialize canvas size
function initCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
initCanvasSize();

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initCanvasSize();
        repositionBalls();
    }, 100);
});

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.originalSize = size; // Store original size for responsive scaling
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= canvas.width) {
            this.velX = -Math.abs(this.velX); // Ensure it bounces inward
        }

        if (this.x - this.size <= 0) {
            this.velX = Math.abs(this.velX); // Ensure it bounces inward
        }

        if (this.y + this.size >= canvas.height) {
            this.velY = -Math.abs(this.velY); // Ensure it bounces inward
        }

        if (this.y - this.size <= 0) {
            this.velY = Math.abs(this.velY); // Ensure it bounces inward
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

const balls = [];

function createBalls() {
    while (balls.length < 25) {
        const size = random(10, 20);
        const ball = new Ball(
            random(size, canvas.width - size),
            random(size, canvas.height - size),
            random(-7, 7),
            random(-7, 7),
            randomRGB(),
            size
        );
        balls.push(ball);
    }
}

// Reposition balls when screen is resized
function repositionBalls() {
    const widthRatio = canvas.width / (canvas.width - 100); // -100 to prevent division by zero
    const heightRatio = canvas.height / (canvas.height - 100);
    
    for (const ball of balls) {
        // Adjust position proportionally
        ball.x = Math.max(ball.size, Math.min(canvas.width - ball.size, ball.x * widthRatio));
        ball.y = Math.max(ball.size, Math.min(canvas.height - ball.size, ball.y * heightRatio));
        
        // Adjust size based on screen dimensions (optional)
        const minDimension = Math.min(canvas.width, canvas.height);
        ball.size = ball.originalSize * (minDimension / 1000); // Scale based on screen size
        ball.size = Math.max(8, Math.min(20, ball.size)); // Keep within reasonable bounds
        
        // Adjust velocity based on screen size
        const velocityScale = Math.min(canvas.width, canvas.height) / 800;
        ball.velX = ball.velX > 0 ? Math.abs(ball.velX) * velocityScale : -Math.abs(ball.velX) * velocityScale;
        ball.velY = ball.velY > 0 ? Math.abs(ball.velY) * velocityScale : -Math.abs(ball.velY) * velocityScale;
    }
}

createBalls();

function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();