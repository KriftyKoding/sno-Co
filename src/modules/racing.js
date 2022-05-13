function racing() {
  const domBody = document.body;
  const canvas = document.createElement("canvas");
  domBody.appendChild(canvas);

  //canvas.width = window.innerWidth * .75,
  canvas.height = window.innerHeight;
  canvasObject = {
    width: (canvas.width = window.innerWidth * 0.75),
    height: (canvas.height = window.innerHeight - 10),
  };
  driveBox = {
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  };
  let ctx = canvas.getContext("2d");
  //player one
  p1 = {
    x: 500,
    y: 500,
    width: 10,
    height: 10,
  };
  let movementIncremnet = 10;
  playerChange();

  function playerChange(xChange = 0, yChange = 0, drivebox) {
    //   console.log('start');
    switch (drivebox) {
      case "in":
        ctx.fillStyle = "black";
        ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
        break;
      case "out":
        //console.log("clear");
        ctx.clearRect(p1.x, p1.y, p1.width, p1.height);
        break;
    }
    //ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
    p1.x += xChange;
    p1.y += yChange;
    ctx.fillStyle = "purple";
    //console.log("change");
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
  }

  function movementCheck(incremnet, axis) {
    //in drive box
    let black = "out"
    if (
       p1.x >= driveBox.x &&
      p1.x + p1.width <= driveBox.x + driveBox.width &&
      p1.y + p1.height <= driveBox.y + driveBox.height &&
      p1.y >= driveBox.y
      ) {
          black = "in"
          console.log("increase speed");
    }
    
    switch (axis) {
      case "x":
        //  console.log("x");
        //edge
        if (
          incremnet + p1.x >= canvasObject.width - p1.width ||
          incremnet + p1.x <= 0
        ) {
          console.log("wallHit");
        } else {
            playerChange(incremnet, 0, black);
        }
        break;
      case "y":
        //  console.log("y");
        if (
          incremnet + p1.y >= canvasObject.height - p1.height ||
          incremnet + p1.y <= 0
        ) {
          console.log("wallHit");
        } else {
            playerChange(0, incremnet, black);
        }
        break;
      default:
        console.error("movementCheck");
    }
  }
  document.addEventListener("keydown", controls);
  ctx.fillStyle = "black";
  ctx.fillRect(driveBox.x, driveBox.y, driveBox.width, driveBox.height);
  //  ctx.fillStyle = "#FF0000";
  //  ctx.fillRect(100, 100, 100, 100);
}

module.exports = racing;
