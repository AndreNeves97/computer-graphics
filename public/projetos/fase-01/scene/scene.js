// eslint-disable-next-line no-unused-vars
function Scene() {
  const cube = new Cube();

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
    cube.drawIsolated([-4, 2, 0], [rotation, 0, 0], textures[0]);
    cube.drawIsolated([+0, 2, 0], [0, rotation, 0], textures[1]);
    cube.drawIsolated([+4, 2, 0], [0, 0, rotation], textures[2]);
    cube.drawIsolated([-4, -2, 0], [0, 0, rotation], textures[3]);
    cube.drawIsolated([4, -2, 0], [0, 0, rotation], textures[4]);

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
