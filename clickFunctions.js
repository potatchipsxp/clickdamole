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
var demogForm = document.getElementById('demogQs');
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
var nextstimtime = 700;
var clickedstimnextstim = 500;
var numberoflevels = 8;
var numberofhitsneeded = 20;
var gamecomplete = false;
var showdemogform = true;
var numberofstimsshown = 0;
var maxlevellength = 5;
var levelStartTime;
var leveltimelimit = 120000;
var timemousecords = [];
var timestimsarrive = [];


function startStimTimer(x) {
    var timetimerstarted = Date.now();
    if(stimtimer){
        myStopFunction();    
    }
    stimtimer = setTimeout(placeStim, x);
}

function delaytimer(delay){
    if(stimtimer){
        myStopFunction();
    }
    startStimTimer(delay);
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
    drawMole(stimLocations[index].left + 50, stimLocations[index].top + 50);
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

	if (Date.now() > levelStartTime + leveltimelimit) {
		myStopFunction();
		advanceLevel();
	}
    ++numberofstimsshown;
    Rand_placeStim();
	startStimTimer(nextstimtime);	
}

var drawCircle = function(x, y, fill, color) {
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.beginPath();
    context2.arc(x, y, 50, 0, 2 * Math.PI);
    if(fill == true){
    	context.fillStyle = color;
    	context2.fill();
    } else {
    	context2.stroke();
        timestimsarrive.push(Date.now()); 
    }
};


function myStopFunction() {
    clearTimeout(stimtimer);
    stimtimer = null;
}


var introduction = function() {
    Qform.style.display='none';
    demogForm.style.display='none';
    gameover_text.style.display='none';
    if(version=="boring"){
        whackamole_inst.style.display='none';
    } else if (version == "whackamole") {
        boring_instructions_text.style.display='none';
    }
    context3.font = "30px Arial";
    //context3.strokeText("click the rectangle to begin", 400, 400);
    context3.strokeRect(300, 600, 100, 100);
    context3.fillText("continue", 300, 600)
};

var checkfun = function() {

	$("body").css("background-image", "none");

    Qform.reset();
    Qform.style.display='initial';
    stage = "checkingfun";
};

var play = function(h, lvl) {

    boring_instructions_text.style.display='none';
    whackamole_inst.style.display='none';

    if(version == "whackamole"){
        var grass = new Image();
    
        grass.onload=function(){
            document.body.background = grass;
        }

        grass.src = 'images/grassbackground.jpg';

        $("body").css("background-image", "url(images/grassbackground.jpg)");

    }
	
    Qform.style.display='none';
    available_stimLocations(lvl);
    levelStartTime = Date.now();
    placeStim();
};

var thatsgame = function() {
    demogForm.style.display='none';
    Qform.style.display='none';
    if(showdemogform == true){
        showdemogform = false;
        demogForm.reset();
        demogForm.style.display='initial';
    } else {
        $("body").removeAttr('style');
        console.log("thats game");
        gameover_text.style.display='initial';
        key = makeid();
        jsonkey = JSON.stringify(key);
        $.ajax({
        url: 'savecheckfun.php',
        data: {'checkFunData': jsonkey, 'fname': fname },
        type: 'POST'
        });
        context3.fillText(key, 400, 600);
        saveToFile(mousecordsX);
        console.log("game ovah");
    }
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
        if (clickedX < 400 && clickedX >= 300 && clickedY >= 600 && clickedY <= 700) {
            context3.clearRect(0, 0, canvas3.width, canvas3.height);
            consent = true;
            stage = "playing";
            play(h, difficultylevel);
        }
    } else if (stage == "playing") {
        if ((Math.abs(clickedX - stim.x) < stim.r) && (Math.abs(clickedY - stim.y) < stim.r)) {
            context2.clearRect(0, 0, canvas2.width, canvas2.height);
            if (clickedStims == numberofhitsneeded) {
            	clickedStims++;
                advanceLevel();
            } else {
            	clickedStims++;
                if(version == "whackamole"){
                    drawMole(stim.x, stim.y, true); 
                } else if(version == "boring"){
                    drawCircle(stim.x, stim.y, true, "green");
                }
                delaytimer(clickedstimnextstim);
            }
        }
        else {
        }
    }
});

function advanceLevel() {
	myStopFunction();
	console.log("advancinglevel");
    saveToFile(mousecordsX);
    saveToFile(mousecordsY);
    saveToFile(timemousecords);
    saveToFile(timestimsarrive);
    saveToFile(numberofstimsshown);
    saveToFile(clickedStims);
    console.log("savedstufftofile");
    context2.clearRect(0, 0, canvas3.width, canvas3.height);
    context.clearRect(0, 0, canvas3.width, canvas3.height);
    clickedStims = 1;
    stimIndices = range(stimLocations.length);
    stimLocations = [];
    h = 1;
    ++difficultylevel;
    if(difficultylevel>numberoflevels){
        gamecomplete = true;
    }
    checkfun();    
}

function backtoGame(form){
    saveform(form);
    context3.clearRect(0, 0, canvas3.width, canvas3.height);
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    if(gamecomplete == false){
        stage = "playing";
        play(h, difficultylevel);
        return false;
    } else {
        thatsgame();
        return false;
    }
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
        mousecordsX.push(mouseX);
        mousecordsY.push(mouseY);
        timemousecords.push(Date.now());
        leveltheyreon.push(difficultylevel);
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

function saveform(form) {
    var checkfunData;
    for (i = 0; i < form.length; i++){
        if(form.elements[i].checked == true){
            checkfunData += form.elements[i].name + "=" + form.elements[i].value + ", ";
        }
    }
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

    if(dead==true){
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.drawImage(deadmole, x - 50, y - 50);
    } else{
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.drawImage(livemole, x - 50, y - 50);  
        timestimsarrive.push(Date.now()); 
    }
};

var drawMoleHill = function(x, y) {

    var hole = new Image();
    hole.onload=function(){
     	context.drawImage(hole, x - 35, y + 50);
    }
    hole.src = 'images/mole_hole1.png';
};

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}