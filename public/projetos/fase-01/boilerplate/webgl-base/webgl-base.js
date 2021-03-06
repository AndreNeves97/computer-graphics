let gl;
let shaderProgram;

let mMatrix;
let vMatrix;
let pMatrix;

// eslint-disable-next-line no-unused-vars
function WebGLBase(canvas) {
  return { initWebGL };

  function initWebGL() {
    iniciarGL(canvas);
    initShaderProgram();
    initShaders();
  }

  // eslint-disable-next-line no-unused-vars
  function iniciarGL(canvas) {
    // eslint-disable-next-line no-unused-vars
    mMatrix = mat4.create();
    // eslint-disable-next-line no-unused-vars
    vMatrix = mat4.create();
    // eslint-disable-next-line no-unused-vars
    pMatrix = mat4.create();

    try {
      gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (e) {
      if (!gl) alert("Não pode inicializar WebGL, desculpe");
    }
  }

  function initShaderProgram() {
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
  }

  function initShaders() {
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

    // Texturas
    shaderProgram.vertexTextureCoordAttribute = gl.getAttribLocation(
      shaderProgram,
      "aTextureCoord"
    );
    if (shaderProgram.vertexTextureCoordAttribute != -1) {
      gl.enableVertexAttribArray(shaderProgram.vertexTextureCoordAttribute);
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
}
