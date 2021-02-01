let triangleVertexPositionBuffer;
let squareVertexPositionBuffer;

document.addEventListener("afterPrepareWebGl", () => {
  iniciarAmbiente();
  createTriangle();
  createSquare();

  prepareScene();
  desenharCena();
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
}

function createSquare() {
  squareVertexPositionBuffer = createBuffer([
    [1.0, 1.0, 0.0],
    [-1.0, 1.0, 0.0],
    [1.0, -1.0, 0.0],
    [-1.0, -1.0, 0.0],
  ]);
}

function desenharCena() {
  mat4.identity(mMatrix);
  mat4.identity(vMatrix);

  var translation = vec3.create();

  vec3.set(translation, -6.25, 3.7, -10.0);
  mat4.translate(mMatrix, mMatrix, translation);

  for (let i = 0; i < 4; i++) {
    vec3.set(translation, 2.4, 0, 0);
    mat4.translate(mMatrix, mMatrix, translation);
    desenharTriangulo();

    vec3.set(translation, 2.4, 0, 0);
    mat4.translate(mMatrix, mMatrix, translation);
    desenharQuadrado();

    vec3.set(translation, 2.4, 0, 0);
    mat4.translate(mMatrix, mMatrix, translation);
    desenharTriangulo();

    vec3.set(translation, 2.4, 0, 0);
    mat4.translate(mMatrix, mMatrix, translation);
    desenharQuadrado();

    vec3.set(translation, -4 * 2.4, -2.5, 0);
    mat4.translate(mMatrix, mMatrix, translation);
  }
}

function desenharTriangulo() {
  drawBufferObject(triangleVertexPositionBuffer);
}

function desenharQuadrado() {
  drawBufferObject(squareVertexPositionBuffer);
}
