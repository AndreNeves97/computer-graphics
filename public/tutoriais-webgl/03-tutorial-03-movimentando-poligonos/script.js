let triangleVertexPositionBuffer;
let triangleVertexColorBuffer;

let squareVertexPositionBuffer;
let squareVertexColorBuffer;

let rTri = 0;
let rQuad = 0;

document.addEventListener("afterPrepareWebGl", () => {
  iniciarAmbiente();
  createTriangle();
  createSquare();

  tick();
});

function iniciarAmbiente() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
}

function createTriangle() {
  triangleVertexPositionBuffer = createBuffer([
    [0, 1, 0],
    [-1, -1, 0],
    [1, -1, 0],
  ]);

  triangleVertexColorBuffer = createBuffer([
    [1.0, 0.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
  ]);
}

function createSquare() {
  squareVertexPositionBuffer = createBuffer([
    [1.0, 1.0, 0.0],
    [-1.0, 1.0, 0.0],
    [1.0, -1.0, 0.0],
    [-1.0, -1.0, 0.0],
  ]);

  squareVertexColorBuffer = createBuffer([
    [0.5, 0.5, 1.0, 1.0],
    [0.5, 0.5, 1.0, 1.0],
    [0.5, 0.5, 1.0, 1.0],
    [0.5, 0.5, 1.0, 1.0],
  ]);
}

function tick() {
  requestAnimFrame(tick);
  prepareScene();
  desenharCena();
  animate();
}

function desenharCena() {
  mat4.translate(mMatrix, mMatrix, [-9.6, 7, -15.2]);

  for (let i = 0; i < 7; i++) {
    mat4.translate(mMatrix, mMatrix, [2.4, 0, 0]);
    desenharTriangulo();

    mat4.translate(mMatrix, mMatrix, [2.4, 0, 0]);
    desenharQuadrado();

    mat4.translate(mMatrix, mMatrix, [2.4, 0, 0]);
    desenharTriangulo();

    mat4.translate(mMatrix, mMatrix, [2.4, 0, 0]);
    desenharQuadrado();

    mat4.translate(mMatrix, mMatrix, [2.4, 0, 0]);
    desenharTriangulo();

    mat4.translate(mMatrix, mMatrix, [2.4, 0, 0]);
    desenharQuadrado();

    mat4.translate(mMatrix, mMatrix, [2.4, 0, 0]);
    desenharTriangulo();

    mat4.translate(mMatrix, mMatrix, [-7 * 2.4, -2.3, 0]);
  }
}

function desenharTriangulo() {
  mPushMatrix();
  mat4.rotate(mMatrix, mMatrix, degToRad(rTri), [0, 1, 0]);

  drawBufferObject(triangleVertexPositionBuffer, triangleVertexColorBuffer);

  mPopMatrix();
}

function desenharQuadrado() {
  mPushMatrix();
  mat4.rotate(mMatrix, mMatrix, degToRad(rQuad), [0, -1, 0]);

  drawBufferObject(squareVertexPositionBuffer, squareVertexColorBuffer);

  mPopMatrix();
}

let lastTimestamp = 0;
function animate() {
  var currentTimestamp = new Date().getTime();

  if (lastTimestamp != 0) {
    var diffInSeconds = (currentTimestamp - lastTimestamp) / 1000.0;

    rTri += (60 * diffInSeconds) % 360.0;
    rQuad += (60 * diffInSeconds) % 360.0;
  }

  lastTimestamp = currentTimestamp;
}
