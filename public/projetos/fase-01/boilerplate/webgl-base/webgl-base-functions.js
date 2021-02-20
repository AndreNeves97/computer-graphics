// eslint-disable-next-line no-unused-vars
const WebGLFunctions = new WebGLFunctionsDef();

function WebGLFunctionsDef() {
  let mMatrixStack = [];

  return {
    prepareScene,
    createBuffer,
    createIndexBuffer,
    drawBufferObject,
    mPushMatrix,
    mPopMatrix,
  };

  function prepareScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(
      pMatrix,
      45,
      gl.viewportWidth / gl.viewportHeight,
      0.1,
      500.0,
      pMatrix
    );

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);
  }

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

  function createIndexBuffer(vertexMatrix) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(vertexMatrix.flat()),
      gl.STATIC_DRAW
    );

    buffer.numItems = vertexMatrix.length;
    buffer.itemSize = vertexMatrix[0].length;

    return buffer;
  }

  function drawBufferObject(
    positionBufferObject,
    colorBufferObject,
    indexBufferObject = null,
    mode = gl.TRIANGLE_STRIP,
    textureBufferObject = null,
    texture
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

    if (!!textureBufferObject) {
      gl.bindBuffer(gl.ARRAY_BUFFER, textureBufferObject);
      gl.vertexAttribPointer(
        shaderProgram.vertexTextureCoordAttribute,
        textureBufferObject.itemSize,
        gl.FLOAT,
        false,
        0,
        0
      );

      if (!!texture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
      }
    }

    setMatrixUniforms();

    if (!!indexBufferObject) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
      gl.drawElements(mode, indexBufferObject.numItems, gl.UNSIGNED_SHORT, 0);
      return;
    }

    gl.drawArrays(mode, 0, positionBufferObject.numItems);
  }

  function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
    gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
  }

  function mPushMatrix() {
    var copy = mat4.clone(mMatrix);
    mMatrixStack.push(copy);
  }

  function mPopMatrix() {
    if (mMatrixStack.length == 0) {
      throw "inválido popMatrix!";
    }
    mMatrix = mMatrixStack.pop();
  }
}
