// Gold Dust Floating Canvas Particles
export function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(70, Math.floor(width / 20));
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.5 - 0.2;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Pulse opacity
      this.opacity += this.pulseSpeed * this.pulseDirection;
      if (this.opacity >= 0.9 || this.opacity <= 0.1) {
        this.pulseDirection *= -1;
      }

      // Wrap around screen
      if (this.y < -10) this.y = height + 10;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230, 198, 135, ${this.opacity})`;
      ctx.shadowBlur = this.size * 4;
      ctx.shadowColor = 'rgba(230, 198, 135, 0.8)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
