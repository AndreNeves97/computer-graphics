let triangleVertexPositionBuffer;
let triangleVertexColorBuffer;

let squareVertexPositionBuffer;
let squareVertexColorBuffer;

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

function desenharCena() {
  var translation = vec3.create();

  vec3.set(translation, -9.6, 7, -15.2);
  mat4.translate(mMatrix, mMatrix, translation);

  for (let i = 0; i < 7; i++) {
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

    vec3.set(translation, 2.4, 0, 0);
    mat4.translate(mMatrix, mMatrix, translation);
    desenharTriangulo();

    vec3.set(translation, 2.4, 0, 0);
    mat4.translate(mMatrix, mMatrix, translation);
    desenharQuadrado();

    vec3.set(translation, 2.4, 0, 0);
    mat4.translate(mMatrix, mMatrix, translation);
    desenharTriangulo();

    vec3.set(translation, -7 * 2.4, -2.3, 0);
    mat4.translate(mMatrix, mMatrix, translation);
  }
}

function desenharTriangulo() {
  drawBufferObject(triangleVertexPositionBuffer, triangleVertexColorBuffer);
}

function desenharQuadrado() {
  drawBufferObject(squareVertexPositionBuffer, squareVertexColorBuffer);
}
