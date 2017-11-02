/*
Everytime the player advances a level the difficulty variable increases. 
when that happens one more box will appear on screen and the length of the used circles array will increase by one
this essentially increases the number of places that circle will cycle through.
The length of the used circles array is always 2 less than the number of rectangles
thus the number of times the circle will appear before it can appear in a box again is always numberofboxes - 2
increasing the number of boxes and corresponfing length of used circles increases the number of locations a plauyer must hold in working memory to maximize guessing
*/


var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');
var Qform = document.getElementById('Qform');
var boring_instructions_text = document.getElementById('boring_instructions');
var gameover_text = document.getElementById('gameover');
var whackamole_inst = document.getElementById('whackainst');

var context = canvas.getContext('2d');
context.fillStyle = fillcolor;
context.lineWidth = linewidth;
context.strokeStyle = strokestyle;
context.fillStyle = fontcolor;
context.textAlign = textalign;
context.font = fonttype;

var context2 = canvas2.getContext('2d');
context2.fillStyle = fillcolor;
context2.lineWidth = linewidth;
context2.strokeStyle = strokestyle;
context2.fillStyle = fontcolor;
context2.textAlign = textalign;
context2.font = fonttype;

var context3 = canvas3.getContext('2d');
context3.fillStyle = fillcolor;
context3.lineWidth = linewidth;
context3.strokeStyle = strokestyle;
context3.fillStyle = fontcolor;
context3.textAlign = textalign;
context3.font = fonttype;

var stimLocations = [];
var stimIndices = [];
var usedIndices = [];
var n_back = 2;

var length = 100;
var width = 100;
var fillcolor = "green";
var linewidth = 20;
var strokestyle = "#003300";
var fontcolor = "white";
var textalign = "center";
var fonttype = "bold 32px Arial";
var stim;
var difficultylevel = 3;
var consent = false;
var h = 1;
var clickedStims = 1;
var stage;
var playing = true;
var mousecordsX = [];
var mousecordsY = [];
var leveltheyreon = [];
var fname = "mydata.txt"
var stimtimer;
var version;
var neednewtimer = true;
var timetimerstarted;
var livemole = new Image();
livemole.src = 'images/mole.png'; 
var deadmole = new Image();
deadmole.src = 'images/mole-dead.png';


function startStimTimer(x) {
    console.log("starting a new timer");
    var timetimerstarted = Date.now();
    if(stimtimer){
        myStopFunction();    
    }
    stimtimer = setTimeout(placeStim, x);
}

function delaytimer(timersize){
    console.log("indelaytimer");
    if(stimtimer){
        myStopFunction();
    }
    // x = (timetimerstarted + timersize) - Date.now();
    startStimTimer(500);
}

function Nback_placeStim() {

    n_back = difficultylevel - 2;
    var usedIndicesRemoved = stimIndices.filter(function(remove) {
        return usedIndices.indexOf(remove) < 0;
    });
    var index = usedIndicesRemoved[getRandomInt(0, usedIndicesRemoved.length)];
    usedIndices.push(index);
    stim = new Stim(stimLocations[index].left + 50, stimLocations[index].top + 50, 50);
    if (usedIndices.length > n_back) {
        usedIndices.shift();
    }
    //console.log("boutta draw a circle");
    //drawCircle(rects[index].left + 50, rects[index].top + 50, false);
    drawMole(stimLocations[index].left + 50, stimLocations[index].top + 50);
    // console.log("circle timer is " + circletimer);
}

function Rand_placeStim(){
    var i = getRandomInt(0,stimLocations.length);
    stim = new Stim(stimLocations[i].left + 50, stimLocations[i].top + 50, 50);

    if(version == "whackamole"){
        drawMole(stimLocations[i].left + 50, stimLocations[i].top + 50);   
    } else if(version == "boring"){
        drawCircle(stimLocations[i].left + 50, stimLocations[i].top + 50);
    }
    

}

var placeStim = function() {
    console.log("in place circle");
    Rand_placeStim();
    console.log("placing new mole, new timer");
	startStimTimer(2000);	
}

var drawCircle = function(x, y, fill, color) {
	console.log("draw circle");
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.beginPath();
    context2.arc(x, y, 50, 0, 2 * Math.PI);
    if(fill == true){
    	console.log("filling");
    	context.fillStyle = color;
    	context2.fill();
    } else {
    	console.log("stroking");
    	context2.stroke();
    	console.log("stroked");
    }
};


function myStopFunction() {
    console.log("called my stop function");
    clearTimeout(stimtimer);
    circletimer = null;
    console.log("stimtimeris " + stimtimer);
}


var introduction = function() {
    console.log("intro");
    Qform.style.display='none';
    gameover_text.style.display='none';
    if(version=="boring"){
        whackamole_inst.style.display='none';
    } else if (version == "whackamole") {
        boring_instructions_text.style.display='none';
    }
    context3.font = "30px Arial";
    //context3.strokeText("click the rectangle to begin", 400, 400);
    context3.strokeRect(300, 400, 100, 100);
    context3.fillText("continue", 300, 400)
};

var checkfun = function() {

	$("body").css("background-image", "none");

    console.log("checkfun");
    Qform.reset();
    Qform.style.display='initial';
    stage = "checkingfun";
};

var play = function(h, lvl) {

    boring_instructions_text.style.display='none';
    whackamole_inst.style.display='none';

	console.log("in play");
    if(version == "whackamole"){
        var grass = new Image();
    
        grass.onload=function(){
            document.body.background = grass;
            console.log("set the back ground");
        }

        grass.src = 'images/grassbackground.jpg';

        $("body").css("background-image", "url(images/grassbackground.jpg)");

    }
	
    Qform.style.display='none';
    available_stimLocations(lvl);
    console.log("executing play, aking first circle new timer");
    placeStim();
};

var thatsgame = function() {
	$("body").removeAttr('style');
    console.log("thats game");
    //context3.strokeText("game ova!", 400, 400);
    gameover_text.style.display='initial';
    saveToFile(mousecordsX);
    console.log("game ovah");
};

var available_stimLocations = function(lvl) {
    for (j = 0; j < lvl; j++) {
        //i = j * 700;
        angle = 15 * j;
        a = 75;
        b = 2.7;
        r = a + (b * angle);
        x = r * Math.cos(angle);
        x = Math.round(x) + 400;
        y = r * Math.sin(angle);
        y = Math.round(y) + 400;
        h++;
        label = h.toString();
        //drawRect(x, y, "Box" + label);
        var stimLocation = new StimLocation(x, y, length, width);
        stimLocations.push(stimLocation);

        if(version == "whackamole"){
            drawMoleHill(x, y);   
        } else if(version == "boring"){
            drawRect(x, y, label);
        }
    	

    	//draw(x, y, "Box" + label);
    }
    stimIndices = range(stimLocations.length);
};

var Stim = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
};

var drawRect = function(x, y, filltext) {

    context.strokeRect(x, y, 100, 100);
    //context.fillText(filltext, x, y);

};

var StimLocation = function(x, y, length, width) {
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + length;
};


canvas4.addEventListener('click', function(e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;

    if (stage == "intro") {
        if (clickedX < 400 && clickedX >= 300 && clickedY >= 400 && clickedY <= 500) {
            context3.clearRect(0, 0, canvas3.width, canvas3.height);
            consent = true;
            stage = "playing";
            play(h, difficultylevel);
        }
    } else if (stage == "playing") {
        if ((Math.abs(clickedX - stim.x) < stim.r) && (Math.abs(clickedY - stim.y) < stim.r)) {
            context2.clearRect(0, 0, canvas2.width, canvas2.height);
            if (clickedStims == 5) {
            	clickedStims++;
                advanceLevel();
            } else {
            	clickedStims++;
                console.log("clickedmole, new timer");
            	//clearTimeout(circletimer);
            	//myStopFunction();
            	//drawMole(stim.x, stim.y, true);

                if(version == "whackamole"){
                    drawMole(stim.x, stim.y, true); 
                } else if(version == "boring"){
                    drawCircle(stim.x, stim.y, true, "green");
                }

            	// startCircleTimer(700);
                delaytimer(700);
            }
        }
        else {
            console.log(stimtimer.value);
            console.log(clickedX);
        }

    } /*
    else if (stage == "checkingfun") {
        console.log(clickedX + "," + clickedY);
        if (clickedX < 400 && clickedX >= 300 && clickedY >= 600 && clickedY <= 700) {
        	saveform(Qform);
            context3.clearRect(0, 0, canvas3.width, canvas3.height);
            context2.clearRect(0, 0, canvas2.width, canvas2.height);
            stage = "playing";
            play(h, difficultylevel);
        }
    }
    */
});

function advanceLevel() {
	console.log("advancinglevel");
    saveToFile(mousecordsX);
    context2.clearRect(0, 0, canvas3.width, canvas3.height);
    context.clearRect(0, 0, canvas3.width, canvas3.height);
    clickedStims = 1;
    stimIndices = range(stimLocations.length);
    stimLocations = [];
    h = 1;
    ++difficultylevel;
    if(difficultylevel > 7) {
        thatsgame();
    } else {
        checkfun();
    }
    
}

function backtoGame(form){
    saveform(form);
    context3.clearRect(0, 0, canvas3.width, canvas3.height);
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    stage = "playing";
    play(h, difficultylevel);

    return false;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function range(i) { return i ? range(i - 1).concat(i - 1) : [] }


canvas4.addEventListener('mousemove', function(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
        if(stage == "playing"){
            if(checktime() % 2 == 0) {
                mousecordsX.push(mouseX);
                mousecordsY.push(mouseY);
                leveltheyreon.push(difficultylevel);
            }
        }
});

var checktime = function() {
    var d = new Date();
    return d.getTime();
}

function saveToFile(data) {
    jsonString = JSON.stringify(data);
    $.ajax({
        url: 'save.php',
        data: { 'jsonString': jsonString, 'fname': fname },
        type: 'POST'
    });
}

function saveform() {
    var checkfunData;
    for (i = 0; i < Qform.length; i++){
        if(Qform.elements[i].checked == true){
            checkfunData += Qform.elements[i].name + "=" + Qform.elements[i].value + ", ";
        }
    }
    console.log("checkfundata is " + checkfunData);
    json_checkfunData = JSON.stringify(checkfunData);
    $.ajax({
        url: 'savecheckfun.php',
        data: {'checkFunData': json_checkfunData, 'fname': fname },
        type: 'POST'
    });
    return false;
}

function updateSlider(value, slider) {
    document.getElementById(slider).innerHTML=value;
}





/*

NEW FUNCTIONS MADE FOR WHACKAMOLE

*/



var drawMole = function(x, y, dead) {

	// console.log("drawing a mole");

    if(dead==true){
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.drawImage(deadmole, x - 50, y - 50);
    } else{
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.drawImage(livemole, x - 50, y - 50);   
    }
};

var drawMoleHill = function(x, y) {

	console.log("drawing a molehill");

    var hole = new Image();
    hole.onload=function(){
     	context.drawImage(hole, x - 35, y + 50);
    }
    hole.src = 'images/mole_hole1.png';
    
    console.log("drew mole hill");

};