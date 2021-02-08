let cuboVertexPositionBuffer;
let cuboVertexIndexBuffer;
var cuboVertexTextureCoordBuffer;

var xRot = 0;
var xVelo = 0;

var yRot = 0;
var yVelo = 0;

let mouseRotationX = window.innerWidth / 2;
let mouseRotationY = window.innerHeight / 2;

var z = -7;

const handledKeys = [33, 34, 37, 39, 38, 40];
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
  tratarTeclado();
  desenharCena();
  animate();
}

function tratarTeclado() {
  if (teclasPressionadas[33]) {
    // Page Up
    z += 0.05;
  }
  if (teclasPressionadas[34]) {
    // Page Down
    z -= 0.05;
  }
  if (teclasPressionadas[37]) {
    // Esquerda
    if (yVelo >= 1) {
      yVelo -= 1;
    }
  }
  if (teclasPressionadas[39]) {
    // Direita
    yVelo += 1;
  }
  if (teclasPressionadas[38]) {
    // Cima
    xVelo += 1;
  }
  if (teclasPressionadas[40]) {
    // Baixo
    if (xVelo >= 1) {
      xVelo -= 1;
    }
  }
}

function desenharCena() {
  mat4.translate(mMatrix, mMatrix, [0, 0, z - 2]);

  mat4.rotate(mMatrix, mMatrix, degToRad(xRot), [0, 1, 0]);
  mat4.rotate(mMatrix, mMatrix, degToRad(yRot), [1, 0, 0]);

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

function animate() {
  const maxRange = 120;

  xRot = (mouseRotationX / window.innerWidth) * maxRange - maxRange / 2;
  yRot = (mouseRotationY / window.innerHeight) * maxRange - maxRange / 2;
}

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
  mouseRotationX = event.clientX;
  mouseRotationY = event.clientY;
}

function initTextures(texturesImgs) {
  // eslint-disable-next-line no-undef
  textures = texturesImgs.map((img) => initTexture(img));
}
