const itemStorage = document.getElementById("game-container")
let currentObject 

class furniture {

    constructor (name, width = "5%", height = "5%", background = "black", top = "0%", left = "0%", furnitureExsist = false) {
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
            this.furnitureExsist = true;
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
            console.log(currentObject);
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
    let objectRightSide = parseInt(currentObject.style.width) + parseInt(currentObject.style.left); 
    if (objectRightSide < 100 ) {
        currentObject.style.left = `${parseInt(currentObject.style.left) +1}%`;
    } 
}

function listenArrowUp () {
    if (parseInt(currentObject.style.top) > 0 ) {
        currentObject.style.top = `${parseInt(currentObject.style.top) - 1}%`;
    } 
}

function listenArrowDown () {
    let objectBottomtSide = parseInt(currentObject.style.height) + parseInt(currentObject.style.top); 
    if (objectBottomtSide < 100 ) {
        currentObject.style.top = `${parseInt(currentObject.style.top) +1}%`;
    } 
}
