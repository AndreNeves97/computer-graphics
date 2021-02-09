let cuboVertexPositionBuffer;
let cuboVertexIndexBuffer;
let cuboVertexTextureCoordBuffer;

let textures;

// eslint-disable-next-line no-unused-vars
function initSceneObjects() {
  createCubo();

  // eslint-disable-next-line no-undef
  textures = initTextures();
}

// eslint-disable-next-line no-unused-vars
function tickDrawSceneObjects() {
  mat4.translate(mMatrix, mMatrix, [-3, 0, 0]);
  desenharCubo();

  mat4.translate(mMatrix, mMatrix, [3, 0, 0]);
  desenharCubo();

  mat4.translate(mMatrix, mMatrix, [3, 0, 0]);
  desenharCubo();

  animate();
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
