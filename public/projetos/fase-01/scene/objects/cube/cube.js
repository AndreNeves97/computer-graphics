// eslint-disable-next-line no-unused-vars
function Cube() {
  const definition = new CubeDefinition();

  return new SceneObject(
    definition.vertexPositionBuffer,
    definition.vertexIndexBuffer,
    definition.vertexTextureCoordBuffer
  );
}
