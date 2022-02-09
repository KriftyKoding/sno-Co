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
    //move("left", "move");
    move("move", "left")
  } else if (e.key === "ArrowUp") {
    //move("top", "move");
    move("move", "up")
  } else if (e.key === "ArrowRight") {
    //move("right", "move");
    move("move", "right")
  } else if (e.key === "ArrowDown") {
    //move("bottom", "move");
    move("move", "down")
  } else if (e.key === "r" || e.key === "R") {
    move("rotation");
  } else if (e.key === " ") {
    // pause();enter
    console.log("ente");
  } else if (e.key === "Enter") {
    // enter()
  }
}
document.addEventListener("keydown", control);

function move(type, direction, object = currentObject) {
  const gridMaxIndex = gridDivArray.length - 1;
  const currentObjectDivArray = objectGridOccupied(currentObject)
  const potentialObject = Object.create(currentObject);
  let edgeTest = true;
  
  //potential move Object Creation
  if (type === "rotation") {
    const layoutHolder = [];
    for (let i = 0; i < object.size; i++) {
      for (let j = object.size - 1; j >= 0; j--) {
        layoutHolder.push(object.layout[object.size * j + i]);
        potentialObject.layout = layoutHolder;
      }
    }
  } else if (type === "move") {
    if (direction === "up"){
      moveObject(-gridRowLength)
    }else if (direction === "down"){
      moveObject(gridRowLength)
    }else if (direction === "right"){
      moveObject(1)
    }else if (direction === "left") {
      moveObject(-1)
    }else {
      console.error("unexpect Direction");
    }
  }
  function moveObject (direction) {
    potentialObject.firstTile = potentialObject.firstTile + direction
  }
  let potentialObjectDivArray = objectGridOccupied(potentialObject);
  

  const leftEdgeDivArry = []
  for (let i = 0; i < gridMaxIndex; i = i + gridRowLength) {
    leftEdgeDivArry.push(i)
  }
  const rightEdgeDivArry =[]
  const rightCornerDiv = gridRowLength -1
  for (let i = rightCornerDiv; i <= gridMaxIndex; i = i + gridRowLength) {
    rightEdgeDivArry.push(i)
  }
  let objectOnLeftEdge =currentObjectDivArray.filter(div => leftEdgeDivArry.includes(div));
  let objectCrossLeftEdge = potentialObjectDivArray.filter(div => rightEdgeDivArry.includes(div));
 

   //test if object hit edges
  //if object is on left edge does action cause it to cross
  if (objectOnLeftEdge.length > 0) {
    if (objectCrossLeftEdge.length > 0) {
      console.log("illegal move bottom");
      edgeTest = false;
    }
  }
  let objectOnRightEdge = currentObjectDivArray.filter(div => rightEdgeDivArry.includes(div));
  let objectCrossrightEdge = potentialObjectDivArray.filter(div => leftEdgeDivArry.includes(div));
  //if object is on right edge does action cause it to cross
  if (objectOnRightEdge.length > 0) {
    if (objectCrossrightEdge.length > 0) {
      console.log("illegal move bottom");
      edgeTest = false;
    }
  }
  //does action casue object to go above or below gird
  potentialObjectDivArray.some((gridIndex) => {
    if (gridIndex > gridMaxIndex) {
      console.log("illegal move bottom");
      edgeTest = false;
    } else if (gridIndex < 0) {
      console.log("illegal move top");
      edgeTest = false;
    } 
  });
  
  // do action when legal
  if (edgeTest == true) {
    undraw();
    currentObject = potentialObject;
    draw();
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
