/*===========================================
	bClick - The Addicting B-Clicking Game	
=============================================
	  Copyright Satchmo Sanders 2012-2016
=============================================
	This code includes:
		-My own created code
		-Code from Stack overflow (not mine)
        -Code from W3Schools
        -Code from MDN
		-Code from random sites
		-Code from Cookie Clicker
		-And ideas from friends and family
=============================================
	Use this code at your own risk!
===========================================*/

/*==============
	Variables
==============*/

var numbers = [
    "", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Centillion"
];

/*=====================
	Helper Functions
=====================*/

function web(url) { window.open(url, "_blank"); }

function id(id) { return document.getElementById(id); }

function cls(name) { return document.getElementsByClassName(name); }

function get(what) { return localStorage[what];; }

function set(what, value) {
	localStorage.setItem(what, value);
}

function add(what, amount) {
	return parseFloat(what) + parseFloat(amount);
}

function subtract(what, amount) {
	return what = parseFloat(what) - parseFloat(amount);
}

function format(what, way) {
    if (way == 0) { return toGiant(what); }
    else if (way == 1) { return Math.round(what).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
}

function toggle(current, first, second) {
    return current == first ? second : first;
}

function ask(text) {
    return confirm(text);
}

function poof(string, what) {
    var reg = new RegExp(what, 'g');
    return string.replace(reg, '');
}

function full(elem) {
    var elem = id(elem);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
}

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS() || isMobile.Windows()); }
};

/*============
    Numbers
============*/

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

var format = {
    commas : function(num) {
        var newNum = Math.round(num);
        newNum = newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return newNum;
    },
    eg : function(num) {
        var num = toFixed(parseFloat(num));
        var length = num.toString().length;
        length = length - 1;
        var string = "1";
        for (i = 0; i < length; i++) {
            string = string + "0"; 
        }
        return string;
    },
    erg : function(num) {
        var round = num.toString();
        round = round.charAt(0) + "." + round.charAt(1);
        round = Math.round(parseFloat(round));
        var length = num.toString().length;
        length = length - 1;
        var string = round;
        for (i = 0; i < length; i++) {
            string = string + "0"; 
        }
        return string;
    },
    giant : function(num) {
        num = Math.round(num);
        var EG = format.eg(num);
        var length = EG.toString().length - 1;
        var groups = (length / 3);
        if (groups.toString().indexOf(".666") != -1 || groups.toString().indexOf(".333") != -1) {
            var groups = Math.floor(groups);
        }
        EG = "1";
        for (i = 0; i < groups; i++) {
            EG += "000";
        }
        if (EG == "1" || numbers[groups] == undefined) {
            return num;
        }
        else if (numbers[groups] != undefined && EG != "1") {
            return (num / EG).toFixed(1) + " " + numbers[groups];
        }
    }
};

/*=============
    General
=============*/

function hideMsg() {
    id("message").style.display = "none";
}

function msg(title, text) {
    id("messageTitle").innerHTML = title;
    id("messageText").innerHTML = text;
    id("message").style.display = "block";
    setTimeout(hideMsg, 3000);
}

/*====================
	Core Functions
====================*/

function Earn(amount) {
	if (get("points") < Math.pow(10, 308)) { set("points", add(get("points"), amount)); } 
	else { set('points', format.eg(Math.pow(10, 308))); }
	achievements.check();
}
 
 function Purchase(amount) {
    set('points', subtract(get('points'), amount));
 }

function ClickB(name, worth) {
    var name = name;
    if (get(name) == 'true') {
        if (get('clicks') == undefined) { set('clicks', 0); }
        else { set('clicks', add(get('clicks'), 1)); }
        Earn(parseFloat(worth) * get("multiplier"));
    }
    else { msg("Not Unlocked!", "This B is not unlocked. Press the unlock button below the B to unlock it."); }
}

function UnlockB(name, cost) {
    if (get(name) == 'false') {  
        if (get("points") >= cost) {
            set(name, true);
            msg("Unlocked B!", "You have unlocked the " + name + " B.");
            if (get("unlocked") == undefined) { set("unlocked", 1); }
            else { set('unlocked', add(get("unlocked"), 1)); } 
            Purchase(cost);  
        }
        else { msg("Insufficient Points!", "Earn more points to do this task."); }
    }
    else { msg("Already Unlocked!", "Click the B button to get points."); }
}

/*===================
    Achievements
===================*/

var achievements = {
    list : {
        spaces : [
            "Earn 1 Thousand Points",
            "Earn 1 Million Points",
            "Earn 1 Billion Points",
            "Unlock 3 B's",
            "Unlock 5 B's",
            "Unlock 10 B's",
            "Unlock 16 B's",
            "Click 50 Times",
            "Click 500 Times",
            "Click 1,500  Times",
            "Have 1 Thousand Interest",
            "Have 1 Million Interest",
            "Have 1 Billion Interest"
        ],
        id : []
    },
    achieve : function(id) {
        set(id, true);
        set('multiplier', parseFloat(get('multiplier')) * 2);
        msg("Earned the " + achievements.list.spaces[achievements.list.id.indexOf(id)] + " Achievement!", "Your earning multiplier is now " + Math.round(get("multiplier")));    
    },
    check : function() {
        var obj = achievements;
        for (i = 0; i < obj.list.spaces.length; i++) {
            var amount = obj.list.spaces[i].toString().replace(',', '').split(' ')[1];
            if (amount == '1') {
                switch (obj.list.spaces[i].toString().split(' ')[2]) {
                    case "Thousand" : amount = 1000; break;
                    case "Million" : amount = Math.pow(10, 6); break;
                    case "Billion" : amount = Math.pow(10, 9); break;
                    default:
                }
            }
            var type;
            switch (obj.list.spaces[i].charAt(0)) {
                case "E" : type = "points"; break;
                case "U" : type = "unlocked"; break;
                case "C" : type = "clicks"; break;
                case "H" : type = 'interest'; break;
                default:
            }
            if (parseFloat(get(type)) >= parseFloat(amount) && get(obj.list.id[i]) != "true") {
                achievements.achieve(obj.list.id[i]);
            }
            // alert(type + ";" + amount);   
        }
    }
}

for (i = 0; i < achievements.list.spaces.length; i++) {
    var string = poof(achievements.list.spaces[i], "'"); string = poof(string, ","); string = poof(string, " ");
    achievements.list.id.push(string);
}
var text = id("AchievementsList");
for (i = 0; i < achievements.list.spaces.length; i++) {
    text.innerHTML = text.innerHTML + "<div class='achieveItem' id='" + achievements.list.id[i] + "''>" + achievements.list.spaces[i] + "</div>";
}

/*==================
	Refreshing
==================*/

var refresh = {
    numbers : function() {
            if (get('points') >= Math.pow(10, 307)) { set('points', format.eg(Math.pow(10, 308))); id('Points').innerHTML = "Points: Infinity"; } 
            else { id('Points').innerHTML = 'Points: ' + format.giant(get('points')); }

            if (get('interest') >= Math.pow(10, 307)) { set('interest', format.eg(Math.pow(10, 308))); id('Interest').innerHTML = "Interest: Infinity"; } 
            else { id('Interest').innerHTML = 'Interest: ' + format.giant(get('interest')); }

            if (get('deposited') >= Math.pow(10, 307)) { set('deposited', format.eg(Math.pow(10, 308))); id('Deposited').innerHTML = "Deposited: Infinity"; } 
            else { id('Deposited').innerHTML = 'Deposited: ' + format.giant(get('deposited')); }
    },
    B : function() {
        b.refresh();
    },
    achievements : function() {
        var group = id("achivementsGroup");
        var text = id("AchievementsList");
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var item = id(achievements.list.id[i]);
            if (get(achievements.list.id[i]) == "true") {
                item.style.background = "#0F0";
            }
        }
    },
    settings : function() {
        if (get("spinAnim") == undefined) set("spinAnim", false);
        if (get("spinAnim") == 'true') id("bButton").className = 'button bButtonSpin';
        if (get("spinAnim") == 'false') id("bButton").className = 'button';
        id("btnSpinAnim").innerHTML = "Spinning B: " + get("spinAnim");
    },
    events : function() {
        if (!isMobile.any()) {
            var all = document.querySelectorAll('[ontouchend]');
            for (i = 0; i < all.length; i++) {
                var ontouchend = all[i].getAttribute('ontouchend');
                all[i].setAttribute('onclick', ontouchend, false);
            }
        }
    },
    all : function() {
        refresh.numbers(); refresh.B(); refresh.achievements(); refresh.settings(); refresh.events();; 
        window.requestAnimationFrame(refresh.all);
    }
}; 

/*=============
    Saves
=============*/

var data = {
    reset : {
        soft : function() {
            set('points', 0);
            set('interest', 0);
            set('deposited', 0);
            
            set('clicks', 0);
            set('unlocked', 0);

            for (i = 0; i < b.list.list.length; i++) {
                var item = b.list.list[i];
                localStorage.setItem(item, false);
            }

            localStorage.played325 = true;
            location.reload();
        },
        hard : function() {
            for (i = 0; i < achievements.list.id.length; i++) {
                localStorage.removeItem(achievements.list.id[i]);
            }
            set('multiplier', 1);
            data.reset.soft();
        }
    },
    load : function() {
        if (get("played325") == undefined) {
            data.reset.hard();
        }
    }
}

function ConfirmHR() {
    if (ask("Reset Everything?") == true) data.reset.hard();
}

function ConfirmSR() {
  if (ask("Reset Progress but not Achievements?") == true) data.reset.soft();
}

/*==============
	Winning
==============*/

function ChangeUsername() {
    set('username', id("UsernameInput").value);
    msg("Username Changed!", "Your username has been changed to " + get('username') + ".");
}

function SubmitScore() {  
     if (ask("Win with the username " + get("username") + "?") == true) {
       web("https://playbclick.com/pages/win/win.php?username=" + get("username") + "&points=" + toFixed(get('points')));
        data.reset.soft();
        msg("Submitting Score Successful!", "As a result, bClick has started a new game. Good job!");
    }
}

function SeeWinners() {
    web("https://playbclick.com/pages/win/leaderboards.php");
}

id("UsernameInput").value = get("username");

$(document).ready(function(){
    $('#UsernameInput').keypress(function(e){
      if(e.keyCode == 13)
      $('#btnChangeUsername').click();
    });
});

/*=========
    B's
=========*/

set("bPosition", 0);

var b = {
    vars : {
        button : function() { return id("bButton") },
        unlock : function() { return id("bUnlock") },
        section : function() { return id("bSection") },
        unlocked : function() { return id("bUnlocked") }
    },
    list : {
        b : {
            lowercase : { worth : 1, cost : 0, color : "#FFF" },
            regular : { worth : 10, cost : 50, color : "#999" },
            saw : { worth : 100, cost : 300, color : "#F00" },
            spiky : { worth : 500, cost : 5000, color : "#FF0080" },
            electric : { worth : 1000, cost : 10000, color : "#FFA500" },
            thin : { worth : 5000, cost : 25000, color : "#FF0" },
            curved : { worth : 10000, cost : 100000, color : "#0F0" },
            shark : { worth : 25000, cost : 500000, color : "#060" },
            fancy : { worth : 50000, cost : 1000000, color : "#6CF" },
            lightning : { worth : 100000, cost : 5000000, color : "#06C" },
            awesome : { worth : 1000000, cost : 50000000, color : "#909" },
            golden : { worth : 10000000, cost : 100000000, color : "#FFD700" },
            handrawn : { worth : Math.pow(10, 9), cost : Math.pow(10, 9), color : "#000" },
            pattern : { worth : Math.pow(10, 12), cost : Math.pow(10, 12), color : " patternB" },
            gradient : { worth : Math.pow(10, 15), cost : Math.pow(10, 15), color : " gradientB" },
            disco : { worth : Math.pow(10, 18), cost : Math.pow(10, 18), color : " discoB" }
        },        
        list : [
            "lowercase", "regular", 
            "saw", "spiky", 
            "electric", "thin", 
            "curved", "shark", 
            "fancy", "lightning", 
            "awesome", "golden", 
            "handrawn", "pattern", 
            "gradient", "disco"
        ]
    },
    refresh : function() {
        b.vars.button().setAttribute("ontouchend", "ClickB('" + b.list.list[get("bPosition")] + "', " + b.list.b[b.list.list[get("bPosition")]]['worth'] + ")", false);
        b.vars.unlock().setAttribute("ontouchend", "UnlockB('" + b.list.list[get("bPosition")] + "', " + b.list.b[b.list.list[get("bPosition")]]["cost"] + ")", false);
        b.vars.button().style.backgroundImage = "url('https://playbclick.com/assets/b/325/" + b.list.list[get("bPosition")] + ".png')";
        b.vars.unlock().innerHTML = "Unlock B For " + format.giant(b.list.b[b.list.list[get("bPosition")]]["cost"]) + " Points";
        b.vars.unlocked().innerHTML = "Unlocked: " + get(b.list.list[get("bPosition")]);
        var color = b.list.b[b.list.list[get("bPosition")]]["color"];
        if (color.toString().charAt(0) != " ") {
            b.vars.section().style.backgroundColor = color;
            b.vars.section().className = "section";
        } else {
            // b.vars.section.background = "";
            b.vars.section().className = "section " + color;
        }
        
    },
    loop : {
        next : function() {
            if (get("bPosition") == 15){
                set("bPosition", 0);
            }
            else {
                set("bPosition", add(get("bPosition"), 1));
            }
            b.refresh();
        },
        previous : function() {
            if (get("bPosition") == 0){
                set("bPosition", 15);
            }
            else {
                set("bPosition", subtract(get("bPosition"), 1));
            }
            b.refresh();
        }
    }
}

/*===========
    Bank
===========*/

var bank = {
    collect : function() {
        Earn(get('interest'));
    },
    deposit : function(amount) {
        amount = parseFloat(amount);
        if (get('points') >= amount) {
            set('deposited', add(get('deposited'), amount));
            set('interest', parseFloat(get("deposited")) * 0.1);
            Purchase(amount); 
        }
        else { msg("Insufficient Points!", "Earn more points to do this task."); } },
    withdraw : function(amount) {
        amount = parseFloat(amount);
        set('deposited', subtract(get('deposited'), amount));
        set('interest', parseFloat(get('deposited')) * 0.1);
        Earn(amount); 
    }
}

$(document).ready(function(){
    $('#Deposit').keypress(function(e){
      if(e.keyCode == 13)
      $('#btnDeposit').click();
    });
});

/*==============
    Settings
==============*/

var settings = {
    toggle : {
        spin : function() {
            set('spinAnim', toggle(get('spinAnim'), 'true', 'false'));
        }
    }
};

/*============
    Other
============*/

function bColorChange() {
    id("bButton").style.backgroundColor = (id("bButton").style.backgroundColor != "#DDD" ? "#AAA" : "#DDD");
}

function Minimize(list, button) {
    id(list).style.display = (id(list).style.display != 'none' ? 'none' : '' );
    id(button).innerText = (id(button).innerText != '+' ? '+' : '-' );
}

// id('bButton').style.height = id('bButton').style.width;
data.load();
refresh.all();
setInterval(bank.collect, 1000);

if (isMobile.iOS() || isMobile.Android()) {
    if(window.navigator.standalone == false){
        msg("Mobile Device Detected!", "You Can Add This To Your Homescreen For Better Functionality.");
    }
}