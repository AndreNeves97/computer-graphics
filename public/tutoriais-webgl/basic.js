$(function () {
  iniciaWebGL();
});

function iniciaWebGL() {
  var canvas = $("#canvas-webgl")[0];
  iniciarGL(canvas);
  iniciarShaders();

  document.dispatchEvent(new Event("afterPrepareWebGl"));
}

function iniciarGL(canvas) {
  mMatrix = mat4.create();
  vMatrix = mat4.create();
  pMatrix = mat4.create();

  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {
    if (!gl) alert("Não pode inicializar WebGL, desculpe");
  }
}

function iniciarShaders() {
  var vertexShader = getShader(gl, "#shader-vs");
  var fragmentShader = getShader(gl, "#shader-fs");

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Não pode inicializar shaders");
  }

  gl.useProgram(shaderProgram);

  shaderProgram.vertexPositionAttribute = gl.vertexPositionAttribute = gl.getAttribLocation(
    shaderProgram,
    "aVertexPosition"
  );
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  // Cores
  shaderProgram.vertexColorAttribute = gl.getAttribLocation(
    shaderProgram,
    "aVertexColor"
  );

  if (shaderProgram.vertexColorAttribute != -1) {
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
  }

  shaderProgram.pMatrixUniform = gl.getUniformLocation(
    shaderProgram,
    "uPMatrix"
  );
  shaderProgram.vMatrixUniform = gl.getUniformLocation(
    shaderProgram,
    "uVMatrix"
  );
  shaderProgram.mMatrixUniform = gl.getUniformLocation(
    shaderProgram,
    "uMMatrix"
  );
}

function getShader(gl, id) {
  var shaderScript = $(id)[0];
  if (!shaderScript) {
    return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) str += k.textContent;
    k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

// eslint-disable-next-line no-unused-vars
function createBuffer(vertexMatrix) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertexMatrix.flat()),
    gl.STATIC_DRAW
  );

  buffer.numItems = vertexMatrix.length;
  buffer.itemSize = vertexMatrix[0].length;

  return buffer;
}

// eslint-disable-next-line no-unused-vars
function prepareScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(
    pMatrix,
    45,
    gl.viewportWidth / gl.viewportHeight,
    0.1,
    100.0,
    pMatrix
  );

  mat4.identity(mMatrix);
  mat4.identity(vMatrix);
}

// eslint-disable-next-line no-unused-vars
function drawBufferObject(
  positionBufferObject,
  colorBufferObject,
  mode = gl.TRIANGLE_STRIP
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferObject);
  gl.vertexAttribPointer(
    shaderProgram.vertexPositionAttribute,
    positionBufferObject.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  if (!!colorBufferObject) {
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
    gl.vertexAttribPointer(
      shaderProgram.vertexColorAttribute,
      colorBufferObject.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );
  }

  setMatrixUniforms();
  gl.drawArrays(mode, 0, positionBufferObject.numItems);
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
  gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
}

let mMatrixPilha = [];
// eslint-disable-next-line no-unused-vars
function mPushMatrix() {
  var copy = mat4.clone(mMatrix);
  mMatrixPilha.push(copy);
}

// eslint-disable-next-line no-unused-vars
function mPopMatrix() {
  if (mMatrixPilha.length == 0) {
    throw "inválido popMatrix!";
  }
  mMatrix = mMatrixPilha.pop();
}

// eslint-disable-next-line no-unused-vars
function degToRad(graus) {
  return (graus * Math.PI) / 180;
}
