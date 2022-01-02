const itemStorage = document.getElementById("game-container")







//couch object
const couch = document.createElement('div');
couch.classList.add('couch');
itemStorage.appendChild(couch);

let currentObject = couch

//how to move couch over
couch.style.top = "45%";
///////////////////////////////////////////////////////////////////////////////////
//////////Keydown event listener
///////////////////////////////////////////////////////////////////////////////////
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
function listenArrowRight () {
    let objectLeftLocation = couch.style.left;
    if (objectLeftLocation == "") {
        couch.style.left = "1%"
    } else if (objectLeftLocation.includes("%")) {
        couch.style.left = `${parseInt(objectLeftLocation) +1}%`;
    } else {
        console.error("couch.style.left unexpect results");
    }
}
function listenArrowUp () {console.log("up");}
function listenArrowDown () {console.log("down");}
