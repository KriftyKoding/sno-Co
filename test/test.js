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

let size = 4;
let layout = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let rotation = 2;
let displayLayout = [];

function rotaion() {
    for (let i = 0; i < size; i++) { 
        for (let j = size - 1; j >= 0; j--) {
            displayLayout.push(layout[size * (j) + i])
         }
    }
    layout = displayLayout
    displayLayout = []
    console.log(layout);
  }

  rotaion();
  rotaion();
  rotaion();
  rotaion();
  rotaion();



