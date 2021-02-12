// eslint-disable-next-line no-unused-vars
function Pyramid() {
  const definition = new PyramidDefinition();

  return new SceneObject(
    definition.vertexPositionBuffer,
    definition.vertexIndexBuffer,
    definition.vertexTextureCoordBuffer
  );
}
