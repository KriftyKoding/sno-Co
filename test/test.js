const domBody = document.body;
const gridDivArray = [];
const gridRowLength = 15;
const gridColumnLength = 10;
// starting point doesn't work but is just for testing
// let startingDiv = gridRowLength / 2 + (gridColumnLength / 2) * 20;
let currentObject;

function createGrid() {
  //Grid Specifications
  let gridDivMeasurement = 25;
  let gridDivMeasurementType = "px";
  let numberOfDiv = gridRowLength * gridColumnLength;
  let gridWidth = `${
    gridRowLength * gridDivMeasurement + gridDivMeasurementType
  }`;
  let gridDivSize = gridDivMeasurement + gridDivMeasurementType;
  //create grid Elements
  const grid = document.createElement("div");
  grid.classList = "grid";
  grid.style.display = "grid";
  grid.style.width = gridWidth;
  grid.style.gridTemplateColumns = `repeat(${gridRowLength}, auto)`;
  domBody.appendChild(grid);
  //DIV in grid (gridDivArray)
  for (let i = 0; i < numberOfDiv; i++) {
    const girdDiv = document.createElement("div");
    girdDiv.style.width = gridDivSize;
    girdDiv.style.height = gridDivSize;
    girdDiv.classList = "gridSquare";
    girdDiv.id = i;
    grid.appendChild(girdDiv);
    gridDivArray.push(girdDiv);
  }
}
createGrid();

/////////////////////////////////////////////////////////////
///////////////tetrominos////////////////////////
/////////////////////////////////////////////////////////////
class Shape {
  constructor(size, layout) {
    this.size = size;
    this.layout = layout;
    this.firstTile;
  }
}

const lShape = new Shape(3, [0, 1, 0, 0, 1, 0, 0, 1, 1]);
const lBackwardsShape = new Shape(3, [0, 1, 0, 0, 1, 0, 1, 1, 0]);
const sShape = new Shape(3, [0, 1, 1, 1, 1, 0, 0, 0, 0]);
const zShape = new Shape(3, [1, 1, 0, 0, 1, 1, 0, 0, 0]);
const tShape = new Shape(3, [0, 0, 0, 1, 1, 1, 0, 1, 0]);
const squaereShape = new Shape(2, [1, 1, 1, 1]);
const singleShape = new Shape(
  4,
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]
);
const lineShape = new Shape(1, [1]);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

///////////////////////////////////////////////////
/////////////start tile////////////////////
////////////////////////////////////////////////////

///first shape currently
function newShape(object) {
  object.firstTile = 2;
  // startingDiv -
  // Math.ceil(object.size / 2) -
  // Math.ceil(object.size / 2) * gridRowLength;
  currentObject = object;
  draw(object);
}

newShape(zShape);
////////////////////////////////////////////////////
//////////////draw/undraw/////////////////////////
///////////////////////////////////////////////////

function draw() {
  objectGridOccupied().forEach((element) => {
    gridDivArray[element].classList.add("red");
  });
}

function undraw() {
  objectGridOccupied().forEach((element) => {
    gridDivArray[element].classList.remove("red");
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////move////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//keyListener
function control(e) {
  if (e.key === "ArrowLeft") {
    move("left", "move");
  } else if (e.key === "ArrowUp") {
    move("top", "move");
  } else if (e.key === "ArrowRight") {
    move("right", "move");
  } else if (e.key === "ArrowDown") {
    move("bottom", "move");
  } else if (e.key === "r" || e.key === "R") {
    rotaion(currentObject, "rotate");
  } else if (e.key === " ") {
    // pause();enter
    console.log("ente");
  } else if (e.key === "Enter") {
    // enter()
  }
}
document.addEventListener("keydown", control);

function move(edge, type) {
  let gridSize = gridDivArray.length;
  if (edge === "right") {
    //move right
    let parametors = [-1, gridSize, gridRowLength, 1];
    legalMoveCheck(objectGridOccupied(), parametors, 1);
  } else if (edge === "left") {
    //move left
    let parametors = [0, gridSize, gridRowLength, -1];
    legalMoveCheck(objectGridOccupied(), parametors, -1);
  } else if (edge === "bottom") {
    let parametors = [gridSize - gridRowLength, gridSize - 1, 1, gridRowLength];
    legalMoveCheck(objectGridOccupied(), parametors, gridRowLength);
  } else if (edge === "top") {
    let parametors = [0, gridRowLength, 1, -gridRowLength];
    legalMoveCheck(objectGridOccupied(), parametors, -gridRowLength);
  } else {
    console.error("unexpected movement calculation");
  }

  function legalMoveCheck(indexAdjust, para) {
    let wallHitCheck = false;
    indexAdjust.some((value) => {
      for (let i = para[0]; i < para[1]; i = i + para[2]) {
        if (i === value) {
          wallHitCheck = true;
        }
      }
    });
    if (!wallHitCheck) {
      undraw(currentObject);
      drawType(type, para[3]);
      draw(currentObject);
    }
  }

  function drawType(type, num) {
    if (type === "move") {
      currentObject.firstTile = currentObject.firstTile + num;
    } else if (type === "rotate") {
      currentObject = tempObject;
    } else {
      console.error("drawType unknown");
    }
  }
}

function rotaion(e) {
  const layoutHolder = [];
  let gridMaxIndex = gridDivArray.length - 1;

  for (let i = 0; i < e.size; i++) {
    for (let j = e.size - 1; j >= 0; j--) {
      layoutHolder.push(e.layout[e.size * j + i]);
    }
  }

  const tempObject = Object.create(currentObject);
  tempObject.layout = layoutHolder;
  let potentialObjectGrid = objectGridOccupied(tempObject);
  let currentObjectGrid = objectGridOccupied(currentObject)

  console.log(potentialObjectGrid);
  //console.log(-gridRowLength);
  //console.log(gridMaxIndex);
  let edge = true;
  let leftEdgeDivArry = []
  for (let i = 0; i < gridMaxIndex; i = i + gridRowLength) {
    leftEdgeDivArry.push(i)
  }
  let rightEdgeDivArry =[]
  let rightCornerDiv = gridRowLength -1
  for (let i = rightCornerDiv; i <= gridMaxIndex; i = i + gridRowLength) {
    rightEdgeDivArry.push(i)
   }
  let objectOnLeftEdge =currentObjectGrid.filter(div => leftEdgeDivArry.includes(div));
  let objectCrossLeftEdge = potentialObjectGrid.filter(div => rightEdgeDivArry.includes(div));
  if (objectOnLeftEdge.length > 0) {
    if (objectCrossLeftEdge.length > 0) {
      console.log("illegal move bottom");
      edge = false;
    }
  }
  let objectOnRightEdge =currentObjectGrid.filter(div => rightEdgeDivArry.includes(div));
  let objectCrossrightEdge = potentialObjectGrid.filter(div => leftEdgeDivArry.includes(div));
  if (objectOnRightEdge.length > 0) {
    if (objectCrossrightEdge.length > 0) {
      console.log("illegal move bottom");
      edge = false;
    }
  }
 
  potentialObjectGrid.some((gridIndex) => {
    if (gridIndex > gridMaxIndex) {
      console.log("illegal move bottom");
      edge = false;
    } else if (gridIndex < 0) {
      console.log("illegal move top");
      edge = false;
    } 
  });
  
  
  if (edge == true) {
    undraw();
    currentObject = tempObject;
    draw();
  }

  //objectGrid.some

  //if (edge === "bottom") {
  //  let parametors = [gridSize - gridRowLength, gridSize - 1, 1, gridRowLength];
  //  legalMoveCheck(objectGridOccupied(), parametors, gridRowLength);
  //}

  //function legalMoveCheck(indexAdjust, para, num) {
  //  let wallHitCheck = false;
  //  indexAdjust.some((value) => {
  //    for (let i = para[0]; i < para[1]; i = i + para[2]) {
  //      if (i === value) {
  //        wallHitCheck = true;
  //      }
  //    }
  //  });
  //  if (!wallHitCheck) {
  //    console.log("legal");

  //  } else {console.log("not legal");}
  //}

  //console.log( tempObject.layout);
  //console.log( currentObject.layout);
}

function drawType(type) {
  if (type === "move") {
    currentObject.firstTile = currentObject.firstTile + num;
  } else if (type === "rotate") {
    currentObject = tempObject;
  } else {
    console.error("drawType unknown");
  }
}

/////////////////////////////////////////////////////
/////////////////where object is in grid
////////////////////////
/////////////////////////////////////////////////////////////
function objectGridOccupied(object = currentObject) {
  let result = [];
  if (!(object.size * object.size == object.layout.length)) {
    console.error("shape size and length do not match. Can not roatate");
  } else {
    object.layout.forEach((value, index) => {
      if (value === 0) {
      } else if (value === 1) {
        let gridRowAdjust =
          Math.round((index - 1) / object.size) * gridRowLength;
        // console.log("gridRowAdjust "+ gridRowAdjust);
        let shapeRowAdjust = Math.floor(index / object.size) * object.size;
        // console.log(shapeRowAdjust +shapeRowAdjust);
        let indexAdjust =
          gridRowAdjust + index - shapeRowAdjust + object.firstTile;
        result.push(indexAdjust);
      } else {
        console.error("layout unexpected - objectGridOccupied");
      }
    });
    return result;
  }
}

//////////////////////////////////
///////////////////////////////////
////////////////////////////////////

function objectLayoutCheck() {
  const layoutHolder = [];
  if (!(e.size * e.size == e.layout.length)) {
    console.error("shape size and length do not match. Can not roatate");
  } else {
  }
}
