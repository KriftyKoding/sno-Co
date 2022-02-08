//writing things out

let parametors = [(-1), (gridColumn * gridRow), (gridRow)];
wallHit = shapeGridTaken(moveForLoop, parametors);

if (num === 1) {
  object.layout.forEach((value, index) => {
    if (value === 0) {
    } else if (value === 1) {
      let indexAdjust = calcPosition(index, object);
      for (let i = -1; i < gridColumn * gridRow; i = i + gridRow) 
      for (let i = para[0]; i < para[1]; i = i + para[2])
      {
        if (i === indexAdjust) {
          wallHit = true;
          break;
        }
      }
    } else {
      console.error("layout unexpected detect hit");
    }
  });
}

function moveForLoop(para) {
    let wallHit = false;
    for (let i = para[0]; i < para[1]; i = i + para[2]) 
    for (let i = para[0]; i < para[1]; i = i + para[2])
    {
      console.log("1" + wallHit);
      if (i === indexAdjust) {
        wallHit = true;
        break;
      }
    }
    // console.log(wallHit);
    return wallHit;
  }

function shapeGridTaken(func, parametors) {
  let wallHit = false;
  currentObject.layout.forEach((value, index) => {
    if (value === 0) {
    } else if (value === 1) {
      let indexAdjust = calcPosition(index, currentObject);
      wallHit = func(indexAdjust, parametors);
    } else {
      console.error("layout unexpected detect hit");
    }
  });
  return wallHit;
}