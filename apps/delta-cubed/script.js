function id(id) { return document.getElementById(id); }

function sound(src) {
	var sound = new Audio(src);
	sound.play();
}

var canvas = id("shape");
canvas.style.width = canvas.style.height;
canvas.width = '1024';
canvas.height = '1024';
var ctx = canvas.getContext('2d');

function polygon(sides) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	shape.style.transform = 'rotate(0deg)'; 
	shape.style.webkitTransform = 'rotate(0deg)';
	shape.style.mozTransform = 'rotate(0deg)'; 
    shape.style.msTransform = 'rotate(0deg)'; 
    shape.style.oTransform = 'rotate(0deg)';  
    state = 0;

	var size = 409.6, Xcenter = 512, Ycenter = 512;

	ctx.beginPath();
	ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

	for (var i = 1; i <= sides;i += 1) {
	    ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / sides), Ycenter + size * Math.sin(i * 2 * Math.PI / sides));
	}

	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 8;
	ctx.stroke();
}
var state = 0;
function rotate(dir) {
	var shape = id('shape');
	if (dir == 'c') { deg = (360 / level) }
	else if (dir == 'cc') { deg = (-360 / level) }
	shape.style.transform = 'rotate(' + (state + deg) + 'deg)'; 
	shape.style.webkitTransform = 'rotate(' + (state + deg) + 'deg)'; 
	shape.style.mozTransform = 'rotate(' + (state + deg) + 'deg)'; 
    shape.style.msTransform = 'rotate(' + (state + deg) + 'deg)'; 
    shape.style.oTransform = 'rotate(' + (state + deg) + 'deg)';  
    state = state + deg;
}
var level;
var timesLeft;
function advance() {
	level++;
	timesLeft = level;
	polygon(level);
	data.save();
	sound('wav/advance.wav');
}
shapeNames = {
	over20 : {
		1 : 'henagon', 2 : 'digon', 3 : 'trigon', 4 : 'tetragon', 5 : 'pentagon', 6 : 'hexagon', 7 : 'heptagon', 8 : 'octagon', 9 : 'ennagon', 20 : 'icosi', 30 : 'triaconta', 40 : 'tetraconta', 50 : 'pentaconta', 60 : 'hexaconta', 70 : 'heptaconta', 80 : 'octaconta', 90 : 'enneaconta', 100 : 'hecta'
	},
	under20 : {
		3 : 'triangle', 4 : 'square', 5 : 'pentagon', 6 : 'hexagon', 7 : 'septagon', 8 : 'octagon', 9 : 'nonagon', 10 : 'decagon', 11 : 'hendecagon', 12 : 'dodecagon', 13 : 'triskaidecagon', 14 : 'tetrakaidecagon', 15 : 'pentadecagon', 16 : 'hexakaidecagon', 17 : 'heptadecagon', 18 : 'octakaidecagon', 19 : 'enneadecagon'
	}
};
function shapeName(sides) {
	if (sides >= 20 && sides <= 100) {
		sides = sides.toString();
		if (sides.indexOf('0') == -1) {
			name = shapeNames.over20[sides[0] * 10] + shapeNames.over20[sides[1]];
		} else {
			name = shapeNames.over20[sides] + 'gon';
		}
	} else if (sides > 100) {
		name = sides + '-gon';
	} else if (sides < 20) {
		name = shapeNames.under20[sides];
	}
	return name;
}
var numbers = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
var action = {
	do : function(key) {
		if (key == action.what) {
			rotate('c');
			timesLeft--;
			if (timesLeft <= 0) {
				advance();
			}
			else {
				sound('wav/correct.wav');
			}
		} else {
			rotate('cc');
			timesLeft++;
			if (timesLeft > level) {
				if (level > 3) {
					level--;
					timesLeft = 1;
					polygon(level);
				}
				else {
					timesLeft--;
				}
			}
			sound('wav/wrong.wav');
		}
		action.set();
	},
	set : function() {
		action.what = Math.floor(Math.random() * 10) + 48;
		id('ActionLabel').innerHTML = "Type the number <span class='red'>" + numbers[action.what - 48] + '</span>';
		id('TimesLeftLabel').innerHTML = "Remaining Rotations: " + timesLeft;
		id('NameLabel').innerHTML = 'Level ' + level +  ': ' + shapeName(level);
	},
	what : 48
};

var data = {
	save : function() {
		localStorage.Delta_Level = level;
	},
	load : function() {
		if (localStorage.Delta_Level == undefined) {
			level = 3;
			timesLeft = level;
		} else {
			level = localStorage.Delta_Level;
			timesLeft = level;
		}
	}
};

function start() {
	data.load();
	polygon(level);
	action.set();
	setInterval('data.save()', 10000);
}

document.addEventListener("keypress", function(e){action.do(e.keyCode)});

start();