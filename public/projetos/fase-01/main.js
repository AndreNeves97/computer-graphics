$(init);

let canvas;

function init() {
  canvas = $("#canvas-webgl")[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;

  initWebGL(canvas);

  document.dispatchEvent(new Event("afterPrepareWebGl"));
}
