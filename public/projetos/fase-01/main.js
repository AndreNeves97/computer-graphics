$(init);

let canvas;

function init() {
  canvas = $("#canvas-webgl")[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;

  initWebGL(canvas);

  iniciarAmbiente();

  // eslint-disable-next-line no-undef
  initSceneObjects();
  tick();
}

function iniciarAmbiente() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
}

function tick() {
  requestAnimFrame(tick);
  prepareScene();

  // eslint-disable-next-line no-undef
  tickKeyboardMovement();
  tickDrawScene();
}

function tickDrawScene() {
  const {
    camX,
    camY,
    camZ,
    camRotationX,
    camRotationY,
    camRotationZ,
    // eslint-disable-next-line no-undef
  } = getCamControlValues();

  mat4.translate(mMatrix, mMatrix, [camX, camY, camZ]);

  mat4.rotate(vMatrix, vMatrix, camRotationX, [0, 1, 0]);
  mat4.rotate(vMatrix, vMatrix, camRotationY, [1, 0, 0]);
  mat4.rotate(vMatrix, vMatrix, camRotationZ, [0, 0, 1]);

  // eslint-disable-next-line no-undef
  tickDrawSceneObjects();
}
