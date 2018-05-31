//  The main page
//  
//  
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var inRange;
var blinkCount = 0;
var mouseMove;

//  Main Page
//  Scroll Up
var rect7Xmin = 1430;
var rect7Xmax = rect7Xmin + 300;
var rect7Ymin = windowHeight * 0.35 -90;
var rect7Ymax = rect7Ymin + 300;
//  Scroll Down
var rect1Xmin = 1430;
var rect1Xmax = rect1Xmin + 300;
var rect1Ymin = windowHeight * 0.9 -90;
var rect1Ymax = 1400;

//  Top Left Scrollbar
//  Scroll Up 
var rect3Xmin = 150;
var rect3Xmax = rect3Xmin + 100;
var rect3Ymin = 40 -90;
var rect3Ymax = rect3Ymin + 180;
//  Scroll Down
var rect4Xmin = 180;
var rect4Xmax = rect4Xmin + 100;
var rect4Ymin = 302 -90;
var rect4Ymax = rect4Ymin + 100;

//  Bottom Left Scrollbar
//  Scroll Up
var rect5Xmin = 110;
var rect5Xmax = rect5Xmin + 130;
var rect5Ymin = 440 -90;
var rect5Ymax = rect5Ymin + 200;
//  Scroll Down
var rect6Xmin = 100;
var rect6Xmax = rect6Xmin + 200;
var rect6Ymin = 950 -90;
var rect6Ymax = rect6Ymin + 130; 

//  Back a page
var rect2Xmin = 1430;
var rect2Xmax = rect2Xmin + 300;
var rect2Ymin = 10;
var rect2Ymax = 300;

// Canvas Clearing Function
function canvasClear(canvasId){
	var c=document.getElementById(canvasId); 
	var ctx=c.getContext("2d");
	ctx.rect(0,0,600,600);
	ctx.fillStyle = "white";
	ctx.fill();
}

//This is a function for drawing circles
function drawCircle(canvasId,x,y,color,radius){
	var c=document.getElementById(canvasId); 
    var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle=color;
	ctx.arc(x,y,radius,0,Math.PI*2,true); 
	ctx.closePath();
	ctx.fill();
}
//Rectangle Function
function drawRectfill(canvasId,x,y,width,length,color){
	var c=document.getElementById(canvasId); 
    var ctx=c.getContext("2d");
	ctx.lineWidth = 0;
	ctx.fillStyle = color;
	ctx.rect(x,y,width,length);
	ctx.fill();
}
//Line drawing function
function drawLine(canvasId,color,width,startx,starty,x1,y1,x2,y2,x3,y3,x4,y4){

	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.moveTo(startx, starty);
	ctx.lineTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.lineTo(x4, y4);
	ctx.stroke();
}

function winkClick(){
	var elementPoint = document.elementFromPoint(xCoords,yCoords);
	
	if(elementPoint == null){
	
	}
	else if(pSizeR1 == 0 && pSizeL1 > 0){
		document.elementFromPoint(xCoords,yCoords).setAttribute("background-color","#ccc1");
		blinkCount++;
		blinked=true;
		alert(elementPoint);
		elementPoint.click();
	}else{blinked=false}	
	if(pSizeL1 == 0 && pSizeR1 > 0){
		blinkCount++;
		blinked=true;
		alert(elementPoint);
		elementPoint.click();
	elementPoint.setAttribute("background-color","#ccc1");
	}else{blinked=false}
}
/*
function onHover() {
		var lookingAt = document.elementFromPoint(xCoords,yCoords)
		for(num = 0; num < 21; num++){
			pageNum = ("javascript:switchPages\(" + num + "\);")
			if(lookingAt == pageNum){
				lookingAt.style.color = "white";
		}
	}
}

function resetToBlack() {
	for(num = 1; num < 20; num++){
		var lookingAtB = document.getElementById("page" + num);
		lookingAtB.style.color = "black";
	}
}
*/
//Scroll function
function scrollElement(elementName,up,left,down,right){
    scrollUp = document.getElementsByName(elementName)[0].value;
	scrollUp.scrollTop += up;
    scrollDown = document.getElementsByName(elementName)[0].value;
	scrollDown.scrollTop -= down;
    document.getElementsByName(elementName)[0].value.scrollLeft += left;
    document.getElementsByName(elementName)[0].value.scrollLeft -= right;
}


function scrollButtonsMainpage(x,y){
	//canvasClear("canvasEyeUp");
	//canvasClear("canvasEyeDown");	
	//Colors and Draws Lines
	drawRectfill("canvasEyeUp",rect7Xmin,rect7Ymin,rect7Xmax,rect7Ymax,"#002222");
	drawRectfill("canvasEyeDown",rect1Xmin,rect1Ymin,rect1Xmax,rect1Ymax,"#002222");
	drawLine("canvasEyeUp","#00aaff",5,0,75,150,0,300,75);
	drawLine("canvasEyeDown","#00aaff",5,0,75,150,150,300,75);
	drawLine("canvasEyeUp","#00aaff",5,0,150,150,75,300,150);
	drawLine("canvasEyeDown","#00aaff",5,0,0,150,75,300,0);
			//Up
		a = (rect7Xmin);
		b = (rect7Xmax);
		c = (rect7Ymin);
		d = (rect7Ymax);
	if (x < b && x > a && y < d && y > c){
			drawRectfill("canvasEyeUp",rect7Xmin,rect7Ymin,rect7Xmax,rect7Ymax,"#33adff","rectUp");
			window.scrollBy(0, -60);
			inRange = true;
		}else{
			inRange = false;
		}
			//Down
	a = (rect1Xmin);
	b = (rect1Xmax);
	c = (rect1Ymin);
	d = (rect1Ymax);
	if (x < b && x > a && y < d && y > c){
			drawRectfill("canvasEyeDown",rect1Xmin,rect1Ymin,rect1Xmax,rect1Ymax,"#33adff","rectDown");
			window.scrollBy(0, 20);
			inRange = true;
		}else{inRange = false;
		drawRectfill("canvasEyeDown",rect1Xmin,rect1Ymin,rect1Xmax,rect1Ymax,"#002222");
		drawLine("canvasEyeDown","#00aaff",5,0,0,150,75,300,0);
		}
}

function scrollButtonsTopLeftScrollbar(x,y){
	//canvasClear("canvasEyeDown2");	
	//canvasClear("canvasEyeUp2");
	//Colors and Draws Lines
	drawRectfill("canvasEyeDown2",rect4Xmin,rect4Ymin,rect4Xmax,rect4Ymax,"#002222");
	drawRectfill("canvasEyeUp2",rect3Xmin,rect3Ymin,rect3Xmax,rect3Ymax,"#002222");
	drawLine("canvasEyeUp2","#00aaff",5,0,75,150,0,300,75);
	drawLine("canvasEyeDown2","#00aaff",5,0,75,150,150,300,75);
	drawLine("canvasEyeUp2","#00aaff",5,0,150,150,75,300,150);
	drawLine("canvasEyeDown2","#00aaff",5,0,0,150,75,300,0);
	
		//Up 
	a = (rect3Xmin);
	b = (rect3Xmax);
	c = (rect3Ymin);
	d = (rect3Ymax);
	if (x < b && x > a && y < d && y > c){
			drawRectfill("canvasEyeUp2",rect3Xmin,rect3Ymin,rect3Xmax,rect3Ymax,"#33adff");
			scrollElement("packageListFrame",0,0,60);
			inRange = true;
		}else{inRange = false;}
		//Down
	a = (rect4Xmin);
	b = (rect4Xmax);
	c = (rect4Ymin);
	d = (rect4Ymax);
	if (x < b && x > a && y < d && y > c){
			drawRectfill("canvasEyeUp2",rect4Xmin,rect4Ymin,rect4Xmax,rect4Ymax,"#33adff");
			scrollElement("packageListFrame",60,0,0);
			inRange = true;
		}
	else{
		inRange = false;
		drawRectfill("canvasEyeDown2",rect4Xmin,rect4Ymin,rect4Xmax,rect4Ymax,"#002222");
		drawRectfill("canvasEyeDown2",rect4Xmin,rect4Ymin,rect4Xmax,rect4Ymax,"#002222");
		drawLine("canvasEyeDown2","#00aaff",5,0,0,150,75,300,0);
	}
	
}

function scrollButtonsBottomLeftScrollbar(x,y){
	//canvasClear("canvasEyeUp3");
	//canvasClear("canvasEyeDown3");
	//Colors and Draws Lines
	drawRectfill("canvasEyeUp3",rect5Xmin,rect5Ymin,rect5Xmax,rect5Ymax,"#002222");
	drawRectfill("canvasEyeDown3",rect6Xmin,rect6Ymin,rect6Xmax,rect6Ymax,"#002222");
	drawLine("canvasEyeUp3","#00aaff",5,0,75,150,0,300,75);
	drawLine("canvasEyeDown3","#00aaff",5,0,75,150,150,300,75);
	drawLine("canvasEyeUp3","#00aaff",5,0,150,150,75,300,150);
	drawLine("canvasEyeDown3","#00aaff",5,0,0,150,75,300,0);
			//Up
		a = (rect5Xmin);
		b = (rect5Xmax);
		c = (rect5Ymin);
		d = (rect5Ymax);
		if (x < b && x > a && y < d && y > c){
			drawRectfill("canvasEyeUp3",rect5Xmin,rect5Ymin,rect5Xmax,rect5Ymax,"#33adff");
			scrollElement("packageFrame",0,0,100);
			inRange = true;
		}else{inRange = false;}
		
			//Down
		a = (rect6Xmin);
		b = (rect6Xmax);
		c = (rect6Ymin);
		d = (rect6Ymax);
		if (x < b && x > a &&y < d && y > c){
			drawRectfill("canvasEyeDown3",rect6Xmin,rect6Ymin,rect6Xmax,rect6Ymax,"#33adff");
			scrollElement("packageFrame",100,0,0);
			inRange = true;
		}
		else{
			inRange = false;		
			drawRectfill("canvasEyeDown3",rect6Xmin,rect6Ymin,rect6Xmax,rect6Ymax,"#002222");
		drawLine("canvasEyeDown3","#00aaff",5,0,0,150,75,300,0);
			}
}

function backButton(x,y){
	//canvasClear("canvasEyeBack");
	//Colors and Draws Lines
	drawRectfill("canvasEyeBack",rect2Xmin,rect2Ymin,rect2Xmax,rect2Ymax,"#002222");
	drawLine("canvasEyeBack","#00aaff",5,150,0,0,75,150,150);
	drawLine("canvasEyeBack","#00aaff",5,300,0,150,75,300,150);
			//Up
	a = (rect2Xmin);
	b = (rect2Xmax);
	c = (rect2Ymin);
	d = (rect2Ymax);
		if (x < b && x > a && y < d && y > c){
			drawRectfill("canvasEyeBack",rect2Xmin,rect2Ymin,rect2Xmax,rect2Ymax,"#33adff");
			window.history.back();
			inRange = true;
		}
		else{
			inRange = false;		
			drawRectfill("canvasEyeBack",rect6Xmin,rect6Ymin,rect6Xmax,rect6Ymax,"#002222");
			drawLine("canvasEyeBack","#00aaff",5,300,0,150,75,300,150);
			drawLine("canvasEyeBack","#00aaff",5,150,0,0,75,150,150);
			}
}






//Code



//  Repeating Function
setInterval(getCoordinates, 500);
//setInterval(resetToBlack, 1000);

//First grabs 5 different sets of Coords, and then averages them out and checks if they are in a scrollbutton or if the user is winking (mouse click)
function getCoordinates(){
	//Trying to have time in which to blink/wink
	setTimeout(getCoordinates1(),0);

	xCoords = xCoord1;
	yCoords = yCoord1 - 90;

	//Making sure that at the very least, the coords taken will be within the screen
	if(xCoords <=0){
		xCoords = 1;
	}
	if(yCoords <=0){
		yCoords = 1;
	}
	

	
	//Activates the different buttons
	scrollButtonsMainpage(xCoords,yCoords);
	scrollButtonsTopLeftScrollbar(xCoords,yCoords);
	scrollButtonsBottomLeftScrollbar(xCoords,yCoords); 
	backButton(xCoords,yCoords);
	
/*	//For getting instant info on what is going on
	headerbar2.innerHTML = ("Eye Tribe Tracker Test  " + blinkCount)
*/	
	drawCircle("canvasEyeDown",150,75,"#ff0000",6); 
	drawCircle("canvasEyeUp",150,75,"#ff0000",6); 
	drawCircle("canvasEyeUp2",150,75,"#ff0000",6); 
	drawCircle("canvasEyeDown2",150,75,"#ff0000",6); 
	drawCircle("canvasEyeUp3",150,75,"#ff0000",6); 
	drawCircle("canvasEyeDown3",150,75,"#ff0000",6); 
	drawCircle("canvasEyeBack",150,75,"#ff0000",6); 
	//Activates the wink detector
	winkClick();
//	onHover();
	
		
}

var xCoord1,yCoord1,pSizeR1,pSizeL1;
var xCoords = 100;
var yCoords = 100;

function getCoordinates1(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:8080", true);
			xhr.onload = function(e){
				if  (xhr.readyState == 4) {
						var jsonString = xhr.responseText;
						coordsDict = JSON.parse(JSON.parse(jsonString));
						xCoord1=coordsDict["x"];
						yCoord1=coordsDict["y"];
						pSizeR1=coordsDict["pr"];
						pSizeL1=coordsDict["pl"];
				} else {
						console.error(xhr.statusText);
				}
			};
		xhr.onerror = function(e) {
			console.error(xhr.statusText);
		};
		xhr.send(null);
}

