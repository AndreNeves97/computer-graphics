let cuboVertexPositionBuffer;
let cuboVertexIndexBuffer;
var cuboVertexTextureCoordBuffer;

const maxRotationRange = 90;

let mouseRotationX = 0;
let mouseRotationY = 0;

let camX = 0;
let camY = 0;
let camZ = -9;

const handledKeys = [33, 34, 37, 39, 38, 40, 65, 68, 83, 87];
var teclasPressionadas = {};

const texturesImgs = [
  "textures/texture-1.jpg",
  "textures/texture-2.jpg",
  "textures/texture-3.jpg",
  "textures/texture-4.jpg",
];

let textures;

document.addEventListener("afterPrepareWebGl", () => {
  iniciarAmbiente();
  createCubo();

  initTextures(texturesImgs);

  document.onkeydown = eventoTeclaPress;
  document.onkeyup = eventoTeclaSolta;
  document.onmousemove = handleMouseMove;

  tick();
});

function iniciarAmbiente() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
}

function tick() {
  requestAnimFrame(tick);
  prepareScene();
  handleKeyboardMovement();
  desenharCena();
  animate();
}

function handleKeyboardMovement() {
  const symmetricRotationRange = maxRotationRange / 2;

  const velocityFactor = 0.15;

  const rotationVelocityFactor =
    (1.1 * velocityFactor) / symmetricRotationRange;

  const keyActions = {
    // page up
    33: () => (camY -= velocityFactor),

    // page down
    34: () => (camY += velocityFactor),

    // a
    65: () => (camX += velocityFactor),

    // d
    68: () => (camX -= velocityFactor),

    // w
    87: () => {
      camZ += velocityFactor;
      camX -= mouseRotationX * rotationVelocityFactor;
      camY += mouseRotationY * rotationVelocityFactor;
    },

    // s
    83: () => {
      camZ -= velocityFactor;
      camX += mouseRotationX * rotationVelocityFactor;
      camY -= mouseRotationY * rotationVelocityFactor;
    },
  };

  Object.entries(keyActions).forEach(([keyCode, fn]) => {
    if (teclasPressionadas[keyCode]) {
      fn();
    }
  });
}

function desenharCena() {
  mat4.translate(mMatrix, mMatrix, [camX, camY, camZ]);

  mat4.rotate(vMatrix, vMatrix, degToRad(mouseRotationX), [0, 1, 0]);
  mat4.rotate(vMatrix, vMatrix, degToRad(mouseRotationY), [1, 0, 0]);

  mat4.translate(mMatrix, mMatrix, [-3, 0, 0]);
  desenharCubo();

  mat4.translate(mMatrix, mMatrix, [3, 0, 0]);
  desenharCubo();

  mat4.translate(mMatrix, mMatrix, [3, 0, 0]);
  desenharCubo();
}

function desenharCubo() {
  mPushMatrix();

  drawBufferObject(
    cuboVertexPositionBuffer,
    null,
    cuboVertexIndexBuffer,
    gl.TRIANGLES,
    cuboVertexTextureCoordBuffer,
    textures[0]
  );

  mPopMatrix();
}

function animate() {}

function createCubo() {
  // eslint-disable-next-line no-undef
  cuboVertexPositionBuffer = createCuboVertexPositionBuffer();
  // eslint-disable-next-line no-undef
  cuboVertexIndexBuffer = createCuboVertexIndexBuffer();
  // eslint-disable-next-line no-undef
  cuboVertexTextureCoordBuffer = createCuboVertexTextureCoordBuffer();
}

function eventoTeclaPress(evento) {
  if (handledKeys.includes(evento.keyCode)) {
    evento.preventDefault();
  }

  teclasPressionadas[evento.keyCode] = true;
}

function eventoTeclaSolta(evento) {
  teclasPressionadas[evento.keyCode] = false;
}

function handleMouseMove(event) {
  defineCamRotation(event.clientX, event.clientY);
}

function defineCamRotation(mousePositionX, mousePositionY) {
  mouseRotationX =
    (mousePositionX / window.innerWidth) * maxRotationRange -
    maxRotationRange / 2;

  mouseRotationY =
    (mousePositionY / window.innerHeight) * maxRotationRange -
    maxRotationRange / 2;
}

function initTextures(texturesImgs) {
  // eslint-disable-next-line no-undef
  textures = texturesImgs.map((img) => initTexture(img));
}
