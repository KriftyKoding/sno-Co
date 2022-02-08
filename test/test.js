const domBody = document.body;
let squares = [];
let gridRow = 20;
let gridColumn = 10;
let startingDiv = gridRow / 2 + (gridColumn / 2) * 20;
let currentObject;

function createGrid() {
  //Grid Specifications
  let squareMeasurement = 25;
  let squareMeasurementType = "px";

  let numberOfSquare = gridRow * gridColumn;
  let gridWidth = `${gridRow * squareMeasurement + squareMeasurementType}`;
  let squareSize = squareMeasurement + squareMeasurementType;
  //create grid Elements
  const grid = document.createElement("div");
  grid.classList = "grid";
  grid.style.display = "grid";
  grid.style.width = gridWidth;
  grid.style.gridTemplateColumns = `repeat(${gridRow}, auto)`;
  domBody.appendChild(grid);
  //grid squares
  for (let i = 0; i < numberOfSquare; i++) {
    let girdDiv = document.createElement("div");
    girdDiv.style.width = squareSize;
    girdDiv.style.height = squareSize;
    girdDiv.classList = "gridSquare";
    grid.appendChild(girdDiv);
    squares.push(girdDiv);
  }
}
createGrid();

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
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
function rotaion(e) {
  let displayLayout = [];
  if (!(e.size * e.size == e.layout.length)) {
    console.error("shape size and length do not match. Can not roatate");
  } else {
    for (let i = 0; i < e.size; i++) {
      for (let j = e.size - 1; j >= 0; j--) {
        displayLayout.push(e.layout[e.size * j + i]);
      }
    }
    e.layout = displayLayout;
    console.log(e.layout);
  }
}

///////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////////////////////////////////////////////

function newShape(object) {
  object.firstTile =
    startingDiv -
    Math.ceil(object.size / 2) -
    Math.ceil(object.size / 2) * gridRow;
  draw(object);
  currentObject = object;
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
///////////////////////////////////////////////////

function draw(object) {
  object.layout.forEach((value, index) => {
    if (value === 0) {
    } else if (value === 1) {
      let indexAdjust = calcPosition(index, object);
      squares[indexAdjust].classList.add("red");
    } else {
      console.error("layout unexpected, can not draw");
    }
  });
}

newShape(zShape);

function undraw(object) {
  object.layout.forEach((value, index) => {
    let indexAdjust = calcPosition(index, object);
    squares[indexAdjust].classList.remove("red");
    console.log(squares[indexAdjust]);
  });
}

function calcPosition(index, object) {
  let gridRowAdjust = Math.round((index - 1) / object.size) * gridRow;
  let shapeRowAdjust = Math.floor(index / object.size) * object.size;
  let indexAdjust = gridRowAdjust + index - shapeRowAdjust + object.firstTile;
  return indexAdjust;
}

// undraw(zShape);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//keyListener
function control(e) {
  // console.log(e.key);
  if (e.key === "ArrowLeft") {
    moveLeft();
  } else if (e.key === "ArrowUp") {
    moveUp();
  } else if (e.key === "ArrowRight") {
    moveRight();
  } else if (e.key === "ArrowDown") {
    moveDown();
  } else if (e.key === " ") {
    // pause();enter
    console.log("ente");
  } else if (e.key === "Enter") {
    // enter()
  }
}
document.addEventListener("keydown", control);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function moveUp() {
  move(-gridRow);
}

function moveDown() {
  move(gridRow);
}

function moveRight() {
  move(1);
}

function moveLeft() {
  move(-1);
}

function move(num) {
  undraw(currentObject);
  currentObject.firstTile = currentObject.firstTile + num;
  draw(currentObject);
}

function moveRotate() {
  console.log("moveRotate");
}
