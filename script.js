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
    console.log(e.key);
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
            
function listenArrowLeft () {console.log("left");}
function listenArrowRight () {
    let objectLeftLocation = currentObject.style.left;
    if (objectLeftLocation == "") {
        currentObject.style.left = "1%"
    } else if (objectLeftLocation.includes("%")) {
        currentObject.style.left = `${parseInt(objectLeftLocation) +1}%`;
    } else {
        console.error("couch.style.left unexpect results");
    }
}
function listenArrowUp () {console.log("up");}
function listenArrowDown () {console.log("down");}
