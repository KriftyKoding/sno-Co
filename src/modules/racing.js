function racing() {
  const domBody = document.body;
  const canvas = document.createElement("canvas");
  domBody.appendChild(canvas);

  //canvas.width = window.innerWidth * .75,
  canvas.height = window.innerHeight;
  canvasObject = {
    width: (canvas.width = window.innerWidth * 0.75),
    height: (canvas.height = window.innerHeight),
  };
  let ctx = canvas.getContext("2d");
  //player one
  p1 = {
    x: 10,
    y: 10,
    width: 10,
    height: 10,
  };
  let movementIncremnet = 1;
  playerChange();

  function playerChange(xChange = 0, yChange = 0) {
    ctx.clearRect(p1.x, p1.y, p1.width, p1.height);
    p1.x += xChange;
    p1.y += yChange;
    ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
  }

  function controls(e) {
      switch (e.key) {
        case "ArrowLeft":
          movementCheck(-movementIncremnet, "x");
          break;
        case "ArrowUp":
          movementCheck(-movementIncremnet, "y");
          break;
        case "ArrowDown":
          movementCheck(movementIncremnet, "y");
          break;
        case "ArrowRight":
          movementCheck(movementIncremnet, "x");
          break;
        default:
          console.error("nothing");
      }

    function movementCheck(incremnet, axis) {
      switch (axis) {
        case "x":
          if (
            incremnet + p1.x >= canvasObject.width - p1.width ||
            incremnet + p1.x <= 0
          ) {
            console.log("wallHit");
          } else {
            playerChange(incremnet, 0);
          }
          break;
        case "y":
          if (
            incremnet + p1.y >= canvasObject.height - p1.height ||
            incremnet + p1.y <= 0
          ) {
            console.log("wallHit");
          } else {
            playerChange(0, incremnet);
          }
          break;
        default:
          console.error("movementCheck");
      }
    }
    
    
}
document.addEventListener("keydown", controls);
}

module.exports = racing;
