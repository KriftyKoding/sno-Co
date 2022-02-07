const itemStorage = document.getElementById("game-container")
let currentObject 
let oldObjectArray = []
console.log(oldObjectArray);

class furniture {

    constructor (name, width = "10%", height = "10%", background = "black", top = "50%", left = "0%", furnitureExsist = false) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.background = background;
        this.top = top;
        this.left = left;
        this.furnitureExsist = furnitureExsist;
        this.element = null;
    }

    createFurniture() {
        if (this.furnitureExsist == false) {
            // this.furnitureExsist = true;
            const furnitureElement = document.createElement('div');
            furnitureElement.classList.add('furniture');
            furnitureElement.style.width = this.width;
            furnitureElement.style.height = this.height;
            furnitureElement.style.backgroundColor = this.background;
            furnitureElement.style.top = this.top;
            furnitureElement.style.left = this.left;
            itemStorage.appendChild(furnitureElement);
            this.element = furnitureElement;
            currentObject = furnitureElement;
        } else {
            console.error("Furniture already exists");
        }
    }
}

const movingTruck = new furniture ("movingTruck", "50%", "100%", "blue", "0%", "50%");
movingTruck.createFurniture();




let couch = new furniture ("couch", "10%", "10%", "brown", "30%", "30%");
couch.createFurniture();
console.log(currentObject.style.top);


//potential objects
let long = new furniture ("long", "30%", "10%", "black");
let square = new furniture ("couch", "20%", "20%", "blueviolet");
let high = new furniture ("couch", "10%", "30%", "cornsilk");







// //couch object
// const couch = document.createElement('div');
// couch.classList.add('couch');
// itemStorage.appendChild(couch);

// let currentObject = couch

//how to move couch over
// couch.style.top = "45%";
///////////////////////////////////////////////////////////////////////////////////
//////////Keydown event listener
///////////////////////////////////////////////////////////////////////////////////
document.addEventListener('keydown', function(e) {
    // console.log(e.key);
    switch (e.key) {
        case 'ArrowLeft':
            listenArrowLeft ();
            break;
        case 'ArrowRight':
            listenArrowRight ()
            break;  
        case 'ArrowUp':
            listenArrowUp ();
            break;  
        case 'ArrowDown':
            listenArrowDown ();
            break;  
        //my keyboard sucks ~krizzy (for game testing)
        case '1':
            listenArrowUp ();
            break;  
        case 'End':
                listenArrowUp ();
                break;  

    }
});
            
function listenArrowLeft () {
    if (parseInt(currentObject.style.left) > 0 ) {
        currentObject.style.left = `${parseInt(currentObject.style.left) - 1}%`;
    } 
}

function listenArrowRight () {
    rightMoveCheck ();
}

function listenArrowUp () {
    if (parseInt(currentObject.style.top) > 0 ) {
        currentObject.style.top = `${parseInt(currentObject.style.top) - 10}%`;
    } 
}

function listenArrowDown () {
    let objectBottomtSide = parseInt(currentObject.style.height) + parseInt(currentObject.style.top); 
    if (objectBottomtSide < 100 ) {
        currentObject.style.top = `${parseInt(currentObject.style.top) +10}%`;
    } 
}

setInterval(function(){
    
    rightMoveCheck ();

}, 1000000)
console.log(currentObject.style.left);
// if (parseInt(parseInt(e.style.top) == objectRightSide)) {
//      console.log("stop");
// } else {
//      (console.log("keep going"))

function rightMoveCheck () {
    let objectRightSide = parseInt(currentObject.style.width) + parseInt(currentObject.style.left); 

    //if hit wall
    if ((objectRightSide >= 100 )) {
        collision (); 
    // no other objects 
    } else if (oldObjectArray.length == 0) {
        moveRight()
    } else {
        //check array to see if collision
        if (oldObjectArray.every(function(e) {
                // console.log(e);
                let objectRow = parseInt(currentObject.style.top) 
                // let objectRightSide = parseInt(currentObject.style.width) + parseInt(currentObject.style.left);
    
                if (parseInt(e.style.top) == objectRow) {
                    console.log(e.style.left);
                    console.log(objectRightSide);

                    if ((parseInt(e.style.left)) == objectRightSide) {
                        return true;
                } }})) {
            collision (); 
        } else {
            moveRight();
        }

    }

    
}

function moveRight() {
    currentObject.style.left = `${parseInt(currentObject.style.left) +1}%`;
}

function collision () {
    oldObjectArray.push(currentObject);
    long.createFurniture();
    console.log(oldObjectArray);

}
// oldObjectArray.every(function(e) {
//     let objectRightSide = parseInt(currentObject.style.width) + parseInt(currentObject.style.left); 
    // console.log(parseInt(e.style.top))
    // console.log(objectRightSide);
//     if (parseInt(parseInt(e.style.top) == objectRightSide)) {
//          console.log("stop");
//     } else {
//          (console.log("keep going"))
//     }
// }) 
 oldObjectArray.every(function(e) {
        let objectRightSide = parseInt(currentObject.style.width) + parseInt(currentObject.style.left); 
       
        return false;
    })