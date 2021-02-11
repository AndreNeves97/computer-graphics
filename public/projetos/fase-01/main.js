$(() => {
  new Main();
});

function Main() {
  const canvas = $("#canvas-webgl")[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;

  const webGLBase = new WebGLBase(canvas);
  const cameraControl = new CameraControl(canvas);

  init();

  function init() {
    webGLBase.initWebGL();
    initEnvironment();
    initSceneObjects();
    tick();
  }

  function initEnvironment() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  function tick() {
    requestAnimFrame(tick);
    WebGLFunctions.prepareScene();
    cameraControl.tickKeyboardMovement();
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
    } = cameraControl.getCamControlValues();

    mat4.translate(mMatrix, mMatrix, [camX, camY, camZ]);

    mat4.rotate(vMatrix, vMatrix, camRotationX, [0, 1, 0]);
    mat4.rotate(vMatrix, vMatrix, camRotationY, [1, 0, 0]);
    mat4.rotate(vMatrix, vMatrix, camRotationZ, [0, 0, 1]);

    tickDrawSceneObjects();
  }
}
