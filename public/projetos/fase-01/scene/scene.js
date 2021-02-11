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

  let mMatrixStack = [];

  return {
    initSceneObjects,
    tickDrawSceneObjects,
  };

  function initSceneObjects() {
    textures = texturesImgs.map((img) => initTexture(img));

    cube.createBuffers();
  }

  function tickDrawSceneObjects() {
    drawIsolatedObject(() =>
      cube.draw([-4, 2, 0], [rotation, 0, 0], textures[0])
    );

    drawIsolatedObject(() =>
      cube.draw([+0, 2, 0], [0, rotation, 0], textures[1])
    );

    drawIsolatedObject(() =>
      cube.draw([+4, 2, 0], [0, 0, rotation], textures[2])
    );

    drawIsolatedObject(() =>
      cube.draw([-4, -2, 0], [0, 0, rotation], textures[3])
    );

    drawIsolatedObject(() =>
      cube.draw([4, -2, 0], [0, 0, rotation], textures[4])
    );

    animate();
  }

  function drawIsolatedObject(drawFn) {
    mPushMatrix();
    drawFn();
    mPopMatrix();
  }

  function animate() {
    var currentTimestamp = new Date().getTime();

    if (lastTimestamp != 0) {
      var diffInSeconds = (currentTimestamp - lastTimestamp) / 1000.0;

      rotation += (90 * diffInSeconds) % 360.0;
    }

    lastTimestamp = currentTimestamp;
  }

  function mPushMatrix() {
    var copy = mat4.clone(mMatrix);
    mMatrixStack.push(copy);
  }

  function mPopMatrix() {
    if (mMatrixStack.length == 0) {
      throw "inválido popMatrix!";
    }
    mMatrix = mMatrixStack.pop();
  }
}
