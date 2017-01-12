
/*===========================================
	bClick - The Addicting b-Click-ing Game	
=============================================
	  Copyright Cameron Samuels 2012-2016
=============================================
	This code includes:
		-My own created code
		-Code from Stack overflow (not mine)
    -Code from W3Schools
    -Code from MDN
		-Code from random sites
		-Code from Cookie Clicker
		-And ideas from friends and family
===========================================*/


/*==============
	Variables
==============*/

var sounds = {
    click : new Audio('https://playbclick.com/assets/wav/click.wav'),
    unlock : new Audio('https://playbclick.com/assets/wav/unlock.wav'),
    restart : new Audio('https://playbclick.com/assets/wav/restart.wav')
}

var d = new Date();

/*=====================
	Helper Functions
=====================*/

function web(url) { window.location = url; }

function id(id) { return document.getElementById(id); }

function get(what) { return localStorage[what]; }

function set(what, value) { localStorage.setItem(what, value); }


function poof(string, what) {
    var reg = new RegExp(what, 'g');
    return string.replace(reg, '');
}

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS() || isMobile.Windows()); }
};

function stats(name, value) { id("statsFrame").src = "https://playbclick.com/stats/core.php?name=" + name + "&value=" + value; }

/*============
    Numbers
============*/

var logOn = "false";

function log(text) {
    if (logOn == "true") {
        setTimeout(function(){log(text)}, 1500);
        return;
    }
    id("logText").innerHTML = text;
    id("logText").style.display = "inline-block";
    logOn = "true";
    setTimeout('id("logText").style.display = "none"; logOn = "false"', 1500);
}

/*====================
	Core Functions
====================*/

function Earn(amount) {
	if (get("points") < Math.pow(10, 308)) { set('points', m.add(get("points"), amount)); } 
	else { set('points', format.eg(Math.pow(10, 308))); }
	achievements.check();
}
 
function Purchase(amount) { set('points', m.sub(get('points'), amount)); }

function ClickB(name, worth) {
	name = name;
    if (get(name) == 'true') {
        if (get('clicks') === undefined) { set('clicks', 0); }
        else { set('clicks', m.add(get('clicks'), 1)); }
        Earn(parseFloat(worth) * get("multiplier"));
        sounds.click.play();
        stats('clicks', '1');
    }
    else { log("Unlock the B first!"); }
}

function UnlockB(name, cost) {
    if (get(name) == 'false') {  
        if (get("points") >= cost) {
            set(name, true);
            log("Unlocked B!");
            if (get("unlocked") === undefined) { set("unlocked", 1); }
            else { set('unlocked', m.add(get("unlocked"), 1)); } 
            Purchase(cost);
            theLog('Unlock B: ' + name);
            sounds.unlock.play();  
            stats('unlocks', '1');
        }
        else { log("Insufficient Points!") }
    }
    else { 
        if (!isMobile.any()) {
            FB.ui({
              method: 'share',
              display: 'popup',
              href: 'https://playbclick.com',
              hashtag: '#bClick',
              quote: 'I just unlocked the ' + name + ' B in the game bClick. Hurray!'
            }, function(response){ 
                if (response && !response.error_code) {
                    Earn(get("points") * 0.2);
                    log("Earned " + m.giant(Math.round(get("points") * 0.2)) + " points");
                    theLog('Shared to Facebook: ' + name);
                }
            });
        } else log("Click the B, not the unlock button!");
    }
}

function theLog(text) {
    if (get("theLog") == undefined) {
        set('theLog', '');
        theLog(text);
    } else {
        set('theLog', poof(get("theLog"), '<strong>'));
        set('theLog', poof(get("theLog"), '</strong>'));
        set('theLog', '<li><strong>' + text + '</strong></li>' + get("theLog"));
        id('theLog').innerHTML = '<ul>' + get("theLog") + '</ul>';
    }
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
            "Earn 1 Trillion Points",
            "Earn 1 Quadrillion Points",
            "Unlock 3 B's",
            "Unlock 5 B's",
            "Unlock 10 B's",
            "Unlock 16 B's",
            "Unlock 21 B's",
            "Click 50 Times",
            "Click 500 Times",
            "Click 1,500  Times",
            "Click 2,500  Times",
            "Click 5,000  Times",
            "Have 1 Thousand Interest",
            "Have 1 Million Interest",
            "Have 1 Billion Interest",
            "Have 1 Trillion Interest",
            "Have 1 Quadrillion Interest",
            "Play 1 Hour",
            "Play 3 Hours",
            "Play 5 Hours",
            "Play 10 Hours",
            "Play 1 Day",
            "Get 1 Thousand Multiplier",
            "Get 1 Million Multiplier",
            "Get 1 Billion Multiplier",
            "Get 1 Trillion Multiplier",
            "Get 1 Quadrillion Multiplier",
            "Maintain 2 Day Streak",
            "Maintain 3 Day Streak",
            "Maintain 5 Day Streak",
            "Maintain 1 Week Streak",
            "Maintain 1 Month Streak"
        ],
        id : [],
        type : ['Earn Points', 'Unlock B\'s', 'Click B\'s', 'Have Interest', 'Play For Hours', 'Get Multiplier', 'Maintain streaks']
    },
    achieve : function(id) {
        set(id, true);
        set('multiplier', parseFloat(get('multiplier')) * 2);
		log("Achievement Earned!");
		log("Multiplier is now " + m.giant(Math.round(get("multiplier"))));
		theLog('Earned an achievement: ' + achievements.list.spaces[achievements.list.id.indexOf(id)]);
        stats('achievements', '1');
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
                    case "Trillion" : amount = Math.pow(10, 12); break;
                    case "Quadrillion" : amount = Math.pow(10, 15); break;
                    case "Day" : amount = 86400; break;
                    case "Hour" : amount = 3600; break;
                    case "Week" : amount = 7; break;
                    case "Month" : amount = 30; break;
                    default:
                }
            }
            var type = "";
            switch (obj.list.spaces[i].charAt(0)) {
                case "E" : type = "points"; break;
                case "U" : type = "unlocked"; break;
                case "C" : type = "clicks"; break;
                case "H" : type = "interest"; break;
                case "P" : type = "timePlayed"; break;
                case "G" : type = "multiplier"; break;
                case "M" : type = "daysInARow"; break;
                default:
            }
            if (type == "timePlayed" && amount < 3600) {
                amount *= 3600;
            }
            if (parseFloat(get(type)) >= parseFloat(amount) && get(obj.list.id[i]) != "true") {
                achievements.achieve(obj.list.id[i]);
            }  
        }
    }
}

for (i = 0; i < achievements.list.spaces.length; i++) {
    var string = poof(achievements.list.spaces[i], "'"); string = poof(string, ","); string = poof(string, " ");
    achievements.list.id.push(string);
}
var text = id("AchievementsList");
var type = "";
var typeNum = -1;
for (i = 0; i < achievements.list.spaces.length; i++) {
    var amount = achievements.list.spaces[i].toString().replace(',', '').split(' ')[1];
    if (amount == 1) {
        amount += achievements.list.spaces[i].toString().replace(',', '').split(' ')[2].charAt(0);
    }
    if (type.toString().charAt(0) == achievements.list.id[i].charAt(0)) {
        text.innerHTML += "<div class='achieveItem' id='" + achievements.list.id[i] + "'>" + amount + "</div>";
    } else {
        typeNum++;
        type = achievements.list.type[typeNum];
        text.innerHTML += "<div class='achieveCategory'>" + type + "</div><div class='achieveItem' id='" + achievements.list.id[i] + "'>" + amount + "</div>";
    }
}

/*==================
	Refreshing
==================*/

var refresh = {
    numbers : function() {
            if (get('points') >= Math.pow(10, 306)) { set('points', format.eg(Math.pow(10, 307))); id('Points').innerHTML = "Points: Infinity"; try { parent.document.title = "Infinity Points - bClick"; } catch (ex) {}}
            else { id('Points').innerHTML = 'Points: ' + m.giant(get('points')); try { parent.document.title = m.giant(get('points')) + " Points - bClick";} catch (ex) {}}

            if (get('interest') >= Math.pow(10, 307)) { set('interest', format.eg(Math.pow(10, 308))); id('Interest').innerHTML = "Interest: Infinity"; } 
            else { id('Interest').innerHTML = 'Interest: ' + m.giant(get('interest')); }
    },
    achievements : function() {
        achievements.check();
        var group = id("achivementsGroup");
        var text = id("AchievementsList");
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var item = id(achievements.list.id[i]);
            if (get(achievements.list.id[i]) == "true") item.style.background = "#0F0";
        }
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
        refresh.numbers(); b.refresh(); refresh.achievements(); refresh.events(); 
        window.requestAnimationFrame(refresh.all);
    }
}; 

/*=============
    Saves
=============*/

var data = {
    reset : {
        soft : function() {
            sounds.restart.play();
            set('points', 0);
            set('interest', 0);
            set('deposited', 0);
            
            set('clicks', 0);
            set('unlocked', 0);
            set('timePlayed', 0);

            for (i = 0; i < b.list.list.length; i++) {
                var item = b.list.list[i];
                set(item, false);
            }

            set('played333', true);
            theLog('New Game Started');
            setTimeout('location.reload()', 2000);
        },
        hard : function() {
            for (i = 0; i < achievements.list.id.length; i++) { localStorage.removeItem(achievements.list.id[i]) };
            if (get("multiplier") !== undefined && get("multiplier") !== 'NaN') set('multiplier', (get("multiplier") * 0.05)); 
			else set('multiplier', 1);
			data.reset.soft();
        },
        update : function() {set('timePlayed', 0);},
        reset : function() { if (m.ask("Reset Everything?") === true) data.reset.hard(); }
    },
    load : function() {
        if (get("points") === undefined) data.reset.hard();
        else if (get("played336") != undefined) data.reset.update();  
        else if (get("lastPlay") !== undefined) {
            set('points', m.add(get('points'), ((get('interest') * 0.05) * m.ts(get('lastPlay')))));
            log('Earned ' + m.giant(((get('interest') * 0.05) * m.ts(get('lastPlay')))) + ' points offline');
        }
		if (get("lastPlayDay") !== undefined && get("lastPlayDay") != d.getDate()) {
			if (get("daysInARow") === undefined) set('daysInARow', 1);
			else if (get("lastPlayDay") == d.getDate() - 1) set("daysInARow", m.add(get("daysInARow"), 1));
			else if (get("lastPlayDay") == d.getDate() + 1) { 
			    set("daysInARow", 1);
				log("CHEATER!!!!!!!");
				theLog('Became a cheater');
			    setTimeout('data.reset.hard()', 1500);
			}
			else if (get("lastPlayDay") !== undefined) set("daysInARow", 1);
			Earn(get("points") * get("daysInARow"));
			log('Earned ' + get("daysInARow") + ' daily gift(s)');
			theLog('Earned ' + get("daysInARow") + ' daily gift(s)');
		}
		if (get("theLog") != undefined) id('theLog').innerHTML = '<ul>' + get("theLog") + '</ul>';
		setInterval('SubmitScore();id("FirstPlaceIframe").src = "https://playbclick.com/pages/win/first.php";', 30000);
        setInterval("stats('visits', '1')", 60000);
        refresh.all();
        setInterval(bank.collect, 1000);
        if (window.location.hash == "#debug") {
            id('body').innerHTML += '<div id="debug" style="width: 225px;position: fixed;right: 10px; bottom: 10px;padding 10px"><input id="debugCode" style="width: 225px;"/><button style="padding: 1px;width: 225px" ontouchend="eval(document.getElementById(\'debugCode\').value);">Run Code</button></div>';
        }
    }
}

/*================
	Submitting
================*/

function ChangeUsername() {
    set('username', m.qstn('Enter your new username'));
    if (get("username") === undefined || get("username") == null || get("username") === '') set('username', m.qstn('Error! Enter a username'));
    else if (get("username") != null) { log('Changed Username to ' + get('username')); theLog('Changed Username: ' + get("username")) };
}

function SubmitScore() {  
    if (get("username") === undefined) ChangeUsername();
    else {
        if (get("username") !== undefined && get("username") != null && get("username") !== '')
			id('winFrame').setAttribute('src', "https://playbclick.com/pages/win/win.php?username=" + get("username") + "&points=" + m.dcml(get('points')));
        else ChangeUsername();
    }
}

function SeeWinners() { web("https://playbclick.com/pages/win/leaderboards.php") }

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
            handrawn : { worth : 1, cost : 0, color : "#FFF" },
            lowercase : { worth : 10, cost : 50, color : "#999" },
            regular : { worth : 100, cost : 1000, color : "#333" },
            saw : { worth : 250, cost : 10000, color : "#F00" },
            spiky : { worth : 500, cost : 25000, color : "#FF0080" },
            electric : { worth : 1000, cost : 100000, color : "#FFA500" },
            thin : { worth : 2500, cost : 500000, color : "#FF0" },
            curved : { worth : 5000, cost : 2500000, color : "#0F0" },
            shark : { worth : 10000, cost : 10000000, color : "#060" },
            fancy : { worth : 25000, cost : 50000000, color : "#6CF" },
            lightning : { worth : 100000, cost : 250000000, color : "#06C" },
            awesome : { worth : 1000000, cost : 1000000000, color : "#909" },
            golden : { worth : Math.pow(10, 9), cost : Math.pow(10, 12), color : "#FFD700" },
            pattern : { worth : Math.pow(10, 11), cost : Math.pow(10, 15), color : " patternB" },
            gradient : { worth : Math.pow(10, 13), cost : Math.pow(10, 18), color : " gradientB" },
            disco : { worth : Math.pow(10, 15), cost : Math.pow(10, 21), color : " discoB" },
            knight : { worth : Math.pow(10, 18), cost : Math.pow(10, 24), color : "#614126" },
            archer : { worth : Math.pow(10, 21), cost : Math.pow(10, 27), color : "#005900" },
            barbed : { worth : Math.pow(10, 24), cost : Math.pow(10, 30), color : "#191919" },
            flower : { worth : Math.pow(10, 27), cost : Math.pow(10, 33), color : "#b266b2" },
            business : { worth : Math.pow(10, 30), cost : Math.pow(10, 36), color : "#0000FF" }
        },        
        list : [
            "handrawn", 
            "lowercase", "regular", 
            "saw", "spiky", 
            "electric", "thin", 
            "curved", "shark", 
            "fancy", "lightning", 
            "awesome", "golden", 
            "pattern", "gradient", 
            "disco", "knight",
            "archer", "barbed",
            "flower", "business"
        ]
    },
    refresh : function() {
        b.vars.button().setAttribute("ontouchend", "ClickB('" + b.list.list[get("bPosition")] + "', " + b.list.b[b.list.list[get("bPosition")]].worth + ")");
        b.vars.button().setAttribute("title", b.list.list[get("bPosition")].toString().toUpperCase() + ' B');
        b.vars.unlock().setAttribute("ontouchend", "UnlockB('" + b.list.list[get("bPosition")] + "', " + b.list.b[b.list.list[get("bPosition")]].cost + ")");
        b.vars.button().style.backgroundImage = "url('https://playbclick.com/assets/b/325/" + b.list.list[get("bPosition")] + ".png')";
        if (get(b.list.list[get("bPosition")]) == 'false') b.vars.unlock().innerHTML = "Unlock<br />(" + m.giant(b.list.b[b.list.list[get("bPosition")]].cost) + ")";
		else {
            b.vars.unlock().innerHTML = "Unlocked!";
        }
        var color = b.list.b[b.list.list[get("bPosition")]].color;
        if (color.toString().charAt(0) != " ") {
            b.vars.section().style.backgroundColor = color;
            b.vars.section().className = "section";
        } else {
            b.vars.section().className = "section " + color;
        }
        
    },
    loop : {
        next : function() {
            if (get("bPosition") == 20) set("bPosition", 0);
            else set("bPosition", m.add(get("bPosition"), 1));
            b.refresh();
        },
        previous : function() {
            if (get("bPosition") == 0) set("bPosition", 20);
            else set("bPosition", m.sub(get("bPosition"), 1));
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
        d = new Date();
        set('lastPlay', d.getTime());
        set('lastPlayDay', d.getDate());
        localStorage.timePlayed++;
    },
    deposit : function(amount) {
        amount = parseFloat(amount);
        if (get('points') >= amount) {
            set('deposited', m.add(get('deposited'), amount));
            set('interest', parseFloat(get("deposited")) * 0.1);
            Purchase(amount); 
        }
        else log("Insufficient Points!"); }
}

/*==============
    Controls
==============*/

var keyPressed = false;

id('body').onkeydown = function (e) {
    if (keyPressed === false) {
      switch (e.keyCode) {
            case 37: b.loop.previous(); break;
            case 39: b.loop.next(); break;
            case 32: ClickB(b.list.list[get("bPosition")], b.list.b[b.list.list[get("bPosition")]].worth); break;
            case 68: bank.deposit(get("points")); break;
            case 83: 
                if (!isMobile.any()) {
                    FB.ui({
                      method: 'share',
                      display: 'popup',
                      href: 'https://playbclick.com',
                      hashtag: '#bClick',
                      quote: 'I am playing the game called bClick! It\'s so fun!'
                    }, function(response){ 
                        if (response && !response.error_code) {
                            Earn(get("points") * 0.2);
                            log("Earned " + m.giant(Math.round(get("points") * 0.2)) + " points");
                        }
                    });
                }
                break;
            default:
        }
        keyPressed = true;
    }
};

id('body').onkeyup = function (e) { keyPressed = false; };

/*============
    Other
============*/

if (isMobile.any()) { id("fbLogin").style.display = "none"; }

function Minimize(list, button) {
    id(list).style.display = (id(list).style.display != 'none' ? 'none' : '' );
    id(button).innerText = (id(button).innerText != '+' ? '+' : '-' );
}

if (window.location.protocol != "https:") window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

data.load();