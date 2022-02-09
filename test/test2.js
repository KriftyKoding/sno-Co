//writing things out easier to see
//not used

let parametors = [(0), (gridColumn * gridRow), (gridRow)];
wallHit = shapeGridTaken(moveForLoop, parametors);

object.layout.forEach((value, index) => {
    if (value === 0) {
    } else if (value === 1) {
      let indexAdjust = calcPosition(index, object);
      for (let i = 0; i < gridColumn * gridRow; i = i + gridRow) 
      (let i = para[0]; i < para[1]; i = i + para[2])
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