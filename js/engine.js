/* Engine.js
 * This file provides the game loop functionality,
 * draws the initial game board on the screen, and then calls the update and
 * render methods on all objects (defined in app.js).
 */

var Engine = (function(global) {

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
        /* Get the time delta information which ensures smooth animation
        when app is run on different users computers.
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        /* Set the lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        global.animate = win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once*/
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update data.
     */
    function update(dt) {
        plane.update(dt);
        boat.update();

        allParachuters.forEach(function(parachute) {
                parachute.update(dt);
            });
    }

    /* This function initially draws the game area.
     * This function is called every game tick
     * It calls all render functions defined for the objects in app.js
     */
    function render() {
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        ctx.drawImage(background, 0, 0);
        ctx.drawImage(sea, 0, canvas.height - sea.height + 100);

        plane.render();
        boat.render();
        allParachuters.forEach(function(parachute) {
                parachute.render();
            });

        score.render();
        lives.render();
    }

    /* This function handles game reset states.
     * It's only called once by the init() method.
     */
    function reset() {
        plane.initLoc();
        boat.initLoc();
    }

    /* Assign the canvas and canvas' context object to the global variable for ease of use
     * from within the app.js file.
     */
    global.ctx = ctx;
    global.canvas = canvas;

    // Initialize game as soon as all content has been loaded.
    win.onload = function() {init()};

})(this);
