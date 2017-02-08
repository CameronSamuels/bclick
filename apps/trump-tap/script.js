/*============
	Helper
=============*/

function id(id) { return document.getElementById(id); }
function get(variable) { return localStorage[variable]; }
function set(variable, value) { localStorage.setItem(variable, value); }

/*==========
	Game
==========*/

var score = {
	earn : function(amount) {
		if (get("clicksLeft") == 10) {
			set("clicksLeft", 0);
			set("currentTrump", changeFace.list[parseFloat(changeFace.list.indexOf(trump.current.all())) + 1]);
		}
		else if (get("clicksLeft") == undefined) {
			set("clicksLeft", 1);
		}
		else {
			set('my_clicks', parseFloat(get('my_clicks')) + 1);
			set("clicksLeft", parseFloat(get("clicksLeft")) + 1);
		}
		id('trumpPHP').src = 'trump.php';
		if (get("currentTrump") == "undefined") {
			set("currentTrump", changeFace.list[0]);
		}
	},
	refresh : function() {
		id('myClicks').innerHTML = 'My Clicks: ' + get('my_clicks');
		id('getPHP').setAttribute('src', 'get_clicks.php');
		id("totalClicks").innerHTML = "Global Clicks: " + get("total_clicks");
		setTimeout(score.refresh, 500);
	}
};

var changeFace = {
	list : [
		'Angry;angry', 'Painted;final', 
		'Gritter;gritter', 'Toupee;hair', 
		'Smooch;mouth', 'Mustache;mustache', 
		'Horrified;horrified'
	],
	random : function() {
		return changeFace.list[Math.floor(Math.random() * changeFace.list.length)];
	},
	down : function() {
		id('face').setAttribute('src', 'faces/' + trump.current.url() + '.png');
		id("trumpName").innerHTML = trump.current.name() + " Donald";
	},
	up : function() {
		id('face').setAttribute('src', 'faces/smile.jpg');
	}
};

var trump = {
	click : function() {
		changeFace.down();
		score.earn(1);
	},
	current : {
		name : function() {
			return get("currentTrump").toString().split(';')[0];
		},
		url : function() {
			return get("currentTrump").toString().split(';')[1];
		},
		all : function() {
			return get("currentTrump");
		}
	}
};

id('face').style.height = id('face').style.width;

if (get('total_clicks') == undefined || get('my_clicks') == undefined) {
	set('total_clicks', 0);
	set('my_clicks', 0);
}
if(get("currentTrump") == undefined) {
	set("currentTrump", "Smiling;smile");
}

score.refresh();
changeFace.down();