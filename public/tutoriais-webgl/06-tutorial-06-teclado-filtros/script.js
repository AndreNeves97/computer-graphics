let cuboVertexPositionBuffer;
let cuboVertexIndexBuffer;
var cuboVertexTextureCoordBuffer;

var texturas = Array();

var xRot = 0;
var xVelo = 0;

var yRot = 0;
var yVelo = 0;

var z = -5;

var filtro = 0;

var teclasPressionadas = {};

document.addEventListener("afterPrepareWebGl", () => {
  iniciarAmbiente();
  createCubo();
  iniciarTextura();

  document.onkeydown = eventoTeclaPress;
  document.onkeyup = eventoTeclaSolta;

  tick();
});

function iniciarAmbiente() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
}

function tick() {
  requestAnimFrame(tick);
  prepareScene();
  tratarTeclado();
  desenharCena();
  animate();
}

function tratarTeclado() {
  if (teclasPressionadas[33]) {
    // Page Up
    z += 0.05;
  }
  if (teclasPressionadas[34]) {
    // Page Down
    z -= 0.05;
  }
  if (teclasPressionadas[37]) {
    // Esquerda
    if (yVelo >= 1) {
      yVelo -= 1;
    }
  }
  if (teclasPressionadas[39]) {
    // Direita
    yVelo += 1;
  }
  if (teclasPressionadas[38]) {
    // Cima
    xVelo += 1;
  }
  if (teclasPressionadas[40]) {
    // Baixo
    if (xVelo >= 1) {
      xVelo -= 1;
    }
  }
}

function desenharCena() {
  mat4.translate(mMatrix, mMatrix, [0.0, 0.0, z]);
  desenharCubo();
}

function desenharCubo() {
  mat4.rotate(mMatrix, mMatrix, degToRad(xRot), [1, 0, 0]);
  mat4.rotate(mMatrix, mMatrix, degToRad(yRot), [0, 1, 0]);

  drawBufferObject(
    cuboVertexPositionBuffer,
    null,
    cuboVertexIndexBuffer,
    gl.TRIANGLES,
    cuboVertexTextureCoordBuffer,
    texturas,
    filtro
  );
}

let lastTimestamp = 0;
function animate() {
  var currentTimestamp = new Date().getTime();

  if (lastTimestamp != 0) {
    var diffInSeconds = (currentTimestamp - lastTimestamp) / 1000.0;

    xRot += (xVelo * diffInSeconds) % 360.0;
    yRot += (yVelo * diffInSeconds) % 360.0;
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
  var images = new Image();

  for (var i = 0; i < 3; i++) {
    var textura = gl.createTexture();
    textura.image = images;
    texturas.push(textura);
  }

  images.onload = function () {
    tratarTextura(texturas);
  };

  images.src = "caixa.gif";
  shaderProgram.samplerUniform = gl.getUniformLocation(
    shaderProgram,
    "uSampler"
  );
}

function tratarTextura(texturas) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  gl.bindTexture(gl.TEXTURE_2D, texturas[0]);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texturas[0].image
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

  gl.bindTexture(gl.TEXTURE_2D, texturas[1]);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texturas[1].image
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.bindTexture(gl.TEXTURE_2D, texturas[2]);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texturas[2].image
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_NEAREST
  );

  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindTexture(gl.TEXTURE_2D, null);
}

function eventoTeclaPress(evento) {
  teclasPressionadas[evento.keyCode] = true;

  if (String.fromCharCode(evento.keyCode) == "F") filtro = (filtro + 1) % 3;
}

function eventoTeclaSolta(evento) {
  teclasPressionadas[evento.keyCode] = false;
}
