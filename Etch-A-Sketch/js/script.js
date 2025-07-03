window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('etch-canvas');
  const ctx = canvas.getContext('2d');

  const startKnob = document.getElementById('start-knob');
  const resetKnob = document.getElementById('reset-knob');

  const colorPicker = document.getElementById('pen-color');
  const sizeSlider = document.getElementById('pen-size');

  let drawing = false;
  let penColor = colorPicker.value;
  let penSize = sizeSlider.value;
  let isStarted = false;

  function resizeCanvas() {
    canvas.width = 500;
    canvas.height = 500;
    clearCanvas();
  }

  function clearCanvas() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); 
  }

  startKnob.addEventListener('click', () => {
    isStarted = true;
    canvas.style.pointerEvents = 'auto';
  });

  resetKnob.addEventListener('click', () => {
    clearCanvas();
    isStarted = false;
    canvas.style.pointerEvents = 'none'; 
  });

  colorPicker.addEventListener('input', (e) => {
    penColor = e.target.value;
  });

  sizeSlider.addEventListener('input', (e) => {
    penSize = e.target.value;
  });

  canvas.addEventListener('mousedown', (e) => {
    if (!isStarted) return;
    drawing = true;
    draw(e);
  });

  canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!drawing || !isStarted) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = penColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  resizeCanvas();
});
