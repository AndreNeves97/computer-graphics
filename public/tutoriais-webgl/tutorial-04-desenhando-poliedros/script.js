let piramideVertexPositionBuffer;
let piramideVertexColorBuffer;

let cuboVertexPositionBuffer;
let cuboVertexColorBuffer;

let cuboVertexIndexBuffer;

let rPiramide = 0;
let rCubo = 0;

document.addEventListener("afterPrepareWebGl", () => {
  iniciarAmbiente();
  createPiramide();
  createCubo();

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
  mat4.translate(mMatrix, mMatrix, [-10, 6, -14.5]);

  const horizontalSpace = 3.9;
  const verticalSpace = 3.9;
  const itemsPerLine = 4;

  for (let i = 0; i < itemsPerLine; i++) {
    mat4.translate(mMatrix, mMatrix, [horizontalSpace, 0, 0]);
    desenharPiramide();

    mat4.translate(mMatrix, mMatrix, [horizontalSpace, 0, 0]);
    desenharCubo();

    mat4.translate(mMatrix, mMatrix, [horizontalSpace, 0, 0]);
    desenharPiramide();

    mat4.translate(mMatrix, mMatrix, [horizontalSpace, 0, 0]);
    desenharCubo();

    mat4.translate(mMatrix, mMatrix, [
      -itemsPerLine * horizontalSpace,
      -verticalSpace,
      0,
    ]);
  }
}

function desenharPiramide() {
  mPushMatrix();
  mat4.rotate(mMatrix, mMatrix, degToRad(rPiramide), [0, 1, 0.5]);

  drawBufferObject(piramideVertexPositionBuffer, piramideVertexColorBuffer);

  mPopMatrix();
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

    rPiramide += (60 * diffInSeconds) % 360.0;
    rCubo += (60 * diffInSeconds) % 360.0;
  }

  lastTimestamp = currentTimestamp;
}

function createPiramide() {
  piramideVertexPositionBuffer = createBuffer([
    // Frente
    [0, 1, 0],
    [-1, -1, 1],
    [1, -1, 1],

    // Direita
    [0, 1, 0],
    [1, -1, 1],
    [1, -1, -1],

    // Trás
    [0, 1, 0],
    [1, -1, -1],
    [-1, -1, -1],

    // Esquerda
    [0, 1, 0],
    [-1, -1, -1],
    [-1, -1, 1],

    // Baixo
    [1, -1, -1],
    [1, -1, 1],
  ]);

  piramideVertexColorBuffer = createBuffer([
    // Frente
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 1],

    // Direita
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 0, 1],

    // Trás
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 1],

    // Esquerda
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [1, 0, 0, 1],

    // Baixo
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ]);
}

function createCubo() {
  cuboVertexPositionBuffer = createBuffer([
    // Frente
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],

    // Trás
    [-1, -1, -1],
    [-1, 1, -1],
    [1, 1, -1],
    [1, -1, -1],

    // Topo
    [-1, 1, -1],
    [-1, 1, 1],
    [1, 1, 1],
    [1, 1, -1],

    // Base
    [-1, -1, -1],
    [1, -1, -1],
    [1, -1, 1],
    [-1, -1, 1],

    // Direita
    [1, -1, -1],
    [1, 1, -1],
    [1, 1, 1],
    [1, -1, 1],

    // Esquerda
    [-1, -1, -1],
    [-1, -1, 1],
    [-1, 1, 1],
    [-1, 1, -1],
  ]);

  cuboVertexColorBuffer = createBuffer([
    // Frente
    [1.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],

    // Trás
    [1.0, 1.0, 0.0, 1.0],
    [1.0, 1.0, 0.0, 1.0],
    [1.0, 1.0, 0.0, 1.0],
    [1.0, 1.0, 0.0, 1.0],

    // Topo
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],

    // Base
    [1.0, 0.5, 0.5, 1.0],
    [1.0, 0.5, 0.5, 1.0],
    [1.0, 0.5, 0.5, 1.0],
    [1.0, 0.5, 0.5, 1.0],

    // Direita
    [1.0, 0.0, 1.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],

    // Esquerda
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
  ]);

  const indexVector = [];

  for (let i = 0; i < 6; i++) {
    const ref = i * 4;

    indexVector.push(ref);
    indexVector.push(ref + 1);
    indexVector.push(ref + 2);

    indexVector.push(ref);
    indexVector.push(ref + 2);
    indexVector.push(ref + 3);
  }

  cuboVertexIndexBuffer = createIndexBuffer(
    indexVector.map((value) => [value])
  );
}
