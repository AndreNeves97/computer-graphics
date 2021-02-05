let cuboVertexPositionBuffer;
let cuboVertexIndexBuffer;
var cuboVertexTextureCoordBuffer;

var caixaTextura;

var xRot = 0;
var yRot = 0;
var zRot = 0;

document.addEventListener("afterPrepareWebGl", () => {
  iniciarAmbiente();
  createCubo();
  iniciarTextura();

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
  mat4.translate(mMatrix, mMatrix, [-6, 0, -3.7]);

  const horizontalSpace = 6;
  mat4.translate(mMatrix, mMatrix, [horizontalSpace, 0, 0]);

  desenharCubo();
}

function desenharCubo() {
  mat4.rotate(mMatrix, mMatrix, degToRad(xRot), [1, 0, 0]);
  mat4.rotate(mMatrix, mMatrix, degToRad(yRot), [0, 1, 0]);
  mat4.rotate(mMatrix, mMatrix, degToRad(zRot), [0, 0, 1]);

  drawBufferObject(
    cuboVertexPositionBuffer,
    null,
    cuboVertexIndexBuffer,
    gl.TRIANGLES,
    cuboVertexTextureCoordBuffer,
    [caixaTextura]
  );
}

let lastTimestamp = 0;
function animate() {
  var currentTimestamp = new Date().getTime();

  if (lastTimestamp != 0) {
    var diffInSeconds = (currentTimestamp - lastTimestamp) / 1000.0;

    zRot += (22 * diffInSeconds) % 360.0;
    xRot += (15 * diffInSeconds) % 360.0;
    yRot += (12 * diffInSeconds) % 360.0;
  }

  lastTimestamp = currentTimestamp;
}

function createCubo() {
  // eslint-disable-next-line no-undef
  cuboVertexPositionBuffer = createCuboVertexPositionBuffer();
  // eslint-disable-next-line no-undef
  cuboVertexIndexBuffer = createCuboVertexIndexBuffer();
  // eslint-disable-next-line no-undef
  cuboVertexTextureCoordBuffer = createCuboVertexTextureCoordBuffer();
}

function iniciarTextura() {
  caixaTextura = gl.createTexture();
  caixaTextura.image = new Image();
  // predioTextura.crossOrigin.image = "anonymous"; // ask for CORS permission();

  caixaTextura.image.onload = function () {
    tratarTextura(caixaTextura);
  };
  caixaTextura.image.src = "caixa.gif";
  shaderProgram.samplerUniform = gl.getUniformLocation(
    shaderProgram,
    "uSampler"
  );
}

function tratarTextura(textura) {
  gl.bindTexture(gl.TEXTURE_2D, textura);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    textura.image
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.bindTexture(gl.TEXTURE_2D, null);
}
