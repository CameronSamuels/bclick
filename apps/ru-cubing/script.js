if (window.location.protocol != "https:" && window.location.href.toString().includes('playbclick.com')) window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

// ===== Helper Functions ===== //
function id(what) { return document.getElementById(what) }
function get(what) { return localStorage[what] }
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS()); }
};

// ===== Timing Functions ===== //
var timer = {};
timer.time = 0;
timer.run = 'false';
timer.base = 0;
timer.toggle = function() {
	if (timer.run == 'false') {
        if (id('timer').style.color == "rgb(127, 255, 0)") {
    		timer.time = 0;
    		timer.base = new Date();
    		timer.run = 'true';
    		id('timer').style.color = '#7FFF00';
        }
	}
	else if (timer.run == 'true') {
		timer.run = 'false';
		id('timer').style.color = '#FFF';
		id('scramble').innerHTML = generateScramble();
		// localStorage.RUCubingTimes += timer.time + ',';
		// refreshTimes();
	}
};
timer.tick = function() {
	if (timer.run == 'true') {
		timer.time = new Date() - timer.base;
		id('timer').innerHTML = timer.format(timer.time);
		document.title = timer.format(timer.time) + ' - RU Cubing';
	}
	window.requestAnimationFrame(timer.tick);
};
timer.format = function(time) {
	var ms = time.toString().substring(time.toString().length - 3, time.toString().length);
	var h = Math.floor(time / 3600000);
	var m = Math.floor(time / 60000) - (h * 3600);
	var s = Math.floor(time / 1000) - (m * 60);
	time = '';
	if (h >= 1) { time = h + ':' }
	if (m >= 1) { time += m + ':' }
	for (i = 0; i < (2 - s.toString().length); i++) { s = '0' + s; }
	time += s + ':';
	for (i = 0; i < (3 - ms.length); i++) { ms = '0' + ms; }
	time += ms;
	return time;
};

function generateNotation() {
	var notation = Math.floor(Math.random() * 6);
    switch (notation) {
        case 0: notation = "U"; break;
        case 1: notation = "D"; break;
        case 2: notation = "F"; break;
        case 3: notation = "B"; break;
        case 4: notation = "L"; break;
        case 5: notation = "R"; break;
        default: notation = "U";
    }
    var addOn = Math.floor(Math.random() * 6);
    if (addOn == 3 || addOn == 4) {
        notation += "i";
    } else if (addOn == 5) {
        notation += "2";
    }
    return notation;
}

function generateScramble() {
	var scramble = '';
    var notation = "U", notation2;
    for (i = 0; i < 25; i++) {
        notation2 = notation;
        notation = generateNotation();
        while (notation.charAt(0) == notation2.charAt(0) || notation2.charAt(0) == notation.charAt(0)) {
            notation = generateNotation();
        }
        scramble += notation + " ";
    }
    return scramble;
}

// ===== Keyboard Events ===== //
var keyDown = 'false';
id('body').onkeyup = function (e) {     
    if (e.keyCode == 32) {
        timer.toggle();
        document.getElementById('timer').style.color = "#FFFFFF";
        keyDown = 'false';
    }
};
id('body').onkeydown = function (e) {
    if (keyDown == 'false') {
        if (e.keyCode == 32) {
            document.getElementById('timer').style.color = "#FF0000";
            keyDown = 'true';
            setTimeout(function(){if (keyDown == 'true'){document.getElementById('timer').style.color = "#7FFF00";}}, 550);
        }
    }
};
id('body').setAttribute('ontouchend', "timer.toggle();document.getElementById('timer').style.color = '#FFFFFF';keyDown = 'false';");
id('body').setAttribute('ontouchstart', "if (keyDown == 'false') {document.getElementById('timer').style.color = '#FF0000';keyDown = 'true';setTimeout(function(){if (keyDown == 'true'){document.getElementById('timer').style.color = '#7FFF00';}}, 550);}");

// ===== Mobile Support ===== //
if (!isMobile.any()) { 
    id('body').setAttribute('onmousedown', id('body').getAttribute('ontouchstart')); 
    id('body').setAttribute('onmouseup', id('body').getAttribute('ontouchend'));
}
if (isMobile.Android()) window.location = "https://play.google.com/store/apps/details?id=com.satchmo.rucubing";

// ===== Shake Events ===== //
var shakeEvent = new Shake({threshold: 15});
shakeEvent.start();
window.addEventListener('shake', function(){id('scramble').innerHTML = generateScramble()}, false);
function stopShake() { shakeEvent.stop(); }

// ===== Initilize ===== //
id('scramble').innerHTML = generateScramble();
timer.tick();

// function refreshTimes() {
// 	var times = get("RUCubingTimes").toString().split(',');
// 	for (i = 0; i < times.length; i++) {
// 		id('times').innerHTML += '<li>' + timer.format(times[i]) + '</li>';
// 	}
// }

// if (get("RUCubingTimes") == undefined) { localStorage.RUCubingTimes = ''; }
// refreshTimes();