// eslint-disable-next-line no-unused-vars
function Cube() {
  let cuboVertexPositionBuffer;
  let cuboVertexIndexBuffer;
  let cuboVertexTextureCoordBuffer;

  return {
    createBuffers: createBuffers,
    draw: draw,
  };

  // eslint-disable-next-line no-unused-vars
  function createBuffers() {
    const definition = new CubeDefinition();

    cuboVertexPositionBuffer = definition.getVertexPositionBuffer();
    cuboVertexIndexBuffer = definition.getVertexIndexBuffer();
    cuboVertexTextureCoordBuffer = definition.getVertexTextureCoordBuffer();
  }

  function draw([x, y, z], [rotX, rotY, rotZ], texture) {
    executeTranslations([x, y, z]);
    executeRotations([rotX, rotY, rotZ]);

    drawBufferObject(
      cuboVertexPositionBuffer,
      null,
      cuboVertexIndexBuffer,
      gl.TRIANGLES,
      cuboVertexTextureCoordBuffer,
      texture
    );
  }

  function executeTranslations([x, y, z]) {
    mat4.translate(mMatrix, mMatrix, [x, y, z]);
  }

  function executeRotations([rotX, rotY, rotZ]) {
    mat4.rotate(mMatrix, mMatrix, degToRad(rotX), [1, 0, 0]);
    mat4.rotate(mMatrix, mMatrix, degToRad(rotY), [0, 1, 0]);
    mat4.rotate(mMatrix, mMatrix, degToRad(rotZ), [0, 0, 1]);
  }
}
