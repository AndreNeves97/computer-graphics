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

  function tickDrawSceneObjects() {
    cube.drawIsolated([1, -1, 1], [0, 0, 0], [100, 1, 100], textures[2], false);

    cube.drawIsolated([8, 7, 0], [rotation, 0, 0], [2, 1, 1], textures[0]);
    cube.drawIsolated([16, 7, 0], [0, rotation, 0], [1, 1, 2], textures[1]);

    pyramid.drawIsolated([-20, 0, 2], [0, 0, 0], [7, 7, 7], textures[1]);
    pyramid.drawIsolated([-2, 0, 5], [0, 0, 0], [5, 5, 5], textures[3]);
    pyramid.drawIsolated([-14, 0, -25], [0, 0, 0], [15, 15, 15], textures[0]);
    // pyramid.drawIsolated([-4, 9, 0], [0, 0, 0], [8, 8, 8], textures[1]);

    cube.draw([12, 4, 0], [0, 0, 0], [2, 0.5, 2], textures[0]);
    cube.drawIsolated([-4, -2, 0], [0, 0, 0], [2, 1, 1], textures[3]);
    cube.drawIsolated([4, -2, 0], [0, 0, 0], [3, 1, 1], textures[4]);

    animate();
  }

  function animate() {
    var currentTimestamp = new Date().getTime();

    if (lastTimestamp != 0) {
      var diffInSeconds = (currentTimestamp - lastTimestamp) / 1000.0;

      rotation += (90 * diffInSeconds) % 360.0;
    }

    lastTimestamp = currentTimestamp;
  }
}
