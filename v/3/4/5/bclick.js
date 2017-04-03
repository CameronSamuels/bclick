// ===== Helper Functions ===== //
function id(id) { return document.getElementById(id) }
function get(what) { return localStorage[what] }
function set(what, value) { localStorage.setItem(what, value) }
function add(what, amount) { return parseFloat(what) + parseFloat(amount) }
function sub(what, amount) { return parseFloat(what) - parseFloat(amount) }
function fl(code, count) { for (i = 0; i < count; i++) { code() } }
function ts(date) { return(sub(new Date().getTime(),date) / 1000) }
var nums = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion",
"Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion",
"Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion",
"Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Unvigintillion",
"Duovigintillion", "Tresvigintillion", "Quattuorvigintillion", "Quinquavigintillion", "Sesvigintillion",
"Septemvigintillion", "Octovigintillion", "Novemvigintillion", "Trigintillion", "Untrigintillion",
"Duotrigintillion", "Tretrigintillion", "Quattuortrigintillion", "Quintrigintillion", "Sextrigintillion",
"Septentrigintillion", "Octotrigintillion", "Novemtrigintillion", "Quadragintillion", "Unquadragintillion",
"Duoquadragintillion", "Trequadragintillion", "Quattuorquadragintillion", "Quinquadragintillion", "Sexquadragintillion",
"Septenquadragintillion", "Octoquadragintillion", "Novemquadragintillion", "Quinquagintillion"];
function dcml(x) {
    var e;if(Math.abs(x) < 1.0) { e = parseInt(x.toString().split('e-')[1]);
    if (e) {x*=Math.pow(10,e-1);x='0.'+(new Array(e)).join('0')+x.toString().substring(2);}}
    else{e=parseInt(x.toString().split('+')[1]);if(e>20){e-=20;x /=Math.pow(10,e);
    x+=(new Array(e+1)).join('0');}}return x;
}
function eg(num) {
    num=dcml(parseFloat(num));var length=num.toString().length;length=length-1;var string="1";
    fl(function(){string=string+"0"},length);return string;
}
function giant(num) {
    num = Math.round(num);
    var EG = eg(num);
    var length = EG.toString().length - 1;
    var groups = (length / 3);
    if (groups.toString().indexOf(".666") != -1 || groups.toString().indexOf(".333") != -1) groups = Math.floor(groups);
    EG = "1"; fl(function(){EG+="000"}, groups);
    if (EG == "1" || nums[groups] === undefined) return num;
    else if (nums[groups] !== undefined && EG != "1") return(num / EG).toFixed(1) + " " + nums[groups];
}

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
var logs = 0;
function log(text) {
    if (logs >= 2) return;
    if (id("logText").style.display == "inline-block") {
        logs++;
        setTimeout(function(){logs--;log(text)}, 1500);
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
    else { set('points', eg(Math.pow(10, 308))); }
	achievements.check();
}
 
function Purchase(amount) { 
    if (get("points") < Math.pow(10, 308)) {
        increment += (parseFloat(amount) / 100);
        ceiling = parseFloat(ceiling) - parseFloat(amount);
    }
    else { set('points', eg(Math.pow(10, 308))); }
}

function ClickB() {
	name = b.list.list[get("bPosition")];
	worth = b.list.b[b.list.list[get("bPosition")]].worth;
    if (get(name) == 'true') {
        if (get('clicks') === undefined) { set('clicks', 0); }
        else { set('clicks', add(get('clicks'), 1)); }
        Earn(parseFloat(worth) * get("multiplier"));
    }
    else { log("Unlock the B first!"); }
}

function UnlockB() {
    name = b.list.list[get("bPosition")];
	cost = b.list.b[b.list.list[get("bPosition")]].cost;
    if (get(name) == 'false') {  
        if (get("points") >= cost) {
            set(name, true);
            if (get("unlocked") === undefined) { set("unlocked", 1); }
            else { set('unlocked', add(get("unlocked"), 1)); } 
            Purchase(cost);
        }
        else { log("Insufficient Points!") }
    }
    else log("Click the B");
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
            "Unlock 45 B's",
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
        ],
        id : [],
        type : ['Earn Points', 'Unlock B\'s', 'Click B\'s', 'Have Interest']
    },
    achieve : function(id) {
        set(id, true);
        set('multiplier', Math.min(parseFloat(get('multiplier')) * 1.25, 1000000000));
        log("Multiplier is now " + giant(Math.round(get("multiplier"))));
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
                default:
                    amount = obj.list.spaces[i].toString().split(' ')[1];
            }
            var type = "";
            switch (obj.list.spaces[i].charAt(0)) {
                case "E" : type = "points"; break;
                case "U" : type = "unlocked"; break;
                case "C" : type = "clicks"; break;
                case "H" : type = "interest"; break;
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
    if (type.toString().charAt(0) == achievements.list.id[i].charAt(0)) {
        text.innerHTML += "<div title='" + achievements.list.spaces[i] + "' class='achieveItem' id='" + achievements.list.id[i] + "'>" + amount + "</div>";
    } else {
        typeNum++;
        type = achievements.list.type[typeNum];
        text.innerHTML += "<div class='achieveCategory'>" + type + "</div><div title='" + achievements.list.spaces[i] + "' class='achieveItem' id='" + achievements.list.id[i] + "'>" + amount + "</div>";
    }
}

// ===== Refreshing ===== //
var askedToReset = 'false';
var refresh = {
    numbers : function() {
        if (get('points') >= Math.pow(10, 306)) { set('points', eg(Math.pow(10, 307))); id('Points').innerHTML = "Points: Infinity"; if (askedToReset != 'true') { showConfirm("Reset to earn prestige?", 'data.reset.over()', ""); askedToReset = 'true';}}
        else { id('Points').innerHTML = 'Points: ' + giant(get('points'));}
        if (get('interest') >= Math.pow(10, 307)) { set('interest', eg(Math.pow(10, 308))); id('Interest').innerHTML = "Interest: Infinity"; } 
        else { id('Interest').innerHTML = 'Interest: ' + giant(get('interest')); }

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
            increment = 0;
            ceiling = 0;
            set('points', 0);
            set('interest', 0);
            set('deposited', 0);
            set('clicks', 0);
            set('unlocked', 0);
            for (i = 0; i < b.list.list.length; i++) {
                var item = b.list.list[i];
                set(item, false);
            }
            set('handrawn', true);
            set('played341-925216', true);
            location.reload();
        },
        hard : function() {
            for (i = 0; i < achievements.list.id.length; i++) { localStorage.removeItem(achievements.list.id[i]) };
            if (get("multiplier") !== undefined && get("multiplier") !== 'NaN' && get("multiplier") >= 20) set('multiplier', (get("multiplier") * 0.05)); 
			else set('multiplier', 1);
			data.reset.soft();
        },
        update : function() { set('played341-925216', true) },
        reset : function() { showConfirm("Reset Everything?", "data.reset.hard()", "''"); },
        over : function() { submitScore(); id('body').style.background = "#FF0000"; id('main').setAttribute('class', 'flicker'); set('username', get("username") + "+"); set('multiplier', add(get('multiplier'), get("multiplier"))); setTimeout('data.reset.hard()', 5000)}
    },
    load : function() {
        if (get("points") === undefined) data.reset.hard();
        else if (get("lastPlay") !== undefined) {
            var earned = Math.min(get('points'), ((get('interest') * 0.05) * Math.min(ts(get('lastPlay')), new Date().getTime() - 3600000) / 2500));
            set('points', add(get("points"), earned));
            log('Earned ' + giant(earned) + ' points offline');
        }
		setInterval('submitScore()', 15000);
        if (!get("username")) set('username', 'bClicker' + random());
        refresh.all();
        ceiling = get("points");
        setInterval('realEarn()', 1);
        setInterval('ceiling = get("points");depositSpamBlocker()', 1000);
        setInterval('bank.collect()', 2500);
        seasons.load();
        id("main").style.display = "block";
        id('loader').style.display = "none";
    }
}

// ===== Submission ===== //

function changeInfo() {
    id('usernameInput').value = get('username') || "";
    id('infoPopup').style.display = "block";
    id('popupOverlay').style.display = "block";
}

function submitScore() {
    if (get("points") != 0) id('winFrame').setAttribute('src', "https://playbclick.com/assets/php/submit.php?username=" + get("username") + "&points=" + Math.round(dcml(get('points'))) + "&email=" + (get("email") || "")  + '&name=' + (get("name") || ""));
}

function submitForm() {
    set('username', id('usernameInput').value || 'bClicker' + random());
    id('infoPopup').style.display = "none";
    id('popupOverlay').style.display = "none";
}

function SeeWinners() { window.parent.location = "https://playbclick.com/assets/php/leaderboards.php" }

function showConfirm(text, yes, no) {
    id('confirmText').innerHTML = text;
    id('confirmYesBtn').setAttribute('ontouchend', "eval(" + yes + "); document.getElementById('confirmPopup').style.display = 'none'; document.getElementById('popupOverlay').style.display = 'none';");
    id('confirmNoBtn').setAttribute('ontouchend', "eval(" + no + "); document.getElementById('confirmPopup').style.display = 'none'; document.getElementById('popupOverlay').style.display = 'none';");
    id('confirmPopup').style.display = "block";
    id('popupOverlay').style.display = "block";
}

// ===== The B's ===== //

if (get("bPosition") == undefined) set("bPosition", 0);
set('bAmount', 0);

var b = {
    vars : {
        button : function() { return id("bButton") },
        unlock : function() { return id("bUnlock") },
        section : function() { return id("bSection") }
    },
    list : {
        list : [],
        b : {}
    },
    refresh : function() {
        id('bName').innerHTML = b.list.list[get("bPosition")].toString().toUpperCase() + ' B ' + b.list.b[b.list.list[get("bPosition")]].other.tooltip;
        b.vars.button().style.backgroundImage = "url('https://playbclick.com/assets/b/" + b.list.list[get("bPosition")] + ".png')";
        if (get(b.list.list[get("bPosition")]) == 'false') b.vars.unlock().innerHTML = "Unlock<br />($" + giant(b.list.b[b.list.list[get("bPosition")]].cost) + ")";
		else b.vars.unlock().innerHTML = "Unlocked!";
        if (new Date().getHours() < 19) b.vars.section().style.backgroundColor = b.list.b[b.list.list[get("bPosition")]].color;
    },
    loop : {
        next : function() {
            if (get("bPosition") == (get("bAmount") - 1)) set("bPosition", 0);
            else set("bPosition", add(get("bPosition"), 1));
            b.refresh();
        },
        previous : function() {
            if (get("bPosition") == 0) set("bPosition", (get("bAmount") - 1));
            else set("bPosition", sub(get("bPosition"), 1));
            b.refresh();
        }
    }
}

function create(name, worth, cost, color, other) {
    this.worth = worth;
    this.cost = cost;
    this.color = color;
    this.name = name;
    this.other = other || {tooltip:''};
    if (get(name) == undefined) set(name, false);
    b.list.list.push(name);
    set('bAmount', add(get('bAmount'), 1));
}
// ===== The Bank ===== //

var bank = {
    collect : function() {
        Earn(get('interest'));
        d = new Date();
        set('lastPlay', new Date().getTime());
    },
    deposit : function() {
        if (depositReady == 'true') {
            var amount = parseFloat(get('points'));
            set('deposited', add(get('deposited'), amount));
            set('interest', parseFloat(get("deposited")) * 0.1);
            Purchase(amount); 
            depositReady = 'false';
        } else {
            log("Wait for the deposit cooldown");
        }
    }
}

var depositReady = 'false';
function depositSpamBlocker() { depositReady = 'true'; }

// ===== Miscellaneous ===== //

if (window.location.protocol != "https:" && window.location.protocol != "file:") window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);