const domBody = document.body;
const gridDivArray = [];
const tetrominoArray = [];
const gridRowLength = 15;
const gridColumnLength = 10;
const takeTiles = []
// starting point doesn't work but is just for testing
// let startingDiv = gridRowLength / 2 + (gridColumnLength / 2) * 20;
let currentObject;
let nextObject;

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
//const singleShape = new Shape(
//  4,
//  [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]
//);
const singleShape = new Shape(
  4,
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
);
const lineShape = new Shape(1, [1]);

tetrominoArray.push(lShape, lBackwardsShape, sShape, zShape, tShape, squaereShape, singleShape, lineShape)

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
///////////////////start tile////////////////////////////
/////////////////////////////////////////////////////////

function selectRandomObject (objectArry = tetrominoArray) {
  return Math.floor(Math.random() * objectArry.length)
}



///first shape currently
function newShape(startShape = false) {
  if (startShape === true) {
    nextObject = tetrominoArray[selectRandomObject()];
    //nextObject = singleShape;
  } else {
    let activeObjectArray = objectGridOccupied();
    activeObjectArray.forEach(tileNum => {
    gridDivArray[tileNum].classList.add("taken");
    takeTiles.push(gridDivArray[tileNum]);
  });
}
  currentObject = nextObject;
  nextObject = tetrominoArray[selectRandomObject()];
  currentObject.firstTile = gridRowLength;
  draw(currentObject);
}

newShape(true);

function newShapeCheck() {
  newShape();
  
}
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
    move("move", "left");
  } else if (e.key === "ArrowUp") {
    //move("top", "move");
    move("move", "up");
  } else if (e.key === "ArrowRight") {
    //move("right", "move");
    move("move", "right");
  } else if (e.key === "ArrowDown") {
    //move("bottom", "move");
    move("move", "down");
  } else if (e.key === "r" || e.key === "R") {
    move("rotation");
  } else if (e.key === " ") {
    newShape();
    console.log("ente");
  } else if (e.key === "Enter") {
    // enter()
  }
}
document.addEventListener("keydown", control);


//movement calculations
const lastTileInGrid = gridDivArray.length - 1;
const leftEdgeTileArry = [];
for (let i = 0; i < lastTileInGrid; i = i + gridRowLength) {
  leftEdgeTileArry.push(i);
}
const rightEdgeTileArry = [];
const rightUpperCornerTile = gridRowLength - 1;
for (let i = rightUpperCornerTile; i <= lastTileInGrid; i = i + gridRowLength) {
  rightEdgeTileArry.push(i);
}


function move(type, direction, object = currentObject) {
  const currentObjectTileArray = objectGridOccupied(currentObject);
  const potentialObject = Object.create(currentObject);
  let edgeTest = true;
  let rotationCount = 0;

  //potential action Object Creation
  if (type === "rotation") {
    console.log("ROTATION");
    const layoutHolder = [];
    for (let i = 0; i < object.size; i++) {
      //console.log(i);
      for (let j = object.size - 1; j >= 0; j--) {
        //console.log(j);
        //console.log(object);
        layoutHolder.push(object.layout[object.size * j + i]);
        potentialObject.layout = layoutHolder;
      }
    }
    //console.log(potentialObject);
  } else if (type === "move") {
    if (direction === "up") {
      moveObject(-gridRowLength);
    } else if (direction === "down") {
      moveObject(gridRowLength);
    } else if (direction === "right") {
      moveObject(1);
    } else if (direction === "left") {
      moveObject(-1);
    } else {
      console.error("unexpect Direction");
    }
  }

  function moveObject(direction) {
    potentialObject.firstTile = potentialObject.firstTile + direction;
  }
  let potentialObjectTileArray = objectGridOccupied(potentialObject);

  let objectOnLeftEdge = currentObjectTileArray.filter((tile) =>
    leftEdgeTileArry.includes(tile)
  );
  let objectCrossLeftEdge = potentialObjectTileArray.filter((tile) =>
    rightEdgeTileArry.includes(tile)
  );

 //test if object hit edges
  //if object is on left edge does action cause it to cross
  if (objectOnLeftEdge.length > 0) {
    if (objectCrossLeftEdge.length > 0) {
      //allowRotation("left");
      edgeTest = false;
      console.log("edge test left");
    }
  }
  let objectOnRightEdge = currentObjectTileArray.filter((tile) =>
    rightEdgeTileArry.includes(tile)
  );
  
  let objectCrossrightEdge = potentialObjectTileArray.filter((tile) =>
    leftEdgeTileArry.includes(tile)
  );
  //if object is on right edge does action cause it to cross
  if (objectOnRightEdge.length > 0) {
    if (objectCrossrightEdge.length > 0) {
      //allowRotation("right");
      edgeTest = false;
      console.log("edge test right");
    }
  }
  //does action casue object to go above or below gird
  potentialObjectTileArray.some((gridIndex) => {
    //bottom edge check
    if (gridIndex > lastTileInGrid) {
      //allowRotation("down");
      edgeTest = false;
      console.log("edge test bottom");
      //to edge check
    } else if (gridIndex < 0) {
      //allowRotation("up");
      edgeTest = false;
      console.log("edge test top");
    }
  });

  //
  //hit exsiting object
  //
  const takeTileNumArray = []
  takeTiles.forEach(element => {
    takeTileNumArray.push(parseInt(element.id))
  });
  console.log((takeTileNumArray));

  let objectNextToTakenTile = currentObjectTileArray.filter((tile) =>
  takeTileNumArray.includes(tile)
);

let objectOnTakenOject = potentialObjectTileArray.filter((tile) =>
takeTileNumArray.includes(tile)
);
//if object is on right edge does action cause it to cross
console.log(objectNextToTakenTile);
console.log(objectOnTakenOject);

if (objectOnTakenOject.length > 0) {
  //if (objectCrossrightEdge.length > 0) {
    //allowRotation("right");
    edgeTest = false;
    console.log("on object");
}





  //if tile is close ??? does it hit????
  //move gitqxd



  //fixe rotation so allowed
  function allowRotation(wallHit) {
    console.log("ROtATION FIX");
    if (type === move) {
      console.log("skip");
    } else if (rotationCount == 0) {
      console.error("rotationCorrection FAIL");
    } else if (type === "rotation") {
      rotationCount++;
      if (wallHit === "down") {
        move("move", "up");
        move("rotation");
      } else if (wallHit === "up") {
        move("move", "down");
        move("rotation");
      } else if (wallHit === "left") {
        move("move", "right");
        move("rotation");
      } else if (wallHit === "right") {
        move("move", "left");
        move("rotation");
      } else {
        console.error("unexpect Direction");
      }
    }
  }
   //do action if legal
  if (edgeTest == true) {
    rotationCount = 0;
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
  if (!(Math.pow(object.size , 2) == object.layout.length)) {
    console.error("shape size and length do not match. Can not roatate");
  } else {
    object.layout.forEach((value, index) => {
      if (value === 0) {
      } else if (value === 1) {
        ////////////////////////////
        ///////////////////////////////
        //////////////////////////////////
        ////////////////////////
        //here display wrong
        let gridRowAdjust =
          Math.ceil((index + 1) / object.size) * gridRowLength;
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
