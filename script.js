const itemStorage = document.getElementById("game-container")


//couch object
const couch = document.createElement('div');
couch.classList.add('couch');
itemStorage.appendChild(couch);

let currentObject = couch

//how to move couch over
couch.style.top = "45%";

//Keydown event listener
document.addEventListener('keydown', function(e) {
    
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
    }
});
            
function listenArrowLeft () {console.log("left");}
function listenArrowRight () {console.log("right");}
function listenArrowUp () {console.log("up");}
function listenArrowDown () {console.log("down");}
