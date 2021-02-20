// eslint-disable-next-line no-unused-vars
function CameraControl(canvas) {
  const maxRotationRangeX = degToRad(360);
  const maxRotationRangeY = degToRad(360);

  const velocityFactor = 2.5;

  const keyActions = {
    // page up
    33: () => (camY -= velocityFactor),

    // page down
    34: () => (camY += velocityFactor),

    // a
    65: () => {
      camX += velocityFactor * cosRotationX;
      camZ += velocityFactor * sinRotationX;
    },

    // d
    68: () => {
      camX -= velocityFactor * cosRotationX;
      camZ -= velocityFactor * sinRotationX;
    },

    // w
    87: () => {
      camX -= velocityFactor * sinRotationX;
      camY += velocityFactor * sinRotationY;
      camZ += velocityFactor * cosRotationX * cosRotationY;
    },

    // s
    83: () => {
      camX += velocityFactor * sinRotationX;
      camY -= velocityFactor * sinRotationY;
      camZ -= velocityFactor * cosRotationX * cosRotationY;
    },
  };

  let teclasPressionadas = {};

  let sinRotationX = 0;
  let sinRotationY = 0;
  let cosRotationX = 1;
  let cosRotationY = 1;

  let camX = 0;
  let camY = -30;
  let camZ = -105;

  let camRotationX = 0;
  let camRotationY = 0;
  let camRotationZ = 0;

  document.onmousemove = handleMouseMove;
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  return {
    tickKeyboardMovement,
    getCamControlValues,
  };

  // eslint-disable-next-line no-unused-vars
  function tickKeyboardMovement() {
    const actions = Object.entries(keyActions);

    actions.forEach(([keyCode, fn]) => {
      if (teclasPressionadas[keyCode]) {
        fn();
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  function getCamControlValues() {
    return { camX, camY, camZ, camRotationX, camRotationY, camRotationZ };
  }

  function handleMouseMove(event) {
    const { width, height } = canvas;

    const canvasWidth = width;
    const canvasHeight = height;

    defineCamRotation(
      Math.min(event.clientX, canvasWidth),
      Math.min(event.clientY, canvasHeight),
      canvasWidth,
      canvasHeight
    );
  }

  function defineCamRotation(
    mousePositionX,
    mousePositionY,
    objectWidth,
    objectHeight
  ) {
    const mouseRotationX =
      (mousePositionX / objectWidth) * maxRotationRangeX -
      maxRotationRangeX / 2;

    const mouseRotationY =
      (mousePositionY / objectHeight) * maxRotationRangeY -
      maxRotationRangeY / 2;

    sinRotationX = Math.sin(mouseRotationX);
    sinRotationY = Math.sin(mouseRotationY);

    cosRotationX = Math.cos(mouseRotationX);
    cosRotationY = Math.cos(mouseRotationY);

    camRotationX = mouseRotationX;
    camRotationY = mouseRotationY * cosRotationX;
    camRotationZ = mouseRotationY * sinRotationX;
  }

  function handleKeyDown(evento) {
    const keys = Object.keys(keyActions);

    if (keys.includes(`${evento.keyCode}`)) {
      evento.preventDefault();
    }

    teclasPressionadas[evento.keyCode] = true;
  }

  function handleKeyUp(evento) {
    teclasPressionadas[evento.keyCode] = false;
  }
}
