// eslint-disable-next-line no-unused-vars
function Scene() {
  const cube = new Cube();
  const pyramid = new Pyramid();

  const texturesImgs = [
    "scene/textures/texture-1.jpg",
    "scene/textures/texture-2.jpg",
    "scene/textures/texture-3.jpg",
    "scene/textures/texture-4.jpg",
    "scene/textures/texture-5.jpg",
  ];

  let textures;
  let lastTimestamp = 0;
  let rotation = 0;

  return {
    initSceneObjects,
    tickDrawSceneObjects,
  };

  function initSceneObjects() {
    textures = texturesImgs.map((img) => initTexture(img));
  }

  function animate() {
    var currentTimestamp = new Date().getTime();

    if (lastTimestamp != 0) {
      var diffInSeconds = (currentTimestamp - lastTimestamp) / 1000.0;

      rotation += (60 * diffInSeconds) % 360.0;
    }

    lastTimestamp = currentTimestamp;
  }

  function tickDrawSceneObjects() {
    drawFloor();
    drawPyramids();
    drawCubes();

    animate();
  }

  function drawFloor() {
    cube.drawIsolated(
      [1, -1, -40],
      [0, 0, 0],
      [100, 1, 100],
      textures[2],
      false
    );
  }

  function drawPyramids() {
    pyramid.drawIsolated([-20, 0, -100], [0, 0, 0], [30, 35, 30], textures[3]);

    pyramid.drawIsolated([-45, 0, -30], [0, 0, 0], [15, 20, 15], textures[1]);
    pyramid.drawIsolated([5, 0, -30], [0, 0, 0], [15, 20, 15], textures[4]);

    pyramid.drawIsolated([-45, 0, 5], [0, 0, 0], [10, 15, 10], textures[0]);
    pyramid.drawIsolated([-20, 0, 5], [0, 0, 0], [10, 15, 10], textures[2]);
    pyramid.drawIsolated([2, 0, 5], [0, 0, 0], [10, 15, 10], textures[3]);

    pyramid.drawIsolated([-30, 0, 30], [0, 0, 0], [7, 9, 7], textures[1]);
    pyramid.drawIsolated([-7, 0, 30], [0, 0, 0], [7, 9, 7], textures[0]);
  }

  function drawCubes() {
    cube.draw(
      [50, 60, -100],
      [0, rotation * 0.8, 0],
      [15, 15, 15],
      textures[0]
    );

    cube.drawIsolated(
      [-30, 0, 0],
      [rotation * 2, rotation * 0.6, rotation * 1.3],
      [7, 7, 7],
      textures[1],
      false
    );

    cube.drawIsolated(
      [30, 0, 0],
      [rotation * 0.9, rotation * 0.6, rotation],
      [7, 7, 7],
      textures[1],
      false
    );
  }
}
