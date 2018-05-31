/*
--The rectangles found on the webpage are divided amongst the html of the different pages in different frames.
*/
var inRange;
var xCoords;
var yCoords;
var times = 0;
var gazeXstart;
var gazeYstart;
var gazeX;
var gazeY;
var newCoords;
function canvasClear(canvasId) {
//    "use strict";
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#002222";
    ctx.fillRect(0, 0, 600, 600);
    ctx.closePath();
}

//This is a function for drawing circles
function drawCircle(canvasId, x, y, color, radius) {
//    "use strict";
    var canvas = document.getElementById(canvasId);
    if (canvas === null) {
    } else {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}
//Rectangle Function
function drawRectfill(canvasId, x, y, w, l, color) {
//    "use strict";
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
    ctx.strokeStyle = color;
    ctx.fillRect(x, y, w, l);
    ctx.closePath();
}
//Line drawing function
function drawLine(canvasId, color, width, startx, starty, x1, y1, x2, y2, x3, y3, x4, y4) {
//    "use strict";
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.stroke();
    ctx.closePath();
}

// Changes the coloor of the element 
function setColor(elementID, colorID) {
//    "use strict";
    elementID.style.color = colorID;
}


// Setting up Main Page
function buttons(x, y) {
//    "use strict";

    //  Scroll Up
    var rect7Xmin = 1450;
    var rect7Xmax = rect7Xmin + 100;
    var rect7Ymin = 440;
    var rect7Ymax = rect7Ymin + 100;
    if (x < rect7Xmax && x > rect7Xmin && y < rect7Ymax && y > rect7Ymin) {
        parent.frames[2].scrollBy(0, -40);
    }

    //  Scroll Down
    var rect1Xmin = 1450;
    var rect1Xmax = rect1Xmin + 100;
    var rect1Ymin = 900;
    var rect1Ymax = rect1Ymin + 100;
    if (x < rect1Xmax && x > rect1Xmin && y < rect1Ymax && y > rect1Ymin) {
        parent.frames[2].scrollBy(0, 20);
    }

    //  Back a page
    var rect2Xmin = 1450;
    var rect2Xmax = rect2Xmin + 200;
    var rect2Ymin = 10;
    var rect2Ymax = 170;
    if (x < rect2Xmax && x > rect2Xmin && y < rect2Ymax && y > rect2Ymin) {
        setTimeout(window.history.back(), 500);
    }

    //  Top Left Scrollbar
    //  Scroll Up
    var rect3Xmin = 310;
    var rect3Xmax = rect3Xmin + 200;
    var rect3Ymin = -20;
    var rect3Ymax = rect3Ymin + 140;
    if (x < rect3Xmax && x > rect3Xmin && y < rect3Ymax && y > rect3Ymin) {
        parent.frames[0].scrollBy(0, -10);
    }

    //  Scroll Down
    var rect4Xmin = 310;
    var rect4Xmax = rect4Xmin + 200;
    var rect4Ymin = 250;
    var rect4Ymax = rect4Ymin + 130;
    if (x < rect4Xmax && x > rect4Xmin && y < rect4Ymax && y > rect4Ymin) {
        parent.frames[0].scrollBy(0, 10);
    }

    //  Bottom Left Scrollbar
    //  Scroll Up
    var rect5Xmin = 300;
    var rect5Xmax = rect5Xmin + 200;
    var rect5Ymin = 400;
    var rect5Ymax = rect5Ymin + 60;
    if (x < rect5Xmax && x > rect5Xmin && y < rect5Ymax && y > rect5Ymin) {
        parent.frames[1].scrollBy(0, -20);
    }

    //  Scroll Down
    var rect6Xmin = 300;
    var rect6Xmax = rect6Xmin + 200;
    var rect6Ymin = 1050;
    var rect6Ymax = rect6Ymin + 80;
    if (x < rect6Xmax && x > rect6Xmin && y < rect6Ymax && y > rect6Ymin) {
        parent.frames[1].scrollBy(0, 20);
    }
}

// Detects which frame the user is looking at
function getWhichFrame(x,y) {
    if (y < 335 && x < 382) {
        return 0;
    } 
    else if (y > 335 && x < 382) {
        return 1;
    }
    else {
        return 2;
    }
}
//Detects which frame is calling the function
function getWhichFrameAmI() {
    if (getWhichFrameAmI.caller instanceof top.packageListFrame.Function) {
        return 0;
    } else if (getWhichFrameAmI.caller instanceof top.packageFrame.Function) {
        return 1;
    } else {
        return 2;
    }
}

var whichFrame = -1;
var whichFrameAmI = -1;

// The Basic function for getting the eye gaze coordinates.
function getCoordinates() {
//    "use strict";
    var coordsDict;
    // GET
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080", true);
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            var jsonString = xhr.responseText;
            coordsDict = JSON.parse(jsonString);
            //console.log(coordsDict);
            xCoords = coordsDict.x;
            //console.log(xCoords);
            yCoords = coordsDict.y;
            //console.log(yCoords);
            whichFrame = getWhichFrame(xCoords,yCoords);
            whichFrameAmI = getWhichFrameAmI();
        } else {
            console.error(xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

var resetVar;



    var ready = true;
    var w = 0;
    var elemCheck = 0;


// The function that calls the other functions in order and draws the circles on the canvases
function gazeScroll() {
//    "use strict";

    // Prevent crashing by reloading the page if it runs too many times.
    times += 1;
    getCoordinates();
    if (whichFrameAmI != whichFrame) {
        return;
    }

    // Set the coords to click
    gazeXstart = xCoords; // Not really a blink
    gazeYstart = yCoords - 70;



    // Loops 3 times, getting a coord, waitng until it comes back, then checking and seeing if it is in the same area as the fist, then adds one to the counter as long as the user is looking at the same element, until w = 3, at which point it performs a click on those coords.
    for (var i = 0; i < 3; i += 1) {

        // Making sure it doesn't loop too fast
        if (ready != false) {
        var coordsDict;


        // GET from server
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080", true);
        // signals to wait until server responds
        ready = false;



        xhr.onload = function () {
            if (xhr.readyState === 4) {
                //Tells code to go ahead with next request
                ready = true;
                var jsonString = xhr.responseText;
                coordsDict = JSON.parse(jsonString);                
                gazeX = coordsDict.x;
                gazeY = coordsDict.y - 70;

                // This is to determine which area the user is looking at, and to augment the x and y positions based on that 
                var topLeftCanvas = "topLeftCanvas";
                var bottomLeftCanvas = "bottomLeftCanvas";
                var rightCanvas = "rightCanvas";
                
                
                   // Top Left
                if (gazeX < 405 && gazeY < 325){
                    gazeY -= 38;
                    gazeYstart -= 38;
//                    console.log("top left       " + gazeY + "  " + gazeX);
                    // Bottom Left
                } 
                if (gazeX < 405 && gazeY > 325){
                    gazeY -= 335;
                    gazeYstart -= 335;
//                    console.log("bottom left    " + gazeY + "  " + gazeX);
                    // Right Canvas
                } else if (gazeX > 405 && gazeY > 0){
                    gazeX -= 405;
                    gazeXstart -= 405;
                    gazeY += 15;
                    gazeYstart += 15;
//                    console.log("right          " + gazeY + "  " + gazeX);
                } else {
                    
                }
                var elemGaze1 = document.elementFromPoint(gazeXstart,(gazeYstart));

                var elemGaze2 = document.elementFromPoint(gazeX,gazeY);
                if (elemGaze2 != null)
                {
                //console.log(elemGaze2)
                } 

                // Checks the two coords, if they are close enough, add one to the w points, to determine how long the user has been staring

                // Element checking
                if (elemGaze1 != null) {
                    if (gazeXstart + 15 > gazeX && gazeXstart - 15 < gazeX && gazeYstart + 15 > gazeY && gazeYstart - 15 < gazeY && elemCheck > 0) {
                        w = w + 1;
                    } else {
                        // Subtracts all w points if the user breaks their stare.
                        w = 0;
                    }
                    if (elemCheck === 3 && elemGaze1 === elemGaze2 && elemGaze1.nodeName === "A") {
                        //elemGaze1.click();
                    }
                    if (elemCheck === 2 && elemGaze1 === elemGaze2 && elemGaze1.nodeName === "A") {
                        setColor(elemGaze1,"Red");
                        elemCheck = 3;
                        elemGaze1.click();
                    }   
                    if (elemCheck === 1 && elemGaze1 === elemGaze2 && elemGaze1.nodeName === "A") {
                        setColor(elemGaze1,"#cc9900");
                        elemCheck = 2;
                    }
                    if (elemCheck != 3 && elemCheck != 2 && elemGaze1 === elemGaze2 && elemGaze1.nodeName === "A") {
                        setColor(elemGaze1,"Green");
                        elemCheck = 1;
                    }
                    if (elemGaze1 != elemGaze2 && elemGaze1.nodeName === "A") {
                        setColor(elemGaze1,"#551A8B");
                        setColor(elemGaze2,"#551A8B");
                        elemCheck = 0;
                    }
                }
                // If w points = 3 and the element is the same, reset w points and click at the element, filtering out frames and other useless elements
                if (w === 3 && elemCheck === 3){
                    w = 0;
                    var elem = elemGaze1;
                    if (elem === null){
                        elem = 10;
                    } else {
                        var type = elem.nodeType;
                        console.log(elem.nodeName);
                        if (elem.nodeName === "FRAME" || elem.nodeName === "TD" || elem.nodeName === "FRAMESET") {
                            elem = 10
                        } else {
                            console.log("clicked on " + elem + " at X val:" + (gazeXstart) + " and Y val:" + (gazeYstart));
                            elemCheck = 0;
                            elem.click();
                            setColor(elem,"#551A8B");
                        }
                    }
                }
                // End coord checking


                // If the xhr has an error
            } else {
                console.error(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error(xhr.statusText);
        };
        xhr.send(null);
        }
    }

    buttons(xCoords, yCoords);
    //The Spots in the center
    drawCircle("canvasEyeDown", 150, 75, "#ff0000", 6);
    drawCircle("canvasEyeUp", 150, 75, "#ff0000", 6);
    drawCircle("canvasEyeUp2", 150, 75, "#ff0000", 6);
    drawCircle("canvasEyeDown2", 150, 75, "#ff0000", 6);
    drawCircle("canvasEyeUp3", 150, 75, "#ff0000", 6);
    drawCircle("canvasEyeDown3", 150, 75, "#ff0000", 6);
    drawCircle("canvasEyeBack", 150, 75, "#ff0000", 6);
    
    // Refreshes after a time to make sure that it doesn't overload
        if (times === 5000) {
            document.location.reload(true);
        }
}
//alert(document.elementFromPoint(9,9).id);
//Code
//  Repeating Function
var eyeTracker = setInterval(gazeScroll, 700);