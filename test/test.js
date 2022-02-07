const domBody = document.body;

function createGrid() {
  //Grid Specifications
  let gridRow = 3;
  let gridColumn = 3;
  let squareMeasurement = 100;
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
  let squares = [];
  for (let i = 0; i < numberOfSquare; i++) {
    let girdDiv = document.createElement("div");
    girdDiv.style.width = squareSize;
    girdDiv.style.height = squareSize;
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
  }
}


const lShape = new Shape(3, [0, 1, 0, 0, 1, 0, 0, 1, 1]);
const lBackwardsShape = new Shape(3, [0,1,0,0,1,0,1,1,0]);
const sShape = new Shape(3, [0,1,1,1,1,0,0,0,0]);
const zShape = new Shape(3, [1,1,0,0,1,1,0,0,0]);
const tShape = new Shape(3, [0,0,0,1,1,1,0,1,0]);
const squaereShape = new Shape(2, [1,1,1,1]);
const singleShape = new Shape(4, [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0]);
const lineShape = new Shape(1, [1]);
//holder of rotation calculations
let displayLayout = [];

function rotaion(e) {
  if (!(e.size*e.size == e.layout.length)) {
    console.error("shape size and length do not match. Can not roatate");
    
  } else {
    for (let i = 0; i < e.size; i++) { 
      for (let j = e.size - 1; j >= 0; j--) {
        displayLayout.push(e.layout[e.size * (j) + i])
      }
    }
    e.layout = displayLayout
    displayLayout = []
    console.log(e.layout);
  }
  }

  rotaion(singleShape);
  rotaion(singleShape);
  rotaion(singleShape);
  rotaion(singleShape);
  rotaion(singleShape);



