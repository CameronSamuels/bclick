//decode atob() | encode btoa

function id(id) { return document.getElementById(id); }
function get(what) { return localStorage.getItem(what); }
function set(what, value) { localStorage.setItem(what, value); }
function msg(text) {
	id('DiscoHeader').innerHTML = text;
	setTimeout('id("DiscoHeader").innerHTML = "TapTap";', 3000);
}

document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notify() {

}

var data = {
	save: {
		cookie: function() {
			set('gallons', gallons);
		},
		base64: function() {
			id('GameBase64Text').value = btoa(get('gallons') + '|' + get('gps'));
			id('GameBase64Text').style.display = 'block';
			id('GameBase64Text').focus();
			id('GameBase64Text').select();
		},
		file: function() {

		}
	},
	load: {
		cookie: function() {

		},
		base64: function() {
			var code = prompt('Paste Your Code (Ctrl + V)');
			if (code.toString().length != 0) {
				code = code.toString().split('|');
				set('gallons', code[0]);
			} else {
				msg('Error!');
			}
		},
		file: function() {

		}
	},
	reset: {
		soft: function() {
			set('gallons', 0);
			set('gps', 0);

			set('Update010', 'true');
		},
		hard: function() {
			data.reset.soft();
		}
	}
};




if (get('Update010') != null && get('Update010') != undefined) {
	var gallons = get('gallons');
} else {
	data.reset.hard();
	var gallons = get('gallons');
}

var url = window.location.href.toString();
if (url.indexOf('#') == -1) {
	window.location = "#home";
}