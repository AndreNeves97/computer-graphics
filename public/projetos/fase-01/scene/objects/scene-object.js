// eslint-disable-next-line no-unused-vars
function SceneObject(
  vertexPositionBuffer,
  vertexIndexBuffer,
  vertexTextureCoordBuffer,
  vertexcolorBuffer
) {
  return {
    draw,
    drawIsolated,
  };

  function drawIsolated(
    [x, y, z],
    [rotX, rotY, rotZ],
    [scaleX, scaleY, scaleZ],
    texture
  ) {
    WebGLFunctions.mPushMatrix();
    draw([x, y, z], [rotX, rotY, rotZ], [scaleX, scaleY, scaleZ], texture);
    WebGLFunctions.mPopMatrix();
  }

  function draw(
    [x, y, z],
    [rotX, rotY, rotZ],
    [scaleX, scaleY, scaleZ],
    texture
  ) {
    executeTranslations([x, y, z]);
    executeRotations([rotX, rotY, rotZ]);

    WebGLFunctions.mPushMatrix();
    mat4.scale(mMatrix, mMatrix, [scaleX, scaleY, scaleZ]);

    WebGLFunctions.drawBufferObject(
      vertexPositionBuffer,
      vertexcolorBuffer,
      vertexIndexBuffer,
      gl.TRIANGLES,
      vertexTextureCoordBuffer,
      texture
    );

    WebGLFunctions.mPopMatrix();
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
