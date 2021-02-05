let cuboVertexPositionBuffer;
let cuboVertexColorBuffer;

let cuboVertexIndexBuffer;

let rCubo = 0;

document.addEventListener("afterPrepareWebGl", () => {
  iniciarAmbiente();
  createCubo();

  // iniciarTextura();

  tick();
});

function iniciarAmbiente() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
}

function tick() {
  requestAnimFrame(tick);
  prepareScene();
  desenharCena();
  animate();
}

function desenharCena() {
  mat4.translate(mMatrix, mMatrix, [-9, 3.3, -10.5]);

  const horizontalSpace = 6;
  const verticalSpace = 6;
  const lines = 2;
  const itemsPerLine = 2;

  for (let i = 0; i < lines; i++) {
    mat4.translate(mMatrix, mMatrix, [horizontalSpace, 0, 0]);

    desenharCubo();

    mat4.translate(mMatrix, mMatrix, [horizontalSpace, 0, 0]);
    desenharCubo();

    mat4.translate(mMatrix, mMatrix, [
      -itemsPerLine * horizontalSpace,
      -verticalSpace,
      0,
    ]);
  }
}

function desenharCubo() {
  mPushMatrix();
  mat4.rotate(mMatrix, mMatrix, degToRad(rCubo), [1, 1, 1]);

  drawBufferObject(
    cuboVertexPositionBuffer,
    cuboVertexColorBuffer,
    cuboVertexIndexBuffer,
    gl.TRIANGLES
  );

  mPopMatrix();
}

let lastTimestamp = 0;
function animate() {
  var currentTimestamp = new Date().getTime();

  if (lastTimestamp != 0) {
    var diffInSeconds = (currentTimestamp - lastTimestamp) / 1000.0;

    rCubo += (60 * diffInSeconds) % 360.0;
  }

  lastTimestamp = currentTimestamp;
}

function createCubo() {
  // eslint-disable-next-line no-undef
  cuboVertexPositionBuffer = createCuboVertexPositionBuffer();
  // eslint-disable-next-line no-undef
  cuboVertexColorBuffer = createCuboVertexColorBuffer();
  // eslint-disable-next-line no-undef
  cuboVertexIndexBuffer = createCuboVertexIndexBuffer();
  // eslint-disable-next-line no-undef
  cuboVertexTextureCoordBuffer = createCuboVertexTextureCoordBuffer();
}
