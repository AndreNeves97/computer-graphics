var mMatrix = mat4.create();
var vMatrix = mat4.create();
var pMatrix = mat4.create();

setTimeout(() => location.reload(), 3000);

let triangleVertexPositionBuffer;
let squareVertexPositionBuffer;

document.addEventListener("afterPrepareWebGl", () => {
  iniciarAmbiente();
  iniciarBuffers();
  desenharCena();
});

function iniciarAmbiente() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
}

function iniciarBuffers() {
  triangleVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);

  var vertices = [0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  triangleVertexPositionBuffer.itemSize = 3;
  triangleVertexPositionBuffer.numItems = 3;

  squareVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);

  vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  squareVertexPositionBuffer.itemSize = 3;
  squareVertexPositionBuffer.numItems = 4;
}

function desenharCena() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(
    pMatrix,
    45,
    gl.viewportWidth / gl.viewportHeight,
    0.1,
    100.0
  );

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
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexPositionAttribute,
    triangleVertexPositionBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
}

function desenharQuadrado() {
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexPositionAttribute,
    squareVertexPositionBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
  gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
}
