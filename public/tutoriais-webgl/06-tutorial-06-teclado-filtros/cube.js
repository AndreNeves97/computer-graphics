/* eslint-disable no-unused-vars */

function createCuboVertexPositionBuffer() {
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

function createCuboVertexColorBuffer() {
  return createBuffer([
    // Frente
    [1.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],

    // Trás
    [1.0, 1.0, 0.0, 1.0],
    [1.0, 1.0, 0.0, 1.0],
    [1.0, 1.0, 0.0, 1.0],
    [1.0, 1.0, 0.0, 1.0],

    // Topo
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],

    // Base
    [1.0, 0.5, 0.5, 1.0],
    [1.0, 0.5, 0.5, 1.0],
    [1.0, 0.5, 0.5, 1.0],
    [1.0, 0.5, 0.5, 1.0],

    // Direita
    [1.0, 0.0, 1.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],

    // Esquerda
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
  ]);
}

function createCuboVertexIndexBuffer() {
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

function createCuboVertexTextureCoordBuffer() {
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
