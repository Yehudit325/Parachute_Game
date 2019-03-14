
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
        this.x = canvas.width / 2;
        this.y = canvas.height - this.sprite.height - 100;
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
    constructor(plane, boat, score) {
        this.sprite = new Image();
        this.sprite.src = 'images/parachutist.png';
        this.plane = plane;
        this.boat = boat;
        this.score = score;
        this.init();
    }

    init() {
        // this.x = 0;
        this.y = -200;
        this.dy = Math.floor(Math.random() * 100) + 20;
        this.dropPoint = Math.floor(Math.random() * (canvas.width - this.sprite.width - 50));
        this.drop = true;
    }

    render() {
        ctx.drawImage(this.sprite, this.x, this.y);
    }

    update(dt) {

        // when drop point is reached - drop parachuter
        if ((Math.floor(plane.x) === this.dropPoint) && this.drop) {
            // initialize parachuters starting coordinates
                this.x = plane.x + 50;
                this.y = 50;
                this.drop = false;
        }

        if (!this.drop) {
            this.y += this.dy * dt;
            this.boatCollision();
            this.seaCollision();
        }
    }


    // checks if parachuter lands on boat and responds accordingly
    boatCollision() {
        if (this.x < boat.x + boat.sprite.width && this.x + this.sprite.width > boat.x &&
            this.y + this.sprite.height/2 < boat.y + boat.sprite.height &&
            this.y + this.sprite.height > boat.y + boat.sprite.height/2) {
                this.score.update();
                this.init();
        }
    }

    // checks if parachuter lands in the water and responds accordingly
    seaCollision() {
        if (this.y + this.sprite.height/2 > 460) {
            this.init();
        }
    }

}

class Score {
    constructor() {
        this.score = 0;
    }

    update() {
        this.score += 10;
    }

    render() {
        ctx.font = "25px Arial";
        ctx.fillText("Score: " + this.score, 20, 50);
    }
}

class Lives {
    constructor() {
        this.lives = 3;
    }

    update() {
        --this.lives;

        if (this.lives === 0) {
            this.gameOver();
        }
    }

    render() {
        ctx.font = "25px Arial";
        ctx.fillText("Lives: " + this.lives, 20, 100);
    }

    gameOver() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
}


/**********************************************************
 *                   Variable Declarations                *
 **********************************************************/

var plane = new Plane();
var boat = new Boat();
var allParachuters = [];
var score = new Score();
var lives = new Lives();

for (var i = 0; i < 4; i++) {
    allParachuters.push(new Parachute(plane, boat, score, lives));
}

// var score = 0;
//
// function scoreUpdate() {
//     ctx.font = "30px Arial";
//     ctx.fillText("Score: " + score, 10, 50);
// }


/**********************************************************
 *                      Event Listeners                   *
 **********************************************************/

window.addEventListener('keydown', function (e) {
    boat.direction = e.keyCode;
})
window.addEventListener('keyup', function (e) {
    boat.direction = false;
})
