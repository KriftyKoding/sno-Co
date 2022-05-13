function racing () {
    const domBody = document.body;
    const canvas = document.createElement("canvas");
    domBody.appendChild(canvas);

    canvas.width = window.innerWidth * .75;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext('2d')

    
    function player (location) {
        ctx.fillRect(location.x, location.y, 10, 10);

    }

    playerStartLocation = {
        x: 10,
        y:10
    }
    player(playerStartLocation);

    











}

module.exports = racing;