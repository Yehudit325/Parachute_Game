/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
        background = new Image();
        sea = new Image();

    canvas.width = 800;
    canvas.height = 600;
    doc.body.appendChild(canvas);

    background.src = 'images/background.png';
    sea.src = 'images/sea.png';

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data.
     */
    function update(dt) {
        plane.update(dt);
        boat.update();
        //updateEntities(dt);
        // checkCollisions();
    }

    // function updateEntities(dt) {
    //     allEnemies.forEach(function(enemy) {
    //         enemy.update(dt);
    //     });
    //     player.update();
    // }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. This function is called every
     * game tick (or loop of the game engine)
     */

    function render() {
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.drawImage(background, 0, 0);
        ctx.drawImage(sea, 0, canvas.height - sea.height + 100);

        plane.render();
        boat.render();
    }


    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    // function renderEntities() {
    //     /* Loop through all of the objects within the allEnemies array and call
    //      * the render function you have defined.
    //      */
    //     allEnemies.forEach(function(enemy) {
    //         enemy.render();
    //     });
    //
    //     player.render();
    // }

    /* This function handles game reset states.
     * It's only called once by the init() method.
     */
    function reset() {
        plane.initLoc();
        boat.initLoc();
    }


    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.canvas = canvas;

    win.onload = function() {init()};

})(this);
