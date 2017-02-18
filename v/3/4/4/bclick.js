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
            "Earn 1 Quintillion Points",
            "Earn 1 Decillion Points",
            "Earn 1 Quindecillion Points",
            "Earn 1 Vigintillion Points",
            "Earn 1 Quinquavigintillion Points",
            "Unlock 10 B's",
            "Unlock 20 B's",
            "Unlock 30 B's",
            "Unlock 40 B's",
            "Unlock 50 B's",
            "Click 500 Times",
            "Click 1 Thousand Times",
            "Click 5 Thousand  Times",
            "Click 10 Thousand  Times",
            "Click 20 Thousand Times",
            "Have 1 Quintillion Interest",
            "Have 1 Decillion Interest",
            "Have 1 Quindecillion Interest",
            "Have 1 Vigintillion Interest",
            "Have 1 Quinquavigintillion Interest",
            "Play 3 Hours",
            "Play 6 Hours",
            "Play 12 Hours",
            "Play 24 Hours",
            "Play 2 Days",
            "Get 1 Quintillion Multiplier",
            "Get 1 Decillion Multiplier",
            "Get 1 Quindecillion Multiplier",
            "Get 1 Vigintillion Multiplier",
            "Get 1 Quinquavigintillion Multiplier",
            "Maintain 2 Day Streak",
            "Maintain 5 Day Streak",
            "Maintain 7 Day Streak",
            "Maintain 2 Week Streak",
            "Maintain 1 Month Streak"
        ],
        id : [],
        type : ['Earn Points', 'Unlock B\'s', 'Click B\'s', 'Have Interest', 'Playing Time', 'Get Multiplier', 'Maintain streaks']
    },
    achieve : function(id) {
        set(id, true);
        set('multiplier', Math.min(parseFloat(get('multiplier')) * 1.25, 1000000000));
        log("Achievement Earned!");
        log("Multiplier is now " + m.giant(Math.round(get("multiplier"))));
        theLog('Achievement: ' + achievements.list.spaces[achievements.list.id.indexOf(id)]);
    },
    check : function() {
        var obj = achievements;
        for (i = 0; i < obj.list.spaces.length; i++) {
            switch (obj.list.spaces[i].toString().split(' ')[2]) {
                case "Thousand" : amount = 1000 * obj.list.spaces[i].toString().split(' ')[1]; break;
                case "Quintillion" : amount = Math.pow(10, 18); break;
                case "Decillion" : amount = Math.pow(10, 33); break;
                case "Quindecillion" : amount = Math.pow(10, 48); break;
                case "Vigintillion" : amount = Math.pow(10,63); break;
                case "Quinquavigintillion" : amount = Math.pow(10,78); break;
                case "Day" : amount = obj.list.spaces[i].toString().split(' ')[1]; break;
                case "Days" : amount = 86400 * 2; break;
                case 'Hours' : amount = 3600 * obj.list.spaces[i].toString().split(' ')[1]; break;
                case "Week" : amount = 7 * obj.list.spaces[i].toString().split(' ')[1]; break;
                case "Month" : amount = 30 * obj.list.spaces[i].toString().split(' ')[1]; break;
                default:
                    amount = obj.list.spaces[i].toString().split(' ')[1];
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
            if (parseFloat(get(type)) >= parseFloat(amount) && get(obj.list.id[i]) != "true") {
                achievements.achieve(obj.list.id[i]);
            }  
        }
    }
}

for (i = 0; i < achievements.list.spaces.length; i++) {
    var string = remove(achievements.list.spaces[i], "'"); string = remove(string, " ");
    achievements.list.id.push(string);
}
var text = id("AchievementsList");
var type = "";
var typeNum = -1;
for (i = 0; i < achievements.list.spaces.length; i++) {
    var amount = achievements.list.spaces[i].toString().split(' ')[1];
    if (!type.includes('Unlock')) amount += achievements.list.spaces[i].toString().split(' ')[2].charAt(0);
    // else if (type.includes(''))
    if (type.toString().charAt(0) == achievements.list.id[i].charAt(0)) {
        text.innerHTML += "<div title='" + achievements.list.spaces[i] + "' class='achieveItem' id='" + achievements.list.id[i] + "'>" + amount + "</div>";
    } else {
        typeNum++;
        type = achievements.list.type[typeNum];
        text.innerHTML += "<div class='achieveCategory'>" + type + "</div><div title='" + achievements.list.spaces[i] + "' class='achieveItem' id='" + achievements.list.id[i] + "'>" + amount + "</div>";
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
        reset : function() { showConfirm("Reset Everything?", "data.reset.hard()", ""); },
        over : function() { submitScore(); id('body').style.background = "#FF0000"; id('main').setAttribute('class', 'flicker'); set('username', get("username") + "+"); theLog('Multiplier Multiplied By 2!'); set('multiplier', m.add(get('multiplier'), get("multiplier"))); log('G@Me oV3R!1!!1'); setTimeout('data.reset.hard()', 5000);}
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
			Earn((get("points") - earned) * get("daysInARow"));
			log('Earned ' + get("daysInARow") + ' daily gift(s)');
			theLog('Earned ' + get("daysInARow") + ' daily gift(s)');
		}
		if (get("theLog") != undefined) id('theLog').innerHTML = '<ul>' + get("theLog") + '</ul>';
		setInterval('submitScore()', 15000);
        setInterval("stats('visits', 1)", 60000);
        refresh.all();
        ceiling = get("points");
        setInterval('realEarn()', 1);
        setInterval('ceiling = get("points");bank.collect();depositSpamBlocker()', 1000);
        if (!get("username")) set('username', 'bClicker' + random());
        seasons.load();
        id("main").style.display = "block";
        id('loader').style.display = "none";
        if (get("playedTutorial") == undefined) playTutorial();
    }
}

// ===== Submission ===== //

function changeInfo() {
    var f = document.getElementById('infoChange');
    f.username.value = get('username') || "";
    f.email.value = get('email') || "";
    f.name.value = get('name') || "";
    id('infoPopup').style.display = "block";
    id('popupOverlay').style.display = "block";
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
        id('popupOverlay').style.display = "none";
        log('Changed Username to ' + get('username'));
        location.reload();
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

function showConfirm(text, yes, no) {
    id('confirmText').innerHTML = text;
    id('confirmYesBtn').setAttribute('ontouchend', "eval(" + yes + "); document.getElementById('confirmPopup').style.display = 'none'; document.getElementById('popupOverlay').style.display = 'none';");
    id('confirmNoBtn').setAttribute('ontouchend', "eval(" + no + "); document.getElementById('confirmPopup').style.display = 'none'; document.getElementById('popupOverlay').style.display = 'none';");
    id('confirmPopup').style.display = "block";
    id('popupOverlay').style.display = "block";
}

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

// ===== Miscellaneous ===== //

function Minimize(list, button) {
    id(list).style.display = (id(list).style.display != 'none' ? 'none' : '' );
    id(button).innerText = (id(button).innerText != '+' ? '+' : '-' );
}

if (window.location.protocol != "https:" && window.location.protocol != "file:") window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);