// eslint-disable-next-line no-unused-vars
function CubeDefinition() {
  return {
    getVertexPositionBuffer: getVertexPositionBuffer,
    getVertexIndexBuffer: getVertexIndexBuffer,
    getVertexTextureCoordBuffer: getVertexTextureCoordBuffer,
  };

  function getVertexPositionBuffer() {
    return createBuffer([
      // Frente
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],

      // Trás
      [-1, -1, -1],
      [-1, 1, -1],
      [1, 1, -1],
      [1, -1, -1],

      // Topo
      [-1, 1, -1],
      [-1, 1, 1],
      [1, 1, 1],
      [1, 1, -1],

      // Base
      [-1, -1, -1],
      [1, -1, -1],
      [1, -1, 1],
      [-1, -1, 1],

      // Direita
      [1, -1, -1],
      [1, 1, -1],
      [1, 1, 1],
      [1, -1, 1],

      // Esquerda
      [-1, -1, -1],
      [-1, -1, 1],
      [-1, 1, 1],
      [-1, 1, -1],
    ]);
  }

  function getVertexIndexBuffer() {
    const indexVector = [];

    for (let i = 0; i < 6; i++) {
      const ref = i * 4;

      indexVector.push(ref);
      indexVector.push(ref + 1);
      indexVector.push(ref + 2);

      indexVector.push(ref);
      indexVector.push(ref + 2);
      indexVector.push(ref + 3);
    }

    return createIndexBuffer(indexVector.map((value) => [value]));
  }

  function getVertexTextureCoordBuffer() {
    return createBuffer([
      // Frente
      [0.0, 0.0],
      [1.0, 0.0],
      [1.0, 1.0],
      [0.0, 1.0],

      // Trás
      [1.0, 0.0],
      [1.0, 1.0],
      [0.0, 1.0],
      [0.0, 0.0],

      // Topo
      [0.0, 1.0],
      [0.0, 0.0],
      [1.0, 0.0],
      [1.0, 1.0],

      // Base
      [1.0, 1.0],
      [0.0, 1.0],
      [0.0, 0.0],
      [1.0, 0.0],

      // Direi]ta
      [1.0, 0.0],
      [1.0, 1.0],
      [0.0, 1.0],
      [0.0, 0.0],

      // Esque]rda
      [0.0, 0.0],
      [1.0, 0.0],
      [1.0, 1.0],
      [0.0, 1.0],
    ]);
  }
}
