/*===========================================
bClick - The b-Click-ing Game	
Copyright Cameron Samuels 2013-2017
=============================================
This code includes a small amount of code that is not mine
Some code is from StackOverflow, W3Schools and other websites
===========================================*/

// ===== Variables ===== //

var sounds = {
    click : new Audio('https://playbclick.com/assets/wav/click.wav'),
    unlock : new Audio('https://playbclick.com/assets/wav/unlock.wav'),
    restart : new Audio('https://playbclick.com/assets/wav/restart.wav'),
    deposit : new Audio('https://playbclick.com/assets/wav/deposit.wav')
}

// ===== Helper Functions ===== //

function web(url) { window.location = url; }
function id(id) { return document.getElementById(id); }
function get(what) { return localStorage[what]; }
function set(what, value) { localStorage.setItem(what, value); }

function remove(string, what) {
    var reg = new RegExp(what, 'g');
    return string.replace(reg, '');
}

function random() {
    var randomness= '';
    for (i = 0; i < Math.ceil(Math.random() * 5); i++) {
        randomness += Math.ceil(Math.random() * Math.random() * 10).toString().charAt(0);
    }
    var times = (5 - randomness.length);
    for (i = 0; i < times; i++) {
        randomness = '0' + randomness;
    }
    randomness = '1' + randomness;
    return randomness;
}

function neatTime(seconds) {
    var d = Math.floor((seconds % 31536000) / 86400); 
    var h = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var m = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var s = Math.floor(((seconds % 31536000) % 86400) % 3600) % 60;
    time = "";
    if (d >= 1) { time = d + ' day(s) ' }
	if (h >= 1) { time += h + ' hour(s) ' }
	if (m >= 1) { time += m + ' min(s) ' }
	time += s + ' sec(s)';
	return time;
}

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS()); }
};

// ===== Core Functions ===== //

function stats(name, value) { id("statsFrame").src = "https://playbclick.com/assets/php/stats.php?name=" + name + "&value=" + value; }

function log(text) {
    if (id("logText").style.display == "inline-block") {
        setTimeout(function(){log(text)}, 1500);
        return;
    }
    id("logText").innerHTML = text;
    id("logText").style.display = "inline-block";
    setTimeout('id("logText").style.display = "none"', 1500);
}

var increment;
var ceiling = get("points");
var left = 0;
function realEarn() {
    if (get("points") < ceiling) {
	  set('points', parseFloat(get("points")) + parseFloat(increment));
	  left = parseFloat(ceiling) - parseFloat(get("points"));
    } 
    else if (get("points") > ceiling) {
	  set('points', parseFloat(get("points")) - parseFloat(increment));
	  left = parseFloat(get("points")) - parseFloat(ceiling);
    }
    else { left = 0; }
	if (left <= 0) {
	    left = get('points');
	    ceiling = left;
	    increment = 0;
	}
}

function Earn(amount) {
    if (get("points") < Math.pow(10, 308)) {
        ceiling = parseFloat(ceiling) + parseFloat(amount);
        increment += (parseFloat(amount) / 100); 
    }
    else { set('points', m.eg(Math.pow(10, 308))); }
	achievements.check();
}
 
function Purchase(amount) { 
    if (get("points") < Math.pow(10, 308)) {
        increment += (parseFloat(amount) / 100);
        ceiling = parseFloat(ceiling) - parseFloat(amount);
    }
    else { set('points', m.eg(Math.pow(10, 308))); }
}

function ClickB() {
	name = b.list.list[get("bPosition")];
	worth = b.list.b[b.list.list[get("bPosition")]].worth;
    if (get(name) == 'true') {
        if (get('clicks') === undefined) { set('clicks', 0); }
        else { set('clicks', m.add(get('clicks'), 1)); }
        Earn(parseFloat(worth) * get("multiplier"));
        sounds.click.play();
        stats('clicks', 1);
    }
    else { log("Unlock the B first!"); }
}

function UnlockB() {
    name = b.list.list[get("bPosition")];
	cost = b.list.b[b.list.list[get("bPosition")]].cost;
    if (get(name) == 'false') {  
        if (get("points") >= cost) {
            set(name, true);
            log("Unlocked B!");
            if (get("unlocked") === undefined) { set("unlocked", 1); }
            else { set('unlocked', m.add(get("unlocked"), 1)); } 
            Purchase(cost);
            theLog('Unlock B: ' + name);
            sounds.unlock.play();  
            stats('unlocks', 1);
        }
        else { log("Insufficient Points!") }
    }
    else log("Click the B, not the unlock button!");
}

function theLog(text) {
    if (get("theLog") == undefined) {
        set('theLog', '');
        theLog(text);
    } else if (get("theLog").length >= 1000) {
        set('theLog', '<li><strong>' + text + '</strong></li>');
    } else {
        set('theLog', remove(get("theLog"), '<strong>'));
        set('theLog', remove(get("theLog"), '</strong>'));
        set('theLog', '<li><strong>' + text + '</strong></li>' + get("theLog"));
        id('theLog').innerHTML = '<ul>' + get("theLog") + '</ul>';
    }
}

function playTutorial() {
    introJs().start();
    set('playedTutorial', 'true');
}

// ===== Achievements ===== //

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
        stats('achievements', 1);
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
    var string = remove(achievements.list.spaces[i], "'"); string = remove(string, ","); string = remove(string, " ");
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

// ===== Refreshing ===== //

var refresh = {
    numbers : function() {
        if (get('points') >= Math.pow(10, 306)) { set('points', m.eg(Math.pow(10, 307))); id('Points').innerHTML = "Points: Infinity"; if (id('main').getAttribute('class') != "flicker") data.reset.over(); try { parent.document.title = "Infinity Points - bClick"; } catch (ex) {}}
        else { id('Points').innerHTML = 'Points: ' + m.giant(get('points')); try { parent.document.title = m.giant(get('points')) + " Points - bClick";} catch (ex) {}}

        if (get('interest') >= Math.pow(10, 307)) { set('interest', m.eg(Math.pow(10, 308))); id('Interest').innerHTML = "Interest: Infinity"; } 
        else { id('Interest').innerHTML = 'Interest: ' + m.giant(get('interest')); }
        
        refresh.marquee('Points', 'pointsDiv');
        refresh.marquee('Interest', 'interestDiv');

    },
    marquee : function(ele, div) {
        var mode;
        if (id(ele).innerHTML.toString().length < 22) {  mode = "<div id='" + ele + "'></div>" }
        else { mode = "<marquee><div id='" + ele + "'></div></marquee>"; }  
        if (id(div).innerHTML.toString().includes("<marquee>") && !mode.includes("<marquee>")) {
            id(div).innerHTML = mode;
        } else if (!id(div).innerHTML.toString().includes("<marquee>") && mode.includes("<marquee>")) {
            id(div).innerHTML = mode;
        }  
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
                all[i].setAttribute('onclick', ontouchend);
            }
        }
    },
    all : function() {
        refresh.numbers(); b.refresh(); refresh.achievements(); refresh.events();
        window.requestAnimationFrame(refresh.all);
    }
}; 

// ===== Saving Data ===== //

var data = {
    reset : {
        soft : function() {
            sounds.restart.play();
            set('points', 0);
            set('interest', 0);
            set('deposited', 0);
            increment = 0;
            ceiling = 0;
            set('clicks', 0);
            set('unlocked', 0);
            set('timePlayed', 0);

            for (i = 0; i < b.list.list.length; i++) {
                var item = b.list.list[i];
                set(item, false);
            }

            set('played341-925216', true);
            theLog('New Game Started');

            changeInfo();
        },
        hard : function() {
            for (i = 0; i < achievements.list.id.length; i++) { localStorage.removeItem(achievements.list.id[i]) };
            if (get("multiplier") !== undefined && get("multiplier") !== 'NaN' && get("multiplier") >= 20) set('multiplier', (get("multiplier") * 0.05)); 
			else set('multiplier', 1);
			data.reset.soft();
        },
        update : function() { set('played341-925216', true) },
        reset : function() { if (m.ask("Reset Everything?") === true) data.reset.hard(); },
        over : function() { SubmitScore(); id('body').style.background = "#FF0000"; id('main').setAttribute('class', 'flicker'); set('username', get("username") + "+"); theLog('Reached the end of the world!'); theLog('Multiplier Multiplied By 2!'); set('multiplier', m.add(get('multiplier'), get("multiplier"))); log('G@Me oV3R!1!!1'); setTimeout('data.reset.hard()', 5000);}
    },
    load : function() {
        if (get("points") === undefined) data.reset.hard();
        // else if (get("played341-925216") == undefined) data.reset.update();  
        else if (get("lastPlay") !== undefined) {
            var earned = Math.min(get('points'), ((get('interest') * 0.05) * m.ts(get('lastPlay'))));
            set('points', m.add(get("points"), earned));
            log('Earned ' + m.giant(earned) + ' points offline');
        }
		if (get("lastPlayDay") !== undefined && get("lastPlayDay") != new Date().getDate()) {
			if (get("daysInARow") === undefined) set('daysInARow', 1);
			else if (get("lastPlayDay") == new Date().getDate() - 1) set("daysInARow", m.add(get("daysInARow"), 1));
			else if (get("lastPlayDay") > new Date().getDate() && !(get("lastPlayDay") == 31 || get("lastPlayDay") == 30 || get("lastPlayDay") == 29 || get("lastPlayDay") == 28)) { 
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
		setInterval('SubmitScore()', 30000);
        setInterval("stats('visits', 1)", 60000);
        refresh.all();
        ceiling = get("points");
        setInterval('realEarn()', 1);
        setInterval('ceiling = get("points");bank.collect();depositSpamBlocker()', 1000);
        if (!get("username")) set('username', 'bClicker' + random());
        seasons.load();
        id("main").style.display = "block";
        id('loader').style.display = "none";
        if (isMobile.any() && !window.matchMedia('(display-mode: standalone)').matches) {
            id('mobileBrowser').style.display = "block";
            id('main').style.display = "none";
        } else if (get("playedTutorial") == undefined) playTutorial();
    }
}

// ===== Submission ===== //

function changeInfo() {
    var f = document.getElementById('infoChange');
    f.username.value = get('username') || "";
    f.email.value = get('email') || "";
    f.name.value = get('name') || "";
    id('infoPopup').style.display = "block";
    id('infoOverlay').style.display = "block";
}

function submitScore() {
    if (get("points") != 0)
       id('winFrame').setAttribute('src', "https://playbclick.com/assets/php/submit.php?username=" + get("username") + "&points=" + Math.round(m.dcml(get('points'))) + "&email=" + (get("email") || "")  + '&name=' + (get("name") || ""));
}

function submitForm() {
    var f = document.getElementById('infoChange');
    if (f.checkValidity()) {
        set('username', f.username.value || f.name.value);
        set('email', f.email.value);
        set('name', f.name.value);
        id('infoPopup').style.display = "none";
        id('infoOverlay').style.display = "none";
        log('Changed Username to ' + get('username'));
    }
    else if (!f.name.value) {
        f.name.style.border = "1px red solid";
        f.email.style.border = "1px #2a2a2a solid";
    }
    else if (!f.email.value || !f.email.value.includes('@') || !f.email.value.includes('.') || !f.email.value.includes(' ')) {
        f.email.style.border = "1px red solid";
        f.name.style.border = "1px #2a2a2a solid";
    }
}

function SeeWinners() { web("https://playbclick.com/assets/php/leaderboards.php") }

// ===== The B's ===== //

set("bPosition", 0);
set('bAmount', 0);

var b = {
    vars : {
        button : function() { return id("bButton") },
        unlock : function() { return id("bUnlock") },
        section : function() { return id("bSection") }
    },
    list : {
        list : [],
        b : {},
        soon : {
            list : [],
            b : {}
        }
    },
    refresh : function() {
        id('bName').innerHTML = b.list.list[get("bPosition")].toString().toUpperCase() + ' B ' + b.list.b[b.list.list[get("bPosition")]].tooltip;
        b.vars.button().style.backgroundImage = "url('https://playbclick.com/assets/b/" + b.list.list[get("bPosition")] + ".png')";
        if (get(b.list.list[get("bPosition")]) == 'false') b.vars.unlock().innerHTML = "Unlock<br />(" + m.giant(b.list.b[b.list.list[get("bPosition")]].cost) + ")";
		else {
            b.vars.unlock().innerHTML = "Unlocked!";
        }
        if (new Date().getHours() < 19) {
            var color = b.list.b[b.list.list[get("bPosition")]].color;
            if (color.toString().charAt(0) != " ") {
                b.vars.section().style.backgroundColor = color;
                b.vars.section().className = "section";
            } else {
                b.vars.section().className = "section " + color;
            }
        }
        for (i = 0; i < b.list.soon.list.length; i++) {
            if (b.list.soon.b[b.list.soon.list[i]].other.date <= new Date()) {
                location.reload();
            } else {
                id('comingSoonDate' + b.list.soon.list[i]).innerHTML = neatTime((b.list.soon.b[b.list.soon.list[i]].other.date - new Date()) / 1000);
            }
        }
    },
    loop : {
        next : function() {
            if (get("bPosition") == (get("bAmount") - 1)) set("bPosition", 0);
            else set("bPosition", m.add(get("bPosition"), 1));
            b.refresh();
        },
        previous : function() {
            if (get("bPosition") == 0) set("bPosition", (get("bAmount") - 1));
            else set("bPosition", m.sub(get("bPosition"), 1));
            b.refresh();
        }
    }
}

function create(name, worth, cost, color, other) {
    this.worth = worth;
    this.cost = cost;
    this.color = color;
    this.name = name;
    this.other = other;
    if (get(name) == undefined) { set(name, false); }
    if (other != undefined) {
        if (other.tooltip != undefined) { this.tooltip = other.tooltip; } else {this.tooltip = ''}
        if (get(name) == 'false') {
            if (other.date != undefined && other.date > new Date()) {
                this.date = other.date;
                b.list.soon.list.push(name);
                b.list.soon.b[name] = { name, worth, cost, color, other };
                id('comingSoonBList').innerHTML += '<div class="comingSoonB" id="comingSoon' + name + '">' + name + ' B</div><div class="comingSoonDate" id="comingSoonDate' + name + '">' + (other.date - new Date()) + '</div>';
                return;
            }
            if (other.onlydate != undefined && (other.onlydate.getDate() != new Date().getDate() || other.onlydate.getMonth() != new Date().getMonth() || other.onlydate.getFullYear() != new Date().getFullYear())) {
                this.onlydate = other.onlydate;
                this.other.date = other.onlydate;
                if (!(other.onlydate.getDate() < new Date().getDate())) {
                    b.list.soon.list.push(name);
                    b.list.soon.b[name] = { name, worth, cost, color, other };
                    id('comingSoonBList').innerHTML += '<div class="comingSoonB" id="comingSoon' + name + '">' + name + ' B</div><div class="comingSoonDate" id="comingSoonDate' + name + '">' + (other.onlydate - new Date()) + '</div>';
                }
                return;
            }
        }
    } else {this.tooltip = ''}
    b.list.list.push(name);
    set('bAmount', m.add(get('bAmount'), 1));
}
// ===== The Bank ===== //

var bank = {
    collect : function() {
        Earn(get('interest'));
        d = new Date();
        set('lastPlay', new Date().getTime());
        set('lastPlayDay', new Date().getDate());
        var timePlayed = get("timePlayed");
        set('timePlayed', timePlayed++);
        if (new Date().getHours() >= 19) id('body').setAttribute('class', 'night');
        else id('body').setAttribute('class', '');
    },
    deposit : function() {
        if (depositReady == 'true') {
            var amount = parseFloat(get('points'));
            set('deposited', m.add(get('deposited'), amount));
            set('interest', parseFloat(get("deposited")) * 0.1);
            Purchase(amount); 
            depositReady = 'false';
            sounds.deposit.play();
        } else {
            log("Don't spam the bank!");
        }
    }
}

var depositReady = 'false';
function depositSpamBlocker() { depositReady = 'true'; }

// ===== Controls ===== //

var keyPressed = false;

id('body').onkeydown = function (e) {
    if (keyPressed === false) {
      switch (e.keyCode) {
            case 37: b.loop.previous(); break;
            case 39: b.loop.next(); break;
            case 32: ClickB(); break;
            case 68: bank.deposit(); break;
            default:
        }
        keyPressed = true;
    }
};

id('body').onkeyup = function (e) { keyPressed = false; };

// ===== Miscellaneous ===== //

function Minimize(list, button) {
    id(list).style.display = (id(list).style.display != 'none' ? 'none' : '' );
    id(button).innerText = (id(button).innerText != '+' ? '+' : '-' );
}

if (window.location.protocol != "https:" && window.location.protocol != "file:") window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);