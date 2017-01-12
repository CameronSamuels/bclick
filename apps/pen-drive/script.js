function id(id) { return document.getElementById(id); }

var pencil = id("pencil");
var canvas = id("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var vx = 0, vy = 0, ax = 0, ay = 0;

var coord = {
	x : (screen.width / 4),
	y : (screen.height / 4)
};

var prev = {
	x : (screen.width / 4),
	y : (screen.height / 4)
};

var paused = 'false';
var sec = 0;
var tenth = 0;

function pause() {
	paused = (paused == 'true' ? 'false' : 'true');
}

function addTime() {
	if (paused == 'false') {
		if (tenth == 10) {
			tenth = 0;
			sec = parseFloat(sec) + 1;
		} else tenth = parseFloat(tenth) + 1;
		id('Time').innerHTML = "Time: " + sec + '.' + tenth;
	}
}

setInterval(addTime, 100);

function over() {
	paused = 'true';
	id('msgTitle').innerHTML = 'Game Over!';
	id('msgText').innerHTML = 'Tap anywhere to restart.';
	id('body').setAttribute('ontouchend', 'location.reload()');
	id('msg').style.display = 'block';
}

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
		ax = event.accelerationIncludingGravity.x * 3;
		ay = event.accelerationIncludingGravity.y * 3;
	}
}

// function neatTime(time) {
//     time = time.toString().substring(0, time.length - 3);
//     var s = time.toString().substring(0, time.length);
//     var ms = time.toString().substring(s.length, time.length);
//     return s + '.' + ms;
// }

var lines = [];

function refresh() {
	if (paused == 'false') {
		var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
		if ( landscapeOrientation) {
			vx = vx + ay;
			vy = vy + ax;
		} else {
			vy = vy - ay;
			vx = vx + ax;
		}
		
		vx = vx * 0.98;
		vy = vy * 0.98;
		coord.y = parseInt(coord.y + vy / 30);
		coord.x = parseInt(coord.x + vx / 30);

        // for (i = 0; i < Math.abs(Math.abs(coord.x + 22) - Math.abs(prev.x + 22)); i++) {
        //     for (j = 0; j < Math.abs(Math.abs(coord.y + 52) - Math.abs(prev.y + 52)); j++) {
        //         lines.push({ x: (coord.x + 22), y: (prev.y + 52), status: 1 });
        //     }
        // }

		ctx.beginPath();
		ctx.moveTo((prev.x + 22), (prev.y + 52));
		ctx.lineTo((coord.x + 22), (coord.y + 52));
		ctx.stroke();
		
		prev.y = parseInt(coord.y);
		prev.x = parseInt(coord.x);
		
		boundingBoxCheck();
// 		collisionDetect();
		
		pencil.style.top = coord.y + 'px';
		pencil.style.left = coord.x + 'px';
		
		if (localStorage.PenDriveHighScore == undefined || localStorage.PenDriveHighScore <= sec) {
		    localStorage.PenDriveHighScore = sec;
		}
		id('Best').innerHTML = "Best: " + localStorage.PenDriveHighScore;
	}
	window.requestAnimationFrame(refresh);
}

refresh();

function collisionDetect() {
    for(i=0; i < lines.length; i++) {
        var b = lines[i];
        if((coord.x) > b.x && (coord.x) < b.x && (coord.y) > b.y && (coord.y) < b.y) {
            over();
        }
    }
}

function boundingBoxCheck(){
	if (coord.x<0) { coord.x = 0; vx = -vx; over(); }
	if (coord.y<0) { coord.y = 0; vy = -vy; over(); }
	if (coord.x>document.documentElement.clientWidth-20) { coord.x = document.documentElement.clientWidth-20; vx = -vx; over(); }
	if (coord.y>document.documentElement.clientHeight-20) { coord.y = document.documentElement.clientHeight-20; vy = -vy; over(); }

}

// function Shuffle(o) {
// 	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
// 	return o;
// };

// var collection = [];
// var loadedIndex = 0;

// function init(audios) {
//   for(var i=0;i<audios.length;i++) {
//     var audio = new Audio(audios[i]);
//     collection.push(audio);
//     buffer(audio);
//   }
// }
// function buffer(audio) {
//   if(audio.readyState==4)return loaded();
//   setTimeout(function(){buffer(audio)},100);
// }
// function loaded() {
//   loadedIndex++;
//   if(collection.length==loadedIndex)playLooped();
// }
// function playLooped() {
//   var audio=Math.floor(Math.random() * (collection.length));
//   audio=collection[audio];
//   audio.play();
//   setTimeout(playLooped,audio.duration*1000);
// }

// var music = ['music/0.mp3', 'music/1.mp3', 'music/2.mp3', 'music/3.mp3', 'music/4.mp3', 'music/5.mp3', 'music/6.mp3'];
// init(Shuffle(music));

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS() || isMobile.Windows()); }
};

if (!isMobile.any()) alert("Not Supported on computers which don't have an accelerometer");