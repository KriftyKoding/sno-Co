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
  object.firstTile = 2
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
    move(-1);
  } else if (e.key === "ArrowUp") {
    move(-gridRowLength);
  } else if (e.key === "ArrowRight") {
    move(1);
  } else if (e.key === "ArrowDown") {
    move(gridRowLength);
  } else if (e.key === "r" || e.key === "R") {
    rotaion(currentObject);
  } else if (e.key === " ") {
    // pause();enter
    console.log("ente");
  } else if (e.key === "Enter") {
    // enter()
  }
}
document.addEventListener("keydown", control);


function move(num) {
  let gridSize = gridDivArray.length;
  if (num === 1) {
    //move right
    let parametors = [-1, gridSize, gridRowLength];
    legalMoveCheck(objectGridOccupied(), parametors, num);
  } else if (num === -1) {
    //move left
    let parametors = [0, gridSize, gridRowLength];
    legalMoveCheck(objectGridOccupied(), parametors, num);
  } else if (num === gridRowLength) {
    //move up
    let parametors = [gridSize - gridRowLength, gridSize - 1, 1];
    legalMoveCheck(objectGridOccupied(), parametors, num);
  } else if (num === -gridRowLength) {
    //move down
    let parametors = [0, gridRowLength, 1];
    legalMoveCheck(objectGridOccupied(), parametors, num);
  } else {
    console.error("unexpected movement calculation");
  }
  function legalMoveCheck(indexAdjust, para, num) {
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
      currentObject.firstTile = currentObject.firstTile + num;
      draw(currentObject);
    }
  }
}

function rotaion(e) {
  console.log("r");
  const displayLayout = [];
  if (!(e.size * e.size == e.layout.length)) {
    console.error("shape size and length do not match. Can not roatate");
  } else {
    for (let i = 0; i < e.size; i++) {
      for (let j = e.size - 1; j >= 0; j--) {
        displayLayout.push(e.layout[e.size * j + i]);
      }
    }
    undraw(e);
    e.layout = displayLayout;
    draw(e);
  }
}
/////////////////////////////////////////////////////
/////////////////where object is in grid
////////////////////////
/////////////////////////////////////////////////////////////
function objectGridOccupied() {
  let result = [];
  currentObject.layout.forEach((value, index) => {
    if (value === 0) {
    } else if (value === 1) {
      let gridRowAdjust =
        Math.round((index - 1) / currentObject.size) * gridRowLength;
        // console.log("gridRowAdjust "+ gridRowAdjust);
      let shapeRowAdjust =
        Math.floor(index / currentObject.size) * currentObject.size;
        // console.log(shapeRowAdjust +shapeRowAdjust);
      let indexAdjust =
        gridRowAdjust + index - shapeRowAdjust + currentObject.firstTile;
      result.push(indexAdjust);
    } else {
      console.error("layout unexpected - objectGridOccupied");
    }
  });
  return result;
}
