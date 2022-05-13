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
    x: 100,
    y: 0,
    width: 300,
    height: canvasObject.height,
    color: "brown",
  };
  driveBoxOuter = {
    x: 50,
    y: 0,
    width: 400,
    height: canvasObject.height,
    color: "black",
  };

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = driveBoxOuter.color;
  ctx.fillRect(
    driveBoxOuter.x,
    driveBoxOuter.y,
    driveBoxOuter.width,
    driveBoxOuter.height
  );
  ctx.fillStyle = driveBox.color;
  ctx.fillRect(driveBox.x, driveBox.y, driveBox.width, driveBox.height);
 
  //player one
  p1 = {
    x: (driveBox.x + driveBox.width)/2,
    y: driveBox.height - driveBox.height * .1,
    width: 10,
    height: 10,
  };
  let movementIncremnet = 10;
  playerChange();

  function playerChange(xChange = 0, yChange = 0, driveBoxColor) {
    //   console.log('start');
    switch (driveBoxColor) {
      case "out":
        //console.log("clear");
        ctx.clearRect(p1.x, p1.y, p1.width, p1.height);
        break;
      default:
        ctx.fillStyle = driveBoxColor;
        ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
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
    let driveBoxColor = "out";
    
    if (
      p1.x >= driveBoxOuter.x &&
      p1.x + p1.width <= driveBoxOuter.x + driveBoxOuter.width &&
      p1.y + p1.height <= driveBoxOuter.y + driveBoxOuter.height &&
      p1.y >= driveBoxOuter.y
    ) {
      if (
        p1.x >= driveBox.x &&
        p1.x + p1.width <= driveBox.x + driveBox.width &&
        p1.y + p1.height <= driveBox.y + driveBox.height &&
        p1.y >= driveBox.y
      ) {
        driveBoxColor = driveBox.color;
        console.log("increase speed");
      } else {
        driveBoxColor = driveBoxOuter.color;
        console.log("slower increase speed");
      }
    }


    switch (axis) {
      case "x":
        //  console.log("x");
        if (
          //edge check
          incremnet + p1.x >= canvasObject.width - p1.width ||
          incremnet + p1.x <= 0
        ) {
          console.log("wallHit");
        } else {
          playerChange(incremnet, 0, driveBoxColor);
        }
        break;
      case "y":
        //  console.log("y");
        if (
          //edge check
          incremnet + p1.y >= canvasObject.height - p1.height ||
          incremnet + p1.y <= 0
        ) {
          console.log("wallHit");
        } else {
          playerChange(0, incremnet, driveBoxColor);
        }
        break;
      default:
        console.error("movementCheck");
    }
  }
  document.addEventListener("keydown", controls);
  //  ctx.fillStyle = "#FF0000";
  //  ctx.fillRect(100, 100, 100, 100);
}

module.exports = racing;
