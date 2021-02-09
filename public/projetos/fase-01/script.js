let cuboVertexPositionBuffer;
let cuboVertexIndexBuffer;
var cuboVertexTextureCoordBuffer;

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

  tick();
});

function iniciarAmbiente() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
}

function tick() {
  requestAnimFrame(tick);

  prepareScene();

  // eslint-disable-next-line no-undef
  tickKeyboardMovement();

  desenharCena();
  animate();
}

function desenharCena() {
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

function initTextures(texturesImgs) {
  // eslint-disable-next-line no-undef
  textures = texturesImgs.map((img) => initTexture(img));
}
