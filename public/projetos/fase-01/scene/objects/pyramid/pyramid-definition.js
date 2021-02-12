// eslint-disable-next-line no-unused-vars
function PyramidDefinition() {
  return {
    vertexPositionBuffer: getVertexPositionBuffer(),
    vertexIndexBuffer: getVertexIndexBuffer(),
    vertexTextureCoordBuffer: getVertexTextureCoordBuffer(),
  };

  function getVertexPositionBuffer() {
    return WebGLFunctions.createBuffer([
      // Frente
      [0, 1, 0],
      [-1, -1, 1],
      [1, -1, 1],

      // Direita
      [0, 1, 0],
      [1, -1, 1],
      [1, -1, -1],

      // Trás
      [0, 1, 0],
      [1, -1, -1],
      [-1, -1, -1],

      // Esquerda
      [0, 1, 0],
      [-1, -1, -1],
      [-1, -1, 1],

      // Baixo
      [-1, -1, 1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, -1, -1],
    ]);
  }

  function getVertexIndexBuffer() {
    const indexVector = [];

    for (let i = 0; i < 4; i++) {
      const ref = i * 3;
      indexVector.push(ref, ref + 1, ref + 2);
    }

    const squareIndex = 4 * 3;
    indexVector.push(squareIndex, squareIndex + 1, squareIndex + 2);
    indexVector.push(squareIndex, squareIndex + 2, squareIndex + 3);

    console.log(squareIndex);
    return WebGLFunctions.createIndexBuffer(
      indexVector.map((value) => [value])
    );
  }

  function getVertexTextureCoordBuffer() {
    return WebGLFunctions.createBuffer([
      // Frente
      [0.0, 0.0],
      [1.0, 0.0],
      [0.0, 1.0],

      // Trás
      [0.0, 0.0],
      [1.0, 0.0],
      [0.0, 1.0],

      // Topo
      [0.0, 0.0],
      [1.0, 0.0],
      [0.0, 1.0],

      // Direita
      [0.0, 0.0],
      [1.0, 0.0],
      [0.0, 1.0],

      // Esquerda
      [0.0, 0.0],
      [1.0, 0.0],
      [0.0, 1.0],

      // Base
      [1.0, 1.0],
      [0.0, 1.0],
      [0.0, 0.0],
      [1.0, 0.0],
    ]);
  }
}
