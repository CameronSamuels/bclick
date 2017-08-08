var $ = function(e) { return document.getElementById(e) },
nums = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion",
"Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion",
"Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion",
"Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Unvigintillion",
"Duovigintillion", "Tresvigintillion", "Quattuorvigintillion", "Quinquavigintillion", "Sesvigintillion",
"Septemvigintillion", "Octovigintillion", "Novemvigintillion", "Trigintillion", "Untrigintillion",
"Duotrigintillion", "Tretrigintillion", "Quattuortrigintillion", "Quintrigintillion", "Sextrigintillion",
"Septentrigintillion", "Octotrigintillion", "Novemtrigintillion", "Quadragintillion", "Unquadragintillion",
"Duoquadragintillion", "Trequadragintillion", "Quattuorquadragintillion", "Quinquadragintillion", "Sexquadragintillion",
"Septenquadragintillion", "Octoquadragintillion", "Novemquadragintillion", "Quinquagintillion"], increment, ceiling = get("points"), left = 0,
askedToReset = false, desktop = !navigator.userAgent.match(/iPhone|iPad|iPod|Android/i), logs = 0;
function get(e) { return localStorage[e] }
function set(e, f) { localStorage.setItem(e, f) }
function add(e, f) { return parseFloat(e) + parseFloat(f) }
function sub(e, f) { return parseFloat(e) - parseFloat(f) }
function fl(e, f) { for (i = 0; i < f; i++) { e() } }
function ts(e) { return(sub(new Date().getTime(),e) / 1000) }
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
function log(text) {
    if (logs >= 2) return;
    if ($("logText").style.display == "inline-block") {
        logs++;
        setTimeout(function(){logs--;log(text)}, 1500);
        return;
    }
    $("logText").innerHTML = text;
    $("logText").style.display = "inline-block";
    setTimeout('$("logText").style.display = "none"', 1500);
}
function realEarn() {
    if (get("points") < ceiling) {
	  set('points', parseFloat(get("points")) + parseFloat(increment));
	  left = parseFloat(ceiling) - parseFloat(get("points"));
    } 
    else if (get("points") > ceiling) {
	  set('points', parseFloat(get("points")) - parseFloat(increment));
	  left = parseFloat(get("points")) - parseFloat(ceiling);
    }
    else left = 0;
	if (left <= 0) left = get('points'), ceiling = left, increment = 0;
}
function earn(amount) {
    if (get("points") < Math.pow(10, 308)) {
        ceiling = parseFloat(ceiling) + parseFloat(amount);
        increment += (parseFloat(amount) / 100); 
    }
    else set('points', eg(Math.pow(10, 308)));
	achievements.check();
}
 
function purchase(amount) { 
    if (get("points") < Math.pow(10, 308) && (ceiling - amount) >= 0) {
        increment += (parseFloat(amount) / 100);
        ceiling = parseFloat(ceiling) - parseFloat(amount);
    }
    else if (get("points") >= Math.pow(10, 308)) set('points', eg(Math.pow(10, 308)));
}
function bclick() {
	name = b.list[get("bPosition")];
	worth = b[b.list[get("bPosition")]].worth;
    if (get(name) == 'true') {
        if (get('clicks') === undefined) { set('clicks', 0); }
        else { set('clicks', add(get('clicks'), 1)); }
        earn(parseFloat(worth) * get("multiplier"));
    }
    else log("Unlock the B first");
}
function unlock() {
    name = b.list[get("bPosition")];
	cost = b[b.list[get("bPosition")]].cost;
    if (get(name) == 'false') {  
        if (get("points") >= cost) {
            set(name, true);
            if (get("unlocked") === undefined) { set("unlocked", 1); }
            else { set('unlocked', add(get("unlocked"), 1)); } 
            purchase(cost);
        }
        else { log("Insufficient Points") }
    }
    else log("Click the B");
    b.refresh();
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
        var text = $("AchievementsList"), type = "", typeNum = -1;
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
var refresh = {
    numbers : function() {
        if (get('points') >= Math.pow(10, 306)) { set('points', eg(Math.pow(10, 307))); $('Points').innerHTML = "Points: Infinity"; if (askedToReset != true) { showConfirm("Earn prestige?", 'data.reset.over()', ""); askedToReset = true;}}
        else if (get('points') < 0) { set('points', 0); $('Points').innerHTML = 'Points: ' + giant(get('points')); }
        else $('Points').innerHTML = 'Points: ' + giant(get('points'));
        if (get('interest') >= Math.pow(10, 307)) { set('interest', eg(Math.pow(10, 308))); $('Interest').innerHTML = "Interest: Infinity"; } 
        else $('Interest').innerHTML = 'Interest: ' + giant(get('interest'));
    },
    achievements : function() {
        achievements.check();
        var group = $("achivementsGroup");
        var text = $("AchievementsList");
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var item = $(achievements.list.id[i]);
            if (get(achievements.list.id[i]) == "true") item.style.background = "#0F0";
        }
    },
    events : function() {
        if (desktop) {
            var all = document.querySelectorAll('[ontouchend]');
            for (i = 0; i < all.length; i++) {
                var ontouchend = all[i].getAttribute('ontouchend');
                all[i].setAttribute('onclick', ontouchend);
                all[i].removeAttribute('ontouchend');
            }
        }
    },
    all : function() {
        refresh.numbers(); refresh.achievements(); refresh.events();
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
            for (i = 0; i < b.list.length; i++) {
                var item = b.list[i];
                set(item, false);
            }
            set('handrawn', true);
            $('AchievementsList').innerHTML = '';
            achievements.refresh();
            $('confirmPopup').style.display = '';
            $('popupOverlay').style.display = '';
        },
        hard : function() {
            for (i = 0; i < achievements.list.id.length; i++) { localStorage.removeItem(achievements.list.id[i]) };
            if (get("multiplier") !== undefined && get("multiplier") !== 'NaN' && get("multiplier") >= 20) set('multiplier', (get("multiplier") * 0.05)); 
			else set('multiplier', 1);
			data.reset.soft();
        },
        reset : function() { showConfirm("Reset Game?", "data.reset.hard()", "''"); },
        over : function() { set('multiplier', get('multiplier') * 25);data.reset.hard()}
    }
}
// ===== Submission ===== //
function showConfirm(text, yes, no) {
    $('confirmText').innerHTML = text;
    $('confirmYesBtn').setAttribute('ontouchend', "eval(" + yes + ")");
    $('confirmNoBtn').setAttribute('ontouchend', "eval(" + no + ");$('confirmPopup').style.display='';$('popupOverlay').style.display=''");
    $('confirmPopup').style.display = "block";
    $('popupOverlay').style.display = "block";
}
// ===== The B's ===== //
var bAmount = 0, b = {
    vars : {
        button : function() { return $("bButton") },
        unlock : function() { return $("bUnlock") },
        section : function() { return $("bSection") }
    },
    list : [],
    refresh : function() {
        $('bName').innerHTML = b.list[get("bPosition")].toString().toUpperCase() + ' B ' + b[b.list[get("bPosition")]].other.tooltip;
        b.vars.button().style.backgroundImage = "url('http://thebclickteam.tk/lib/bcl/b/" + b.list[get("bPosition")] + ".png')";
        if (get(b.list[get("bPosition")]) == 'false') b.vars.unlock().innerHTML = "Unlock<br>($" + giant(b[b.list[get("bPosition")]].cost) + ")";
		else b.vars.unlock().innerHTML = "Unlocked!";
        b.vars.section().style.backgroundColor = b[b.list[get("bPosition")]].color;
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
    b.list.push(name);
    bAmount = add(bAmount, 1);
}
b.handrawn = new create('handrawn', 2, 0, "#fff");
b.lowercase = new create('lowercase', 10, 100, "#999");
b.regular = new create('regular', 50, 500, "#333");
b.saw = new create('saw', 200, 5000, "#f00");
b.spiky = new create('spiky', 500, 20000, "#FF0080");
b.electric = new create('electric', 1000, 100000, "#FFA500");
b.curved = new create('curved', 5000, 500000, "#0ff");
b.shark = new create('shark', 10000, 2500000, "#33b");
b.lightning = new create('lightning', 100000, 10000000, "#ff0");
b.awesome = new create('awesome', 1000000, 100000000, "#909");
b.thirteen = new create('thirteen', 1e8, 1e9, "#555");
b.thin = new create('thin', 1e9, 1e11, "#555");
b.knight = new create('knight', 1e10, 1e12, "#614126");
b.archer = new create('archer', 1e11, 1e13, "#060");
b.barbed = new create('barbed', 1e12, 1e15, "#222");
b.flower = new create('flower', 1e13, 1e16, "#b266b2");
b.muscle = new create('muscle', 1e14, 1e17, "#0f0");
b.bw = new create('bw', 1e15, 1e18, "#000");
b.honeycomb = new create('honeycomb', 1e16, 1e19, "#ff0");
b.creative = new create('creative', 1e17, 1e20, "#ffb30d");
b.rubiks = new create('rubiks', 1e18, 1e21, "#f00");
b.star = new create('star', 1e21, 1e24, "#000");
b.impossible = new create('impossible', 1e24, 1e27, "#555");
b.ghost = new create('ghost', 1e27, 1e30, "#444");
b.poke = new create('poke', 1e30, 1e33, "#f00");
b.giant = new create('giant', 1e33, 1e36, "#6D3200");
b.election = new create('election', 1e36, 1e39, "#00f");
b.baseball = new create('baseball', 1e39, 1e42, "#6D3200");
b.picasso = new create('picasso', 1e42, 1e45, "#F633F6");
b.challah = new create('challah', 1e45, 1e48, "#6D3200");
b.spear = new create('spear', 1e48, 1e51, "#333");
b.superhero = new create('superhero', 1e51, 1e54, "#33f");
b.chalk = new create('chalk', 1e54, 1e57, "#000");
b.nature = new create('nature', 1e57, 1e60, "#6D3200", {tooltip:'<br>(Arjun M)'});
b.golden = new create('golden', 1e60, 1e63, "#ffd700");
b.mage = new create('mage', 1e63, 1e66, "#f3f");
b.carnotaurus = new create('carnotaurus', 1e66, 1e69, "#f11");
b.business = new create('business', 1e69, 1e72, "#f8f");
b.duck = new create('duck', 1e72, 1e75, "#060");
b.orchestral = new create('orchestral', 1e75, 1e78, "#6D3200");
b.candycane = new create('candycane', 1e78, 1e81, "#f00");
b.year3 = new create('year3', 1e81, 1e84, "#ff0", {tooltip:'<br>(3rd Aniversary)'});
b.skater = new create('skater', 1e84, 1e87, "#6D3200");
b.worldwar = new create('worldwar', 1e87, 1e90, "#6D3200", {tooltip:'<br>(Andrew L)'});
b.killer = new create('killer', 1e90, 1e93, "#f11");
b.dovahkinn = new create('dovahkinn', 1e93, 1e96, "#ff0");
b.phone = new create('phone', 1e96, 1e99, "#000");
b.burger = new create('burger', 1e99, 1e102, "#6D3200", {tooltip:'<br>(Benz Le)'});
// ===== The Bank ===== //
var bank = {
    collect : function() {
        earn(get('interest'));
        d = new Date();
        set('lastPlay', new Date().getTime());
    },
    deposit : function() {
        var amount = parseFloat(ceiling);
        set('deposited', add(get('deposited'), amount));
        set('interest', parseFloat(get("deposited")) * 0.1);
        purchase(amount); 
    }
}
// ===== Miscellaneous ===== //
document.oncontextmenu = function(e){e.preventDefault()};
if (get("points") === undefined) data.reset.hard();
else achievements.refresh();
b.refresh();
refresh.all();
ceiling = get("points");
setInterval('realEarn()', 1);
setInterval('bank.collect()', 2500);
document.querySelector("main").style.display = "block";
$('loader').style.display = "none";