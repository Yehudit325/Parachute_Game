
/**********************************************************
 *                   Classes Declarations                 *
 **********************************************************/

class Plane {
    constructor() {
        this.sprite= new Image();
        this.sprite.src = 'images/plane.png';
        this.dx = 50;
    }

    initLoc() {
        this.x = canvas.width;
        this.y = 0;
    }

    render() {
        ctx.drawImage(this.sprite, this.x, this.y);
    }

    // Update the plane's position
    // Parameter: dt, a time delta between ticks
    // movement is multiplied by the dt parameter to ensure
    // the game runs at the same speed for all computers

    update(dt) {
        this.x -= this.dx * dt;

        if (this.x <= -this.sprite.width)
            this.initLoc();
    }
}

class Boat {
    constructor() {
        this.sprite = new Image();
        this.sprite.src = 'images/boat.png';
        this.dx = 15;
        this.direction = false;

    }

    initLoc() {
        this.x = canvas.width/2;
        this.y = canvas.height - this.sprite.height -100;
    }

    render() {
        ctx.drawImage(this.sprite, this.x, this.y);
    }

    update() {
        // Move left
        if (this.direction && this.direction === 37
                && this.x - this.dx >= 0)
            this.x -= this.dx;
        // Move right
        if (this.direction && this.direction === 39
                && this.x <= canvas.width - this.sprite.width)
            this.x += this.dx;
    }
}

class Parachute {

}

/**********************************************************
 *                   Variable Declarations                *
 **********************************************************/

var plane = new Plane();
var boat = new Boat();


/**********************************************************
 *                      Event Listeners                   *
 **********************************************************/

window.addEventListener('keydown', function (e) {
    boat.direction = e.keyCode;
})
window.addEventListener('keyup', function (e) {
    boat.direction = false;
})
