let cuboVertexPositionBuffer;
let cuboVertexIndexBuffer;
var cuboVertexTextureCoordBuffer;

let canvasWidth;
let canvasHeight;

const maxRotationRangeX = degToRad(360);
const maxRotationRangeY = degToRad(180);

let camX = 0;
let camY = 0;
let camZ = -9;

let camRotationX = 0;
let camRotationY = 0;
let camRotationZ = 0;

let sinRotationX = 0;
let sinRotationY = 0;
let cosRotationX = 1;
let cosRotationY = 1;

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

  const canvas = $("#canvas-webgl")[0];
  document.onmousemove = handleMouseMove;

  canvasWidth = canvas.width;
  canvasHeight = canvas.height;

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
  const velocityFactor = 0.15;

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

  Object.entries(keyActions).forEach(([keyCode, fn]) => {
    if (teclasPressionadas[keyCode]) {
      fn();
    }
  });
}

function desenharCena() {
  mat4.translate(mMatrix, mMatrix, [camX, camY, camZ]);

  mat4.rotate(vMatrix, vMatrix, camRotationX, [0, 1, 0]);
  mat4.rotate(vMatrix, vMatrix, camRotationY, [1, 0, 0]);
  mat4.rotate(vMatrix, vMatrix, camRotationZ, [0, 0, 1]);

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
    (mousePositionX / objectWidth) * maxRotationRangeX - maxRotationRangeX / 2;

  const mouseRotationY =
    (mousePositionY / objectHeight) * maxRotationRangeY - maxRotationRangeY / 2;

  sinRotationX = Math.sin(mouseRotationX);
  sinRotationY = Math.sin(mouseRotationY);

  cosRotationX = Math.cos(mouseRotationX);
  cosRotationY = Math.cos(mouseRotationY);

  camRotationX = mouseRotationX;
  camRotationY = mouseRotationY * cosRotationX;
  camRotationZ = mouseRotationY * sinRotationX;
}

function initTextures(texturesImgs) {
  // eslint-disable-next-line no-undef
  textures = texturesImgs.map((img) => initTexture(img));
}
