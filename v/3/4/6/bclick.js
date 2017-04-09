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
    fl(function(){randomness += Math.ceil(Math.random() * Math.random() * 10).toString().charAt(0)}, Math.ceil(Math.random() * 5));
    var times = (5 - randomness.length);
    fl(function(){randomness = "0" + randomness}, times);
    randomness = '1' + randomness;
    return randomness;
}

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
    else set('points', eg(Math.pow(10, 308)));
	achievements.check();
}
 
function Purchase(amount) { 
    if (get("points") < Math.pow(10, 308) && (ceiling - amount) >= 0) {
        increment += (parseFloat(amount) / 100);
        ceiling = parseFloat(ceiling) - parseFloat(amount);
    }
    else if (get("points") >= Math.pow(10, 308)) set('points', eg(Math.pow(10, 308)));
}

function ClickB() {
	name = b.list.list[get("bPosition")];
	worth = b.list.b[b.list.list[get("bPosition")]].worth;
    if (get(name) == 'true') {
        if (get('clicks') === undefined) { set('clicks', 0); }
        else { set('clicks', add(get('clicks'), 1)); }
        Earn(parseFloat(worth) * get("multiplier"));
    }
    else log("Unlock the B first");
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
        else { log("Insufficient Points") }
    }
    else log("Click the B");
}

// ===== Achievements ===== //

var achievements = {
    list : {
        spaces : [
            "Earn 1 Thousand Points",
            "Earn 1 Billion Points",
            "Earn 1 Quintillion Points",
            "Earn 1 Septillion Points",
            "Earn 1 Decillion Points",
            "Earn 1 Quindecillion Points",
            "Earn 1 Vigintillion Points",
            "Earn 1 Quinquavigintillion Points",
            "Earn 1 Trigintillion Points",
            "Earn 1 Quinquagintillion Points",
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
            "Have 1 Thousand Interest",
            "Have 1 Billion Interest",
            "Have 1 Quintillion Interest",
            "Have 1 Septillion Interest",
            "Have 1 Decillion Interest",
            "Have 1 Quindecillion Interest",
            "Have 1 Vigintillion Interest",
            "Have 1 Quinquavigintillion Interest",
            "Have 1 Trigintillion Interest",
            "Have 1 Quinquagintillion Interest",
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
        var obj = achievements, type = "";
        for (i = 0; i < obj.list.spaces.length; i++) {
            switch (obj.list.spaces[i].toString().split(' ')[2]) {
                case "Thousand" : amount = 1000 * obj.list.spaces[i].toString().split(' ')[1]; break;
                case "Billion" : amount = Math.pow(10, 9); break;
                case "Quintillion" : amount = Math.pow(10, 18); break;
                case "Septillion" : amount = Math.pow(10, 24); break;
                case "Decillion" : amount = Math.pow(10, 33); break;
                case "Quindecillion" : amount = Math.pow(10, 48); break;
                case "Vigintillion" : amount = Math.pow(10,63); break;
                case "Quinquavigintillion" : amount = Math.pow(10,78); break;
                case "Trigintillion" : amount = Math.pow(10,93); break;
                case "Quinquagintillion" : amount = Math.pow(10,153); break;
                default: amount = obj.list.spaces[i].toString().split(' ')[1];
            }
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
    }, refresh : function() {
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var string = remove(achievements.list.spaces[i], "'"); string = remove(string, " ");
            achievements.list.id.push(string);
        }
        var text = id("AchievementsList"), type = "", typeNum = -1;
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var amount = achievements.list.spaces[i].toString().split(' ')[1];
            if (!type.includes('Unlock')) amount += achievements.list.spaces[i].toString().split(' ')[2].charAt(0);
            if (type.toString().charAt(0) == achievements.list.id[i].charAt(0))
                text.innerHTML += "<div title='" + achievements.list.spaces[i] + "' class='achieveItem' id='" + achievements.list.id[i] + "'>" + amount + "</div>";
            else {
                typeNum++;
                type = achievements.list.type[typeNum];
                text.innerHTML += "<div class='achieveCategory'>" + type + "</div><div title='" + achievements.list.spaces[i] + "' class='achieveItem' id='" + achievements.list.id[i] + "'>" + amount + "</div>";
            }
        }
    }
}

// ===== Refreshing ===== //
var askedToReset = 'false';
var refresh = {
    numbers : function() {
        if (get('points') >= Math.pow(10, 306)) { set('points', eg(Math.pow(10, 307))); id('Points').innerHTML = "Points: Infinity"; if (askedToReset != 'true') { showConfirm("Reset to earn prestige?", 'data.reset.over()', ""); askedToReset = 'true';}}
        else if (get('points') < 0) { set('points', 0); id('Points').innerHTML = 'Points: ' + giant(get('points')); }
        else id('Points').innerHTML = 'Points: ' + giant(get('points'));
        if (get('interest') >= Math.pow(10, 307)) { set('interest', eg(Math.pow(10, 308))); id('Interest').innerHTML = "Interest: Infinity"; } 
        else id('Interest').innerHTML = 'Interest: ' + giant(get('interest'));

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
        if (!navigator.userAgent.match(/iPhone|iPad|iPod/i) && !navigator.userAgent.match(/Android/i)) {
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
            set('bPosition', 0);
            for (i = 0; i < b.list.list.length; i++) {
                var item = b.list.list[i];
                set(item, false);
            }
            set('handrawn', true);
            id('AchievementsList').innerHTML = '';
            achievements.refresh();
            id('confirmPopup').style.display = 'none';
            id('popupOverlay').style.display = 'none';
        },
        hard : function() {
            for (i = 0; i < achievements.list.id.length; i++) { localStorage.removeItem(achievements.list.id[i]) };
            if (get("multiplier") !== undefined && get("multiplier") !== 'NaN' && get("multiplier") >= 20) set('multiplier', (get("multiplier") * 0.05)); 
			else set('multiplier', 1);
			data.reset.soft();
        },
        reset : function() { showConfirm("Reset Everything?", "data.reset.hard()", "''"); },
        over : function() { submitScore(); set('username', get("username") + "+"); set('multiplier', get('multiplier') * 25); setTimeout('data.reset.hard()', 5000)}
    },
    load : function() {
        if (get("points") === undefined) data.reset.hard();
        else if (get("lastPlay") !== undefined) {
            var earned = Math.min(get('points'), ((get('interest') * 0.05) * Math.min(ts(get('lastPlay')), new Date().getTime() - 3600000) / 2500));
            set('points', add(get("points"), earned));
            if (earned >= 10) log('Earned ' + giant(earned) + ' points offline');
        }
		setInterval('submitScore()', 15000);
        if (!get("username")) set('username', 'bClicker' + random());
        achievements.refresh();
        refresh.all();
        ceiling = get("points");
        setInterval('realEarn()', 1);
        setInterval('bank.collect()', 2500);
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
    if (get("points") != 0) id('winFrame').setAttribute('src', "https://playbclick.com/assets/php/submit.php?username=" + get("username") + "&points=" + Math.round(dcml(get('points'))));
}

function submitForm() {
    set('username', id('usernameInput').value || 'bClicker' + random());
    id('infoPopup').style.display = "none";
    id('popupOverlay').style.display = "none";
}

function SeeWinners() { window.parent.location = "https://playbclick.com/assets/php/leaderboards.php" }

function showConfirm(text, yes, no) {
    id('confirmText').innerHTML = text;
    id('confirmYesBtn').setAttribute('ontouchend', "eval(" + yes + ")");
    id('confirmNoBtn').setAttribute('ontouchend', "eval(" + no + ");document.getElementById('confirmPopup').style.display = 'none'; document.getElementById('popupOverlay').style.display = 'none'");
    id('confirmPopup').style.display = "block";
    id('popupOverlay').style.display = "block";
}

// ===== The B's ===== //

var bAmount = 0, b = {
    vars : {
        button : function() { return id("bButton") },
        unlock : function() { return id("bUnlock") },
        section : function() { return id("bSection") }
    },
    list : { list : [], b : {} },
    refresh : function() {
        id('bName').innerHTML = b.list.list[get("bPosition")].toString().toUpperCase() + ' B ' + b.list.b[b.list.list[get("bPosition")]].other.tooltip;
        b.vars.button().style.backgroundImage = "url('https://playbclick.com/assets/b/" + b.list.list[get("bPosition")] + ".png')";
        if (get(b.list.list[get("bPosition")]) == 'false') b.vars.unlock().innerHTML = "Unlock<br />($" + giant(b.list.b[b.list.list[get("bPosition")]].cost) + ")";
		else b.vars.unlock().innerHTML = "Unlocked!";
        b.vars.section().style.backgroundColor = b.list.b[b.list.list[get("bPosition")]].color;
    },
    loop : {
        next : function() {
            if (get("bPosition") == (bAmount - 1)) set("bPosition", 0);
            else set("bPosition", add(get("bPosition"), 1));
            b.refresh();
        },
        previous : function() {
            if (get("bPosition") == 0) set("bPosition", (bAmount - 1));
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
    bAmount = add(bAmount, 1);
}
b.list.b.handrawn = new create('handrawn', 2, 0, "#FFF");
b.list.b.lowercase = new create('lowercase', 10, 100, "#999");
b.list.b.regular = new create('regular', 50, 500, "#333");
b.list.b.saw = new create('saw', 200, 5000, "#F00");
b.list.b.spiky = new create('spiky', 500, 20000, "#FF0080");
b.list.b.electric = new create('electric', 1000, 100000, "#FFA500");
b.list.b.curved = new create('curved', 5000, 500000, "#0FF");
b.list.b.shark = new create('shark', 10000, 2500000, "#33B", {tooltip:'<br />(Michael K)'});
b.list.b.lightning = new create('lightning', 100000, 10000000, "#FF0", {tooltip:'<br />(Michael K)'});
b.list.b.awesome = new create('awesome', 1000000, 100000000, "#909");
b.list.b.thirteen = new create('thirteen', Math.pow(10, 8), Math.pow(10, 9), "#555555");
b.list.b.golden = new create('golden', Math.pow(10, 9), Math.pow(10, 11), "#FFD700", {tooltip:'<br />(Michael K)'});
b.list.b.knight = new create('knight', Math.pow(10, 10), Math.pow(10, 12), "#614126", {tooltip:'<br />(Michael K)'});
b.list.b.archer = new create('archer', Math.pow(10, 11), Math.pow(10, 13), "#005900", {tooltip:'<br />(Michael K)'});
b.list.b.barbed = new create('barbed', Math.pow(10, 12), Math.pow(10, 15), "#191919", {tooltip:'<br />(Michael K)'});
b.list.b.flower = new create('flower', Math.pow(10, 13), Math.pow(10, 16), "#b266b2", {tooltip:'<br />(Michael K)'});
b.list.b.muscle = new create('muscle', Math.pow(10, 14), Math.pow(10, 17), "#00ff00", {tooltip:'<br />(Michael K)'});
b.list.b.bw = new create('bw', Math.pow(10, 15), Math.pow(10, 18), "#000000");
b.list.b.honeycomb = new create('honeycomb', Math.pow(10, 16), Math.pow(10, 19), "#ffff00");
b.list.b.creative = new create('creative', Math.pow(10, 17), Math.pow(10, 20), "#ffb30d");
b.list.b.rubiks = new create('rubiks', Math.pow(10, 18), Math.pow(10, 21), "#f00");
b.list.b.star = new create('star', Math.pow(10, 21), Math.pow(10, 24), "#000000");
b.list.b.impossible = new create('impossible', Math.pow(10, 24), Math.pow(10, 27), "#666666");
b.list.b.ghost = new create('ghost', Math.pow(10, 27), Math.pow(10, 30), "#444444");
b.list.b.poke = new create('poke', Math.pow(10, 30), Math.pow(10, 33), "#FF0000");
b.list.b.giant = new create('giant', Math.pow(10, 33), Math.pow(10, 36), "#6D3200");
b.list.b.election = new create('election', Math.pow(10, 36), Math.pow(10, 39), "#0000FF", {tooltip:'<br />(Voting 2016)'});
b.list.b.baseball = new create('baseball', Math.pow(10, 39), Math.pow(10, 42), "#6D3200", {tooltip:'<br />(World Series 2016)'});
b.list.b.picasso = new create('picasso', Math.pow(10, 42), Math.pow(10, 45), "#F633F6", {tooltip:'<br />(135th Birthday)'});
b.list.b.challah = new create('challah', Math.pow(10, 45), Math.pow(10, 48), "#6D3200");
b.list.b.spear = new create('spear', Math.pow(10, 48), Math.pow(10, 51), "#343434");
b.list.b.superhero = new create('superhero', Math.pow(10, 51), Math.pow(10, 54), "#3333FF");
b.list.b.dragonball = new create('dragonball', Math.pow(10, 54), Math.pow(10, 57), "#FFD700", {tooltip:'<br />(Harkeertan Singh)'});
b.list.b.nature = new create('nature', Math.pow(10, 57), Math.pow(10, 60), "#6D3200", {tooltip:'<br />(Arjun M)'});
b.list.b.dovahkinn = new create('dovahkinn', Math.pow(10, 60), Math.pow(10, 63), "#FFFF00", {tooltip:'<br />(Ethan Choo)'});
b.list.b.mage = new create('mage', Math.pow(10, 63), Math.pow(10, 66), "#FF33FF", {tooltip:'<br />(Ethan Choo)'});
b.list.b.carnotaurus = new create('carnotaurus', Math.pow(10, 66), Math.pow(10, 69), "#FF1111", {tooltip:'<br />(Ethan Choo)'});
b.list.b.business = new create('business', Math.pow(10, 69), Math.pow(10, 72), "#FF88FF", {tooltip:'<br />(Ethan Choo)'});
b.list.b.killer = new create('killer', Math.pow(10, 72), Math.pow(10, 75), "#FF1111", {tooltip:'<br />(Ethan Choo)'});
b.list.b.candycane = new create('candycane', Math.pow(10, 75), Math.pow(10, 78), "#FF0000", {tooltip:'<br />(Christmas Eve 2016)'});
b.list.b.year3 = new create('year3', Math.pow(10, 78), Math.pow(10, 81), "#FFFF00", {tooltip:'<br />(Three Years)'});
b.list.b.santa = new create('santa', Math.pow(10, 81), Math.pow(10, 84), "#FF0000", {tooltip:'<br />(Christmas 2016)'});
b.list.b.skater = new create('skater', Math.pow(10, 84), Math.pow(10, 87), "#6D3200", {tooltip:'<br />(Alwin C)'});
b.list.b.orchestral = new create('orchestral', Math.pow(10, 87), Math.pow(10, 90), "#6D3200", {tooltip:'<br />(Ethan Choo)'});
b.list.b.worldwar = new create('worldwar', Math.pow(10, 90), Math.pow(10, 93), "#6D3200", {tooltip:'<br />(Andrew L)'});
b.list.b.phone = new create('phone', Math.pow(10, 93), Math.pow(10, 96), "#000000", {tooltip:'<br />(Apple Aniversary)'});
b.list.b.burger = new create('burger', Math.pow(10, 96), Math.pow(10, 99), "#6D3200", {tooltip:'<br />(Benz Le)'});

// ===== The Bank ===== //
var bank = {
    collect : function() {
        Earn(get('interest'));
        d = new Date();
        set('lastPlay', new Date().getTime());
    },
    deposit : function() {
        var amount = parseFloat(ceiling);
        set('deposited', add(get('deposited'), amount));
        set('interest', parseFloat(get("deposited")) * 0.1);
        Purchase(amount); 
    }
}
// ===== Miscellaneous ===== //
document.body.oncontextmenu = function(e){e.preventDefault()};
data.load();