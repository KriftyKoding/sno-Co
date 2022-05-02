function moving() {
  const domBody = document.body;
  const gridRowLength = 20;
  const gridColumnLength = 22;
  const gridDivArray = [];
  const tetrominoArray = [];
  const takeTilesArray = [];
  const outOfBoundsTileArray = [];
  let currentObject;
  let nextObject;

  shapeCreation();
  createGrid();
  outerEdge();
  newShape(true);
  movementControlFunction();

  /////////////////////////////////////////////////////////////
  //ShapeCreation
  /////////////////////////////////////////////////////////////
  function shapeCreation() {
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

    tetrominoArray.push(
      lShape,
      lBackwardsShape,
      sShape,
      zShape,
      tShape,
      squaereShape,
      singleShape,
      lineShape
    );
  }

  /////////////////////////////////////////////////////////////
  //Create Grid
  /////////////////////////////////////////////////////////////
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

  //************************************************************
  /// CALCULATES NEW TETROMINALS WILL WORK
  //function objectLayoutCheck() {
  //  const layoutHolder = [];
  //  if (!(e.size * e.size == e.layout.length)) {
  //    console.error("shape size and length do not match. Can not roatate");
  //  } else {
  //  }
  //}
  /////////////////////////////////////////////////////////
  //out of bounds area
  //////////
  function outerEdge() {
    let outerEdgeSize = 3;
    for (let i = 0; i < gridRowLength * outerEdgeSize; i++) {
      //top rows
      outOfBunds(i);
      ////bottom rows
      outOfBunds(gridColumnLength * gridRowLength - gridRowLength * 3 + i);
    }

    for (
      let i = 0;
      i < gridColumnLength * gridRowLength - gridColumnLength + 4;
      i += gridRowLength
    ) {
      for (let j = 0; j < outerEdgeSize; j++) {
        // right
        outOfBunds(i + j);
        // left edge
        outOfBunds(i + j + gridRowLength - 3);
      }
    }
    function outOfBunds(e) {
      gridDivArray[e].classList.add("outOffBounds");
      outOfBoundsTileArray.push(gridDivArray[e]);
    }
  }

  /////////////////////////////////////////////////////////
  //NewShape/FirstShape
  /////////////////////////////////////////////////////////
  function newShape(startShape = false) {
    if (startShape === true) {
      nextObject = tetrominoArray[selectRandomObject()];
      //nextObject = singleShape;
    } else {
      let activeObjectArray = objectGridLocationCalc();
      activeObjectArray.forEach((tileNum) => {
        gridDivArray[tileNum].classList.add("taken");
        takeTilesArray.push(gridDivArray[tileNum]);
      });
    }
    currentObject = nextObject;
    nextObject = tetrominoArray[selectRandomObject()];
    currentObject.firstTile = gridRowLength;
    draw(currentObject);

    function selectRandomObject(objectArry = tetrominoArray) {
      return Math.floor(Math.random() * objectArry.length);
    }
  }

  ////////////////////////////////////////////////////
  //////////////draw/undraw/////////////////////////
  ///////////////////////////////////////////////////

  function draw() {
    objectGridLocationCalc().forEach((element) => {
      gridDivArray[element].classList.add("red");
    });
  }

  function undraw() {
    objectGridLocationCalc().forEach((element) => {
      gridDivArray[element].classList.remove("red");
    });
  }

  ///////////////////////////////////////////////////////////////////////
  //Movement control
  ///////////////////////////////////////////////////////////////////////

  
  function movementControlFunction() {
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
        space();
      }
    }
    document.addEventListener("keydown", control);
    
    function space() {
      objectGridLocationCalc().every(element => {  
        if (gridDivArray[element].classList.contains('outOffBounds')) {
          return false;
        } else {
           newShape();
        }
    });
    }  

    //movement calculations
    const lastTileInGrid = gridDivArray.length - 1;
    const leftEdgeTileArry = [];
    for (let i = 0; i < lastTileInGrid; i = i + gridRowLength) {
      leftEdgeTileArry.push(i);
    }
    const rightEdgeTileArry = [];
    const rightUpperCornerTile = gridRowLength - 1;
    for (
      let i = rightUpperCornerTile;
      i <= lastTileInGrid;
      i = i + gridRowLength
    ) {
      rightEdgeTileArry.push(i);
    }

    function move(type, direction, object = currentObject) {
      const currentObjectTileArray = objectGridLocationCalc(currentObject);
      const potentialObject = Object.create(currentObject);
      let edgeTest = true;

      //potential action Object Creation
      if (type === "rotation") {
        const layoutHolder = [];
        for (let i = 0; i < object.size; i++) {
          for (let j = object.size - 1; j >= 0; j--) {
            layoutHolder.push(object.layout[object.size * j + i]);
            potentialObject.layout = layoutHolder;
          }
        }
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
      let potentialObjectTileArray = objectGridLocationCalc(potentialObject);

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
        }
      }
      //does action casue object to go above or below gird
      potentialObjectTileArray.some((gridIndex) => {
        //bottom edge check
        if (gridIndex > lastTileInGrid) {
          //allowRotation("down");
          edgeTest = false;
          //to edge check
        } else if (gridIndex < 0) {
          //allowRotation("up");
          edgeTest = false;
        }
      });
      //hit exsiting object
      const takeTileNumArray = [];
      takeTilesArray.forEach((element) => {
        takeTileNumArray.push(parseInt(element.id));
      });
      let objectNextToTakenTile = currentObjectTileArray.filter((tile) =>
        takeTileNumArray.includes(tile)
      );

      let objectOnTakenOject = potentialObjectTileArray.filter((tile) =>
        takeTileNumArray.includes(tile)
      );
      //if object is on right edge does action cause it to cross
      if (objectOnTakenOject.length > 0) {
        //if (objectCrossrightEdge.length > 0) {
        //allowRotation("right");
        edgeTest = false;
      }
      //do action if legal
      if (edgeTest == true) {
        rotationCount = 0;
        undraw();
        currentObject = potentialObject;
        draw();
      }
    }
  }

  /////////////////////////////////////////////////////
  //Object Grid Location adjustment
  /////////////////////////////////////////////////////////////
  function objectGridLocationCalc(object = currentObject) {
    let result = [];
    if (!(Math.pow(object.size, 2) == object.layout.length)) {
      console.error("shape size and length do not match. Can not roatate");
    } else {
      object.layout.forEach((value, index) => {
        if (value === 0) {
        } else if (value === 1) {
          //object location in mini grid
          let gridRowAdjust =
            Math.ceil((index + 1) / object.size) * gridRowLength;
          let shapeRowAdjust = Math.floor(index / object.size) * object.size;
          //index is each individual tile in mini grid
          let indexAdjust =
            gridRowAdjust + index - shapeRowAdjust + object.firstTile;

          result.push(indexAdjust);
        } else {
          console.error("layout unexpected - objectGridLocationCalc");
        }
      });
      return result;
    }
  }
}

module.exports = moving;
