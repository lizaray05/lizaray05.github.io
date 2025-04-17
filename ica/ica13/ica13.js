// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball class
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.mass = size; // Mass proportional to size for physics calculations
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // Wall collision detection
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
      this.x = width - this.size;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
      this.x = this.size;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
      this.y = height - this.size;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
      this.y = this.size;
    }

    // Update position
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check for collision
        if (distance < this.size + ball.size) {
          // Change colors as before
          ball.color = this.color = randomRGB();
          
          // Collision resolution using physics principles
          // 1. Calculate collision normal
          const nx = dx / distance;
          const ny = dy / distance;
          
          // 2. Calculate relative velocity
          const vx = this.velX - ball.velX;
          const vy = this.velY - ball.velY;
          
          // 3. Calculate relative velocity along normal
          const relativeVelocity = vx * nx + vy * ny;
          
          // 4. Do nothing if objects are moving away from each other
          if (relativeVelocity > 0) {
            return;
          }
          
          // 5. Calculate impulse (simplified elastic collision)
          const impulse = 2 * relativeVelocity / (this.mass + ball.mass);
          
          // 6. Apply impulse to velocities
          this.velX -= impulse * ball.mass * nx;
          this.velY -= impulse * ball.mass * ny;
          ball.velX += impulse * this.mass * nx;
          ball.velY += impulse * this.mass * ny;
          
          // 7. Adjust positions to prevent sticking (move balls apart)
          const overlap = this.size + ball.size - distance;
          const adjustX = (overlap * 0.5) * nx;
          const adjustY = (overlap * 0.5) * ny;
          
          this.x += adjustX;
          this.y += adjustY;
          ball.x -= adjustX;
          ball.y -= adjustY;
        }
      }
    }
  }
}

// Create balls
const balls = [];

function createBalls() {
  // Clear existing balls
  balls.length = 0;
  
  // Create new balls appropriate for screen size
  const ballCount = Math.min(25, Math.max(5, Math.floor((width * height) / 20000)));
  
  while (balls.length < ballCount) {
    const size = random(10, Math.min(20, width / 20, height / 20));
    const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
    );

    balls.push(ball);
  }
}

// Window resize
window.addEventListener('resize', function() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  createBalls();
});

// Animation loop
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

// Initial setup
createBalls();
loop();