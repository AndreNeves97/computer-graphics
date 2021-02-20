// eslint-disable-next-line no-unused-vars
function degToRad(graus) {
  return (graus * Math.PI) / 180;
}

// eslint-disable-next-line no-unused-vars
function initTexture(imageSrc) {
  const image = new Image();
  const texture = gl.createTexture();

  texture.image = image;

  image.onload = () => configTexture(texture);
  image.src = imageSrc;

  shaderProgram.samplerUniform = gl.getUniformLocation(
    shaderProgram,
    "uSampler"
  );

  return texture;
}

function configTexture(texture) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texture.image
  );

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}
