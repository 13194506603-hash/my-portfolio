<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Physics Animation Example</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #111;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 小球对象
    class Ball {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 8; // 横向速度
        this.vy = Math.random() * 2;         // 纵向速度
        this.gravity = 0.5;                  // 重力
        this.friction = 0.8;                 // 摩擦系数
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        // 碰到底部
        if (this.y + this.radius + this.vy > canvas.height) {
          this.vy = -this.vy * this.friction;
        } else {
          this.vy += this.gravity;
        }

        // 碰到左右墙
        if (this.x + this.radius + this.vx > canvas.width || this.x - this.radius <= 0) {
          this.vx = -this.vx * this.friction;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.draw();
      }
    }

    let balls = [];
    for (let i = 0; i < 20; i++) {
      balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height, 20, "skyblue"));
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach(ball => ball.update());
    }
    animate();
  </script>
</body>
</html>
