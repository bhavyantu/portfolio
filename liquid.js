const canvas = document.createElement("canvas");
canvas.id = "liquid-bg";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hue = 0;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener("mousemove", e => {
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 20 + 10,
      alpha: 1,
      hue: hue
    });
  }
  hue += 5;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.alpha -= 0.015;
    p.size += 0.4;

    ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    if (p.alpha <= 0) particles.splice(index, 1);
  });

  ctx.filter = "blur(60px)";
  requestAnimationFrame(animate);
}

animate();
