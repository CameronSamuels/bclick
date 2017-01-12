/*=======================\
	Copyright 2016
	Cameron Samuels
-------------------------
		Terms:
	-Do not:
	   -Sell this code
	   -Use this code as your own creation
	   	-Make illegal copies of this code
	-Do:
		-Use this code at your own risk
=======================*/

//intitial variable set
var m = {};

//----//

//get element by id
m.id = function(id) {
	return document.getElementById(id);
};

//get array of elements by class
m.cls = function(cls) {
	return document.getElementById(cls);
}

//get array of elements by tag
m.tag = function(tag) {
	return document.getElementByTagName(tag);
}

//get array of elements by name
m.name = function(name) {
	return document.getElementByName(name);
}

//----//

//for loop code, count times
m.fl = function(code, count) {
	for (i = 0; i < count; i++) {
		code();
	}
}

//while loop code
m.wl = function(code, statement) {
	while(statement) {
		code();
	}
}

//set intereval loop
m.il = function(code, ms) {
	setInterval(code, ms);
}

//----//

//print code on screen
m.print = function(text) {
	document.write(text);
}

//append innerHTML
m.append = function(id, html) {
	id(id).innerHTML += html;
}

//set innerHTML
m.html = function(id, html) {
	id(id).innerHTML = html;
}

//log text into console
m.log = function(text) {
	console.log(text);
}

//----//

//array of numbers
m.nums = [
    "", "Thousand", "Million", "Billion", "Trillion", 
    "Quadrillion", "Quintillion", 
    "Sextillion", "Septillion", "Octillion", 
    "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", 
    "Quattuordecillion", "Quindecillion",
     "Sexdecillion", "Septendecillion", "Octodecillion", 
     "Novemdecillion", "Vigintillion", "Centillion"
];

//to real number format
m.dcml = function(x) {
	var e;
	if (Math.abs(x) < 1.0) {
		e = parseInt(x.toString().split('e-')[1]);
		if (e) {
		 	x *= Math.pow(10,e-1);
			x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
		}
	} else {
		e = parseInt(x.toString().split('+')[1]);
			if (e > 20) {
				e -= 20;
				x /= Math.pow(10,e);
				x += (new Array(e+1)).join('0');
			}
		}
	return x;
}

//to comma formatted
m.rdble = function(num) {
	var newNum = Math.round(num);
	newNum = newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return newNum;
}

//to a 1 with zeros
m.eg = function(num) {
	num = m.dcml(parseFloat(num));
	var length = num.toString().length;
	length = length - 1;
	var string = "1";
	m.fl(function(){string = string + "0"}, length); 
	return string;
}

//convert to the rounded number with zeros
m.erg = function(num) {
	var round = num.toString();
	round = round.charAt(0) + "." + round.charAt(1);
	round = Math.round(parseFloat(round));
	var length = num.toString().length;
	length = length - 1;
	var string = round;
	m.fl(function(){string = string + "0"}, length); 
	return string;
}

//convert to string with rounded value and name of place value number
m.giant = function(num) {
	num = Math.round(num);
	var EG = m.eg(num);
	var length = EG.toString().length - 1;
	var groups = (length / 3);
	if (groups.toString().indexOf(".666") != -1 || groups.toString().indexOf(".333") != -1) groups = Math.floor(groups);
	EG = "1";
	m.fl(function(){EG += "000"}, groups);
	if (EG == "1" || m.nums[groups] === undefined) return num;
	else if (m.nums[groups] !== undefined && EG != "1") return (num / EG).toFixed(1) + " " + m.nums[groups];
}

//encode text to base 64
m.b64 = {
	t : function(string) {
		return btoa(string);
	},
	f : function(string) {
		return atob(string);
	}
}

//----//

m.ls = localStorage;
m.vbt = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

//----//

//get added value
m.add = function(what, amount) {
	return parseFloat(what) + parseFloat(amount);
}

//get subtracted value
m.sub = function(what, amount) {
	return parseFloat(what) - parseFloat(amount);
}

//----//

m.tgl = function(current, first, second) {
    return current == first ? second : first;
}

//----//

//confirm a yes/no choice
m.ask = function(text) {
	return confirm(text);
}

//prompt for an answer
m.qstn = function(text, dflt) {
	return prompt(text, dflt);
}

//alert a popup
m.tell = function(text) {
	alert(text);
}

//----//

//return time since a date
m.ts = function(date) {
	return (m.sub(new Date().getTime(), date) / 1000);
}

// m.time = function(t) {
// 	if (t < 3600) {
// 		var m=~~(t/60), s=~~(t % 60);
// 		return (m<10?"0"+m:m)+':'+(s<10?"0"+s:s);
// 	} else if (t >= 3600 && t < 86400) {
// 		var h=~~(t/60), m=~~(t/3600), s=~~(t % 3600);
// 		return (m<10?"0"+m:m)+':'+(s<10?"0"+s:s);
// 	}
// }