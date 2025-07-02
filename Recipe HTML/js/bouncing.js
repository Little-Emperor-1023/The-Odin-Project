const follower = document.getElementById('follower');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

const header = document.querySelector('.header');
let headerHeight = header ? header.offsetHeight : 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;

  mouseY = Math.max(e.clientY, headerHeight + 10); 
});

function animateFollower() {
  const speed = 0.1;
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  follower.style.left = `${currentX}px`;
  follower.style.top = `${currentY}px`;

  requestAnimationFrame(animateFollower);
}

animateFollower();
