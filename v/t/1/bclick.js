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
function get(what) { return localStorage["t1_" + what]; }
function set(what, value) { localStorage.setItem("t1_" + what, value); }

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

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS()); }
};

// ===== Core Functions ===== //
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
            "Play 1 Day",
            "Play 2 Days"
        ],
        id : [],
        type : ['Earn Points', 'Unlock B\'s', 'Click B\'s', 'Have Interest', 'Playing Time']
    },
    achieve : function(id) {
        set(id, true);
        set('multiplier', parseFloat(get('multiplier')) * 1.5);
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
                case "Day" : amount = 86400; break;
                case "Hour" : amount = 3600; break;
                case "Days" : amount = 86400 * 2; break;
                case 'Hours' : amount = 3600 * obj.list.spaces[i].toString().split(' ')[1]; break;
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
    if (amount == 1) {
        amount += achievements.list.spaces[i].toString().split(' ')[2].charAt(0);
    }
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

            set('playedT1', true);
            theLog('New Game Started');

            changeInfo();
        },
        hard : function() {
            for (i = 0; i < achievements.list.id.length; i++) { localStorage.removeItem(achievements.list.id[i]) };
            if (get("multiplier") !== undefined && get("multiplier") !== 'NaN' && get("multiplier") >= 20) set('multiplier', (get("multiplier") * 0.05)); 
			else set('multiplier', 1);
			data.reset.soft();
        },
        reset : function() { if (m.ask("Reset Everything?") === true) data.reset.hard(); },
        over : function() { submitScore(); id('body').style.background = "#FF0000"; id('main').setAttribute('class', 'flicker'); set('username', get("username") + "+"); theLog('Reached the end of the world!'); theLog('Multiplier Multiplied By 2!'); set('multiplier', m.add(get('multiplier'), get("multiplier"))); log('G@Me oV3R!1!!1'); setTimeout('data.reset.hard()', 5000);}
    },
    load : function() {
        if (get("points") === undefined) data.reset.hard();
		if (get("theLog") != undefined) id('theLog').innerHTML = '<ul>' + get("theLog") + '</ul>';
		setInterval('submitScore()', 5000);
        refresh.all();
        ceiling = get("points");
        setInterval('realEarn()', 1);
        setInterval('ceiling = get("points");bank.collect();depositSpamBlocker()', 1000);
        if (!get("username")) set('username', 'bClicker' + random());
        // if (new Date < new Date('June 22 2017')) {
            // id('preview').style.display = "block";
        // }  else {
        id("main").style.display = "block";
        // }
        id('loader').style.display = "none";
    }
}

// ===== Submission ===== //

function changeInfo() {
    id('infoPopup').style.display = "block";
    id('infoOverlay').style.display = "block";
}

function submitScore() {
	id('winFrame').setAttribute('src', "submit.php?username=" + get("username") + "&points=" + Math.round(m.dcml(get('points'))));
}

function submitForm() {
    var f = document.getElementById('infoChange');
    if (f.checkValidity()) {
        f.submit();
        set('username', f.username.value || f.name.value);
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
    } else {this.tooltip = ''}
    b.list.list.push(name);
    set('bAmount', m.add(get('bAmount'), 1));
}

b.list.b.handrawn = new create('handrawn', 5, 0, "#FFF");
b.list.b.lowercase = new create('lowercase', 10, 250, "#999");
b.list.b.regular = new create('regular', 50, 2000, "#333");
b.list.b.saw = new create('saw', 200, 10000, "#F00");
b.list.b.spiky = new create('spiky', 500, 50000, "#FF0080");
b.list.b.electric = new create('electric', 1000, 100000, "#FFA500");
b.list.b.thin = new create('thin', 2000, 500000, "#CCC");
b.list.b.curved = new create('curved', 5000, 2500000, "#0FF");
b.list.b.shark = new create('shark', 10000, 10000000, "#33B");
b.list.b.fancy = new create('fancy', 25000, 50000000, "#DDD");
b.list.b.lightning = new create('lightning', 100000, 2500000000, "#FF0");
b.list.b.awesome = new create('awesome', 1000000, 100000000000, "#909");
b.list.b.thirteen = new create('thirteen', Math.pow(10, 8), Math.pow(10, 12), "#555555");
b.list.b.golden = new create('golden', Math.pow(10, 9), Math.pow(10, 13), "#FFD700");
b.list.b.pattern = new create('pattern', Math.pow(10, 12), Math.pow(10, 15), " patternB");
b.list.b.gradient = new create('gradient', Math.pow(10, 15), Math.pow(10, 18), " gradientB");
b.list.b.disco = new create('disco', Math.pow(10, 18), Math.pow(10, 21), " discoB");
b.list.b.knight = new create('knight', Math.pow(10, 21), Math.pow(10, 24), "#614126");
b.list.b.archer = new create('archer', Math.pow(10, 24), Math.pow(10, 27), "#005900");
b.list.b.barbed = new create('barbed', Math.pow(10, 27), Math.pow(10, 30), "#191919");
b.list.b.flower = new create('flower', Math.pow(10, 30), Math.pow(10, 33), "#b266b2");
b.list.b.muscle = new create('muscle', Math.pow(10, 33), Math.pow(10, 36), "#00ff00");
b.list.b.bw = new create('bw', Math.pow(10, 36), Math.pow(10, 39), "#000000");
b.list.b.honeycomb = new create('honeycomb', Math.pow(10, 39), Math.pow(10, 42), "#ffff00");
b.list.b.creative = new create('creative', Math.pow(10, 42), Math.pow(10, 45), "#ffb30d");
b.list.b.rubiks = new create('rubiks', Math.pow(10, 45), Math.pow(10, 48), " rubiksB");
b.list.b.star = new create('star', Math.pow(10, 48), Math.pow(10, 51), "#000000");
b.list.b.impossible = new create('impossible', Math.pow(10, 51), Math.pow(10, 54), "#666666");
b.list.b.ghost = new create('ghost', Math.pow(10, 57), Math.pow(10, 60), "#444444");
b.list.b.poke = new create('poke', Math.pow(10, 60), Math.pow(10, 63), "#FF0000");
b.list.b.chalk = new create('chalk', Math.pow(10, 63), Math.pow(10, 66), "#000000");
b.list.b.giant = new create('giant', Math.pow(10, 66), Math.pow(10, 69), "#6D3200");
b.list.b.election = new create('election', Math.pow(10, 69), Math.pow(10, 72), "#0000FF");
b.list.b.baseball = new create('baseball', Math.pow(10, 72), Math.pow(10, 75), "#6D3200");
b.list.b.picasso = new create('picasso', Math.pow(10, 75), Math.pow(10, 78), "#F633F6");
b.list.b.challah = new create('challah', Math.pow(10, 78), Math.pow(10, 81), "#6D3200");
b.list.b.spear = new create('spear', Math.pow(10, 81), Math.pow(10, 84), "#343434");
b.list.b.superhero = new create('superhero', Math.pow(10, 84), Math.pow(10, 87), "#3333FF");
b.list.b.duck = new create('duck', Math.pow(10, 87), Math.pow(10, 90), "#33EE33");
b.list.b.dragonball = new create('dragonball', Math.pow(10, 90), Math.pow(10, 93), "#FFD700");
b.list.b.nature = new create('nature', Math.pow(10, 93), Math.pow(10, 96), "#6D3200");
b.list.b.dovahkinn = new create('dovahkinn', Math.pow(10, 96), Math.pow(10, 99), "#FFFF00");
b.list.b.mage = new create('mage', Math.pow(10, 99), Math.pow(10, 102), "#FF33FF");
b.list.b.carnotaurus = new create('carnotaurus', Math.pow(10, 102), Math.pow(10, 105), "#FF1111");
b.list.b.business = new create('business', Math.pow(10, 102), Math.pow(10, 105), "#FF88FF");
b.list.b.killer = new create('killer', Math.pow(10, 102), Math.pow(10, 105), "#FF1111");
b.list.b.candycane = new create('candycane', Math.pow(10, 105), Math.pow(10, 108), "#FF0000");
b.list.b.year3 = new create('year3', Math.pow(10, 108), Math.pow(10, 111), "#FFFF00");
b.list.b.skater = new create('skater', Math.pow(10, 111), Math.pow(10, 114), "#6D3200");
b.list.b.orchestral = new create('orchestral', Math.pow(10, 114), Math.pow(10, 117), "#6D3200");
b.list.b.phone = new create('phone', Math.pow(10, 117), Math.pow(10, 120), "#000000");

// ===== The Bank ===== //

var bank = {
    collect : function() {
        Earn(get('interest'));
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
            case 123: return false;
            default:
        }
        keyPressed = true;
    }
};
id('body').onkeyup = function (e) { keyPressed = false; };
id('body').oncontextmenu = function(e) { e.preventDefault(); }

// ===== Miscellaneous ===== //

function Minimize(list, button) {
    id(list).style.display = (id(list).style.display != 'none' ? 'none' : '' );
    id(button).innerText = (id(button).innerText != '+' ? '+' : '-' );
}

if (window.location.protocol != "https:" && window.location.protocol != "file:") window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
data.load();